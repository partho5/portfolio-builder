// client/src/app/components/dashboard/ProfileForm.tsx

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  Grid,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { FormField } from './FormField';
import { SkillManager } from './SkillManager';
import { ServiceManager } from './ServiceManager';
import { CustomSectionManager } from './CustomSectionManager';
import { UserProfile } from '../../types/user';
import styled from "@emotion/styled";
import { API_BASE_URL } from '../../config/values';

// Fixed schema with proper optional handling
const profileSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  name: z.string().min(1, 'Name is required'),
  displayName: z.string().min(1, 'Display name is required'),
  title: z.string().min(1, 'Title is required'),
  role: z.string().min(1, 'Role is required'),
  profileImage: z.string().url('Valid URL required').optional().or(z.literal('')),
  bio: z.string().optional(),
  email: z.string().email('Valid email required').optional().or(z.literal('')),
  // Updated skillSet to match object structure
  skillSet: z.array(z.object({
    id: z.string(),
    name: z.string(),
    orderIndex: z.number()
  })).default([]).optional(),
  // Updated services to match object structure
  services: z.array(z.object({
    id: z.string(),
    icon: z.string().optional(),
    title: z.string(),
    orderIndex: z.number()
  })).default([]).optional(),
  socialLinks: z.object({
    github: z.string().url('Valid URL required').optional().or(z.literal('')),
    linkedin: z.string().url('Valid URL required').optional().or(z.literal('')),
    twitter: z.string().url('Valid URL required').optional().or(z.literal('')),
    youtube: z.string().url('Valid URL required').optional().or(z.literal('')),
    facebook: z.string().url('Valid URL required').optional().or(z.literal('')),
    linkedinIn: z.string().url('Valid URL required').optional().or(z.literal('')),
    medium: z.string().url('Valid URL required').optional().or(z.literal(''))
  }).optional(),
  contactButtonLabel: z.string().optional(),
  hireButtonLabel: z.string().optional(),
  // Fixed customSections schema to match UserProfile type
  customSections: z.array(z.object({
    id: z.string(),
    title: z.string(),
    type: z.enum(['text', 'list', 'gallery', 'achievements', 'testimonials']),
    content: z.any().optional(), // Made content optional to prevent type errors
    order: z.number(),
    visible: z.boolean()
  })).optional().default([])
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  loading?: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
                                                          profile,
                                                          onSave,
                                                          loading = false
                                                        }) => {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isValid }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange', // Enable real-time validation
    defaultValues: {
      username: profile.username || '',
      name: profile.name || '',
      displayName: profile.displayName || '',
      title: profile.title || '',
      role: profile.role || '',
      profileImage: profile.profileImage || '',
      bio: profile.bio || '',
      email: profile.email || '',
      skillSet: profile.skillSet || [],
      services: profile.services || [],
      socialLinks: profile.socialLinks || {},
      contactButtonLabel: profile.contactButtonLabel || '',
      hireButtonLabel: profile.hireButtonLabel || '',
      customSections: profile.customSections || []
    }
  });

  const watchedValues = watch();

  // Debug logging to identify issues
  useEffect(() => {
    console.log('Form State Debug:', {
      errors,
      isDirty,
      isValid,
      watchedValues
    });
  }, [errors, isDirty, isValid, watchedValues]);

  const handleProfileSave = async (data: ProfileFormData) => {
    console.log('handleProfileSave triggered with data:', data);
    setSaveStatus('saving');

    try {
      // Ensure required arrays are not empty for API
      const processedData = {
        ...data,
        skillSet: data.skillSet && data.skillSet.length > 0 ? data.skillSet : [{
          id: 'general',
          name: 'General',
          orderIndex: 0
        }],
        services: data.services && data.services.length > 0 ? data.services : [{
          id: 'consultation',
          title: 'Consultation',
          icon: '',
          orderIndex: 0
        }]
      };

      console.log('Sending processed data:', processedData);

      const response = await fetch(`${API_BASE_URL}/api/profile/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          profileData: processedData,
          username: processedData.username
        })
      });

      const result = await response.json();
      console.log('API Response:', { response: response.ok, result });

      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 2000);
        if (onSave) onSave(processedData as UserProfile);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
        console.error('API Error:', result.error || 'Failed to update profile');
      }
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
      console.error('Network Error:', error);
    }
  };

  // Debug function for button click
  const handleButtonClick = (e: React.MouseEvent) => {
    console.log('Save button clicked');
    console.log('Button disabled state:', {
      loading,
      saveStatus: saveStatus === 'saving',
      isDirty,
      isValid,
      hasErrors: Object.keys(errors).length > 0
    });

    // Don't prevent default - let form submission handle it
  };

  const StyledTypography = styled(Typography)(({ theme }) => ({
    color: '#333',
    '&.MuiTypography-h6': {
      fontWeight: 600,
      color: '#1976d2',
      marginTop: '16px',
    },
  }));

  return (
      <Box component="form" onSubmit={handleSubmit(handleProfileSave)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledTypography variant="h6" gutterBottom>
              Basic Information
            </StyledTypography>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormField
                name="username"
                label="Username"
                control={control}
                error={errors.username?.message}
                required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormField
                name="name"
                label="Name"
                control={control}
                error={errors.name?.message}
                required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormField
                name="displayName"
                label="Display Name"
                control={control}
                error={errors.displayName?.message}
                required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormField
                name="title"
                label="Title"
                control={control}
                error={errors.title?.message}
                required
            />
          </Grid>

          <Grid item xs={12}>
            <FormField
                name="role"
                label="Role"
                control={control}
                error={errors.role?.message}
                required
            />
          </Grid>

          <Grid item xs={12}>
            <FormField
                name="profileImage"
                label="Profile Image URL"
                control={control}
                error={errors.profileImage?.message}
                type="url"
            />
          </Grid>

          <Grid item xs={12}>
            <FormField
                name="bio"
                label="Bio"
                control={control}
                error={errors.bio?.message}
                multiline
                rows={3}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormField
                name="email"
                label="Email"
                control={control}
                error={errors.email?.message}
                type="email"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormField
                name="contactButtonLabel"
                label="Contact Button Label"
                control={control}
                error={errors.contactButtonLabel?.message}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormField
                name="hireButtonLabel"
                label="Hire Button Label"
                control={control}
                error={errors.hireButtonLabel?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTypography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Social Links
            </StyledTypography>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormField
                name="socialLinks.github"
                label="GitHub URL"
                control={control}
                error={errors.socialLinks?.github?.message}
                type="url"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormField
                name="socialLinks.linkedin"
                label="LinkedIn URL"
                control={control}
                error={errors.socialLinks?.linkedin?.message}
                type="url"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormField
                name="socialLinks.twitter"
                label="Twitter URL"
                control={control}
                error={errors.socialLinks?.twitter?.message}
                type="url"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormField
                name="socialLinks.youtube"
                label="YouTube URL"
                control={control}
                error={errors.socialLinks?.youtube?.message}
                type="url"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormField
                name="socialLinks.facebook"
                label="Facebook URL"
                control={control}
                error={errors.socialLinks?.facebook?.message}
                type="url"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormField
                name="socialLinks.medium"
                label="Medium URL"
                control={control}
                error={errors.socialLinks?.medium?.message}
                type="url"
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTypography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Skills
            </StyledTypography>
            <Controller
                name="skillSet"
                control={control}
                render={({ field }) => (
                    <SkillManager
                        skills={field.value || []}
                        onChange={field.onChange}
                        error={errors.skillSet?.message}
                    />
                )}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTypography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Custom Sections
            </StyledTypography>
            <Controller
                name="customSections"
                control={control}
                render={({ field }) => (
                    <CustomSectionManager
                        sections={field.value || []}
                        onChange={field.onChange}
                        error={errors.customSections?.message}
                    />
                )}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTypography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Services
            </StyledTypography>
            <Controller
                name="services"
                control={control}
                render={({ field }) => (
                    <ServiceManager
                        services={field.value || []}
                        onChange={field.onChange}
                        error={errors.services?.message}
                    />
                )}
            />
          </Grid>

          <Grid item xs={12} className="text-center">
            {saveStatus === 'success' && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Profile updated successfully!
                </Alert>
            )}
            {saveStatus === 'error' && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Failed to update profile. Please try again.
                </Alert>
            )}

            {/* Debug info for development */}
            {/*{process.env.NODE_ENV === 'development' && (*/}
            {/*    <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>*/}
            {/*      <Typography variant="caption" display="block">*/}
            {/*        Debug: isDirty={isDirty.toString()}, isValid={isValid.toString()},*/}
            {/*        errors={Object.keys(errors).length},*/}
            {/*        loading={loading.toString()},*/}
            {/*        saveStatus={saveStatus}*/}
            {/*      </Typography>*/}
            {/*    </Box>*/}
            {/*)}*/}

            <Button
                type="submit"
                variant="contained"
                size="large"
                onClick={handleButtonClick}
                disabled={loading || saveStatus === 'saving'}
                startIcon={saveStatus === 'saving' ? <CircularProgress size={20} /> : null}
            >
              {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      </Box>
  );
};