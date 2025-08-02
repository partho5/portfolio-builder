import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Chip
} from '@mui/material';
import { Add, Delete, Edit, Save, Cancel, DragIndicator, Visibility, VisibilityOff } from '@mui/icons-material';
import { CustomSection } from '../../types/user';

const SECTION_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'list', label: 'List' },
  { value: 'gallery', label: 'Gallery' },
  { value: 'achievements', label: 'Achievements' },
  { value: 'testimonials', label: 'Testimonials' }
];

interface CustomSectionManagerProps {
  sections: CustomSection[];
  onChange: (sections: CustomSection[]) => void;
  error?: string;
}

export const CustomSectionManager: React.FC<CustomSectionManagerProps> = ({
  sections,
  onChange,
  error
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newSection, setNewSection] = useState<CustomSection>({ 
    id: '', 
    title: '', 
    type: 'text', 
    content: '', 
    order: 0, 
    visible: true 
  });
  const [isAdding, setIsAdding] = useState(false);

  const generateId = () => Date.now().toString();

  const handleAddSection = () => {
    if (newSection.title.trim()) {
      const sectionToAdd = {
        ...newSection,
        id: generateId(),
        title: newSection.title.trim(),
        order: sections.length
      };
      onChange([...sections, sectionToAdd]);
      setNewSection({ id: '', title: '', type: 'text', content: '', order: 0, visible: true });
      setIsAdding(false);
    }
  };

  const handleUpdateSection = (index: number, updatedSection: CustomSection) => {
    const updatedSections = [...sections];
    updatedSections[index] = { ...updatedSection, title: updatedSection.title.trim() };
    onChange(updatedSections);
    setEditingIndex(null);
  };

  const handleDeleteSection = (index: number) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    // Reorder remaining sections
    const reorderedSections = updatedSections.map((section, i) => ({
      ...section,
      order: i
    }));
    onChange(reorderedSections);
  };

  const handleToggleVisibility = (index: number) => {
    const updatedSections = [...sections];
    updatedSections[index] = { ...updatedSections[index], visible: !updatedSections[index].visible };
    onChange(updatedSections);
  };

  const SectionForm = ({ 
    section, 
    onSave, 
    onCancel 
  }: { 
    section: CustomSection; 
    onSave: (section: CustomSection) => void; 
    onCancel: () => void; 
  }) => {
    const [formData, setFormData] = useState(section);

    const handleContentChange = (value: any) => {
      setFormData({ ...formData, content: value });
    };

    const renderContentEditor = () => {
      switch (formData.type) {
        case 'text':
          return (
            <TextField
              value={formData.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Enter text content"
              multiline
              rows={3}
              fullWidth
              size="small"
            />
          );
        case 'list':
          return (
            <TextField
              value={Array.isArray(formData.content) ? formData.content.join('\n') : ''}
              onChange={(e) => handleContentChange(e.target.value.split('\n').filter(item => item.trim()))}
              placeholder="Enter list items (one per line)"
              multiline
              rows={4}
              fullWidth
              size="small"
            />
          );
        default:
          return (
            <TextField
              value={JSON.stringify(formData.content || {})}
              onChange={(e) => {
                try {
                  handleContentChange(JSON.parse(e.target.value));
                } catch {
                  handleContentChange(e.target.value);
                }
              }}
              placeholder="Enter JSON content"
              multiline
              rows={3}
              fullWidth
              size="small"
            />
          );
      }
    };

    return (
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Section title"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as CustomSection['type'] })}
                label="Type"
              >
                {SECTION_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.visible}
                  onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                />
              }
              label="Visible"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={() => onSave(formData)}
                disabled={!formData.title.trim()}
                color="primary"
              >
                <Save />
              </IconButton>
              <IconButton onClick={onCancel}>
                <Cancel />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              Content:
            </Typography>
            {renderContentEditor()}
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {sections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => (
            <Grid item xs={12} key={section.id}>
              <Card variant="outlined">
                <CardContent>
                  {editingIndex === index ? (
                    <SectionForm
                      section={section}
                      onSave={(updated) => handleUpdateSection(index, updated)}
                      onCancel={() => setEditingIndex(null)}
                    />
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DragIndicator color="disabled" />
                        <Box>
                          <Typography variant="body1">
                            {section.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                            <Chip label={section.type} size="small" />
                            <Typography variant="caption" color="text.secondary">
                              Order: {section.order}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          onClick={() => handleToggleVisibility(index)}
                          size="small"
                          color={section.visible ? 'primary' : 'default'}
                        >
                          {section.visible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        <IconButton
                          onClick={() => setEditingIndex(index)}
                          size="small"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteSection(index)}
                          size="small"
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}

        {isAdding && (
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <SectionForm
                  section={newSection}
                  onSave={handleAddSection}
                  onCancel={() => {
                    setIsAdding(false);
                    setNewSection({ id: '', title: '', type: 'text', content: '', order: 0, visible: true });
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Button
          onClick={() => setIsAdding(true)}
          variant="outlined"
          startIcon={<Add />}
          disabled={isAdding}
        >
          Add Custom Section
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}; 