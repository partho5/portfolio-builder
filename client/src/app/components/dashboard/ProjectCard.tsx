// client/src/app/components/dashboard/ProjectCard.tsx

import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Alert, CircularProgress, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import { Delete, Save, Cancel } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from './FormField';
import { MediaManager } from './MediaManager';
import { ConfigPreview } from './ConfigPreview';
import { Project } from '../../types/project';
import { DashboardLandingPageEditor } from './DashboardLandingPageEditor';
import style from '../UserClient.module.css';
import { ShapePreview } from '../../../modules/landing-page-builder/ShapePreview';
import LandingPageComponent from "../../../modules/landing-page-builder/components/core/LandingPageComponent";
import { v4 as uuidv4 } from 'uuid';
import { StyleName, Size, AnimationType, Positioning } from '../../../modules/landing-page-builder/types/component.types';
import { getStyleClasses, getSizeClasses, getAnimationClasses } from '../../../modules/landing-page-builder/utils/styleMapper';
import { ProjectConfig } from '../../types/project';
import { API_BASE_URL } from '../../config/values';
import { ShapeConfig } from '../../../modules/landing-page-builder/configTypes';

type Row = { id: string; shapes: ProjectConfig[] };

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  media: z.array(z.string()).optional(),
  config: z.array(z.any()).optional()
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectCardProps {
  username: string;
  project: Project | null;
  projectIndex?: number;
  onSave: (project: Project) => void;
  onDelete?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  isCreating: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  username,
  project,
  projectIndex,
  onSave,
  onDelete,
  onCancel,
  loading = false,
  isCreating
}) => {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [media, setMedia] = useState<string[]>(project?.media || []);
  const [config, setConfig] = useState(project?.config || []);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);

  // Helper to create a new shape
  const createDefaultShape = (): ProjectConfig => ({
    id: uuidv4(),
    componentType: 'rectangle',
    content: "<div class='text-black text-3xl font-bold text-center'>Your Content Here</div>",
    styleName: 'glowWhite',
    size: 100,
    positioning: 'center',
    animation: 'fadeIn',
    delay: 0,
  });

  // Refactor localConfig to be an array of rows, each with an array of shapes
  // Each row: { id: string, shapes: ProjectConfig[] }
  const styleNames: StyleName[] = [
    'glowRed',
    'glowWhite',
    'purple',
    'gradientBlue',
    'gradientPurple',
    'glass',
    'neon',
  ];
  const sizeOptions: Size[] = [25, 33, 50, 100];
  const animationOptions: AnimationType[] = [
    'fadeIn',
    'slideUp',
    'slideDown',
    'slideLeft',
    'slideRight',
    'pulse',
    'bounce',
  ];
  const positioningOptions: Positioning[] = ['center', 'left', 'right'];
  const [localRows, setLocalRows] = useState<Row[]>(() => {
    if (!project || !Array.isArray(project.config)) {
      // New project or missing config: start with one row, one shape
      return [{ id: uuidv4(), shapes: [createDefaultShape()] }];
    }
    // If config is already row-based, use as is
    if (project.config.length > 0 && Array.isArray((project.config as any)[0]?.shapes)) {
      return project.config as unknown as Row[];
    }
    // Convert flat config to a single row
    const shapes: ProjectConfig[] = project.config.map((shape) => ({
      ...createDefaultShape(),
      ...shape,
      componentType: (shape.componentType === 'rectangle' || shape.componentType === 'circle') ? shape.componentType : 'rectangle',
      styleName: (styleNames as StyleName[]).includes(shape.styleName as StyleName) ? shape.styleName as StyleName : 'glowWhite',
      positioning: (positioningOptions as Positioning[]).includes(shape.positioning as Positioning) ? shape.positioning as Positioning : 'center',
      animation: (animationOptions as AnimationType[]).includes(shape.animation as AnimationType) ? shape.animation as AnimationType : 'fadeIn',
      id: shape.id ?? uuidv4(),
      delay: typeof shape.delay === 'number' ? shape.delay : 0,
      size: (sizeOptions as Size[]).includes(shape.size as Size) ? shape.size as Size : 100,
    }));
    return [{ id: uuidv4(), shapes }];
  });
  const [activeRowIdx, setActiveRowIdx] = useState(0);
  const [editingShapeIndex, setEditingShapeIndex] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
      category: project?.category || '',
      media: project?.media || [],
      config: project?.config || []
    }
  });

  // Reset form and local state when project changes
  useEffect(() => {
    reset({
      name: project?.name || '',
      description: project?.description || '',
      category: project?.category || '',
      media: project?.media || [],
      config: project?.config || []
    });
    setMedia(project?.media || []);
    setConfig(project?.config || []);
    // Robustly set localRows to always be row-based
    if (!project || !Array.isArray(project.config)) {
      setLocalRows([{ id: uuidv4(), shapes: [createDefaultShape()] }]);
    } else if (project.config.length > 0 && Array.isArray((project.config as any)[0]?.shapes)) {
      setLocalRows(project.config as unknown as Row[]);
    } else {
      const shapes: ProjectConfig[] = project.config.map((shape) => ({
        ...createDefaultShape(),
        ...shape,
        componentType: (shape.componentType === 'rectangle' || shape.componentType === 'circle') ? shape.componentType : 'rectangle',
        styleName: (styleNames as StyleName[]).includes(shape.styleName as StyleName) ? shape.styleName as StyleName : 'glowWhite',
        positioning: (positioningOptions as Positioning[]).includes(shape.positioning as Positioning) ? shape.positioning as Positioning : 'center',
        animation: (animationOptions as AnimationType[]).includes(shape.animation as AnimationType) ? shape.animation as AnimationType : 'fadeIn',
        id: shape.id ?? uuidv4(),
        delay: typeof shape.delay === 'number' ? shape.delay : 0,
        size: (sizeOptions as Size[]).includes(shape.size as Size) ? shape.size as Size : 100,
      }));
      setLocalRows([{ id: uuidv4(), shapes }]);
    }

    console.log(`config ${JSON.stringify(project?.config)}`)
  }, [project, reset]);

  useEffect(() => {
    console.log('localRows:', localRows);
    localRows.forEach((row, idx) => {
      if (!row.shapes || !Array.isArray(row.shapes)) {
        console.warn(`Row at index ${idx} is missing a valid shapes array:`, row);
      }
    });
  }, [localRows]);

  // Helper to create a new row
  const createDefaultRow = () => ({
    id: uuidv4(),
    shapes: [createDefaultShape()],
  });


  // Add a new shape to a row
  const handleAddShapeToRow = (rowIdx: number) => {
    setLocalRows(rows =>
      rows.map((row, idx) =>
        idx === rowIdx && row.shapes.length < 6
          ? { ...row, shapes: [...row.shapes, createDefaultShape()] }
          : row
      )
    );
    setActiveRowIdx(rowIdx);
    setEditingShapeIndex(localRows[rowIdx].shapes.length); // Edit the new shape
  };

  // Remove a shape from a row
  const handleRemoveShapeFromRow = (rowIdx: number, shapeIdx: number) => {
    setLocalRows(rows =>
      rows.map((row, idx) =>
        idx === rowIdx && row.shapes.length > 1
          ? { ...row, shapes: row.shapes.filter((_, i) => i !== shapeIdx) }
          : row
      )
    );
    setEditingShapeIndex(null);
  };

  // Add a new row below
  const handleAddRowBelow = (rowIdx: number) => {
    setLocalRows(rows => [
      ...rows.slice(0, rowIdx + 1),
      createDefaultRow(),
      ...rows.slice(rowIdx + 1),
    ]);
    setActiveRowIdx(rowIdx + 1);
    setEditingShapeIndex(0);
  };

  // Remove a row
  const handleRemoveRow = (rowIdx: number) => {
    if (localRows.length <= 1) return;
    setLocalRows(rows => rows.filter((_, idx) => idx !== rowIdx));
    setActiveRowIdx(0);
    setEditingShapeIndex(null);
  };

  // Update a shape in a row
  const handleShapeChangeInRow = (rowIdx: number, shapeIdx: number, updated: Partial<typeof localRows[0]['shapes'][0]>) => {
    setLocalRows(rows =>
      rows.map((row, idx) =>
        idx === rowIdx
          ? {
              ...row,
              shapes: row.shapes.map((shape, i) => (i === shapeIdx ? { ...shape, ...updated } : shape)),
            }
          : row
      )
    );
  };

    // Save config changes (flatten rows to config array for backward compatibility)
  const handleConfigSave = async () => {
    try {
      // Flatten rows to config array for backward compatibility
      const flattenedConfig = localRows.flatMap(row => row.shapes);
      
      console.log(`project= ${JSON.stringify(project)}`)
      
      // Call API to save the landing page configuration
      const response = await fetch(`${API_BASE_URL}/api/projects/${project?.id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          projectData: { 
            config: flattenedConfig,
            username: username 
          } 
        })
      });
      
      const data = await response.json();
      if (response.ok) {
        setConfig(flattenedConfig);
        setConfigDialogOpen(false);
        console.log('Landing page configuration saved successfully:', data);
      } else {
        throw new Error(data.error || 'Failed to save landing page configuration');
      }
    } catch (error) {
      console.error('Failed to save landing page configuration:', error);
      // Optionally show error to user
    }
  };

  // Shape type options
  const shapeTypes: ('rectangle' | 'circle')[] = ['rectangle', 'circle'];

  const handleSaveProject = () => {

  };


  const handleDelete = () => {

  };


  return (
    <Box component="form" onSubmit={handleSubmit(handleSaveProject)}>
      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            {isCreating ? 'Create New Project' : 'Edit Project'}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormField
            name="name"
            label="Project Name"
            control={control}
            error={errors.name?.message}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormField
            name="category"
            label="Category"
            control={control}
            error={errors.category?.message}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <FormField
            name="description"
            label="Description"
            control={control}
            error={errors.description?.message}
            multiline
            rows={4}
            required
          />
        </Grid>

        {/* Media Management */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Media
          </Typography>
          <MediaManager
            media={media}
            onMediaChange={setMedia}
          />
        </Grid>

        {/* Config Preview */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" gutterBottom>
              Configuration
            </Typography>
            <Button variant="outlined" size="small" onClick={() => setConfigDialogOpen(true)}>
              Edit Visually
            </Button>
          </Box>
          <ConfigPreview
            config={config}
            onConfigChange={setConfig}
          />
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          {saveStatus === 'success' && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Project {isCreating ? 'created' : 'updated'} successfully!
            </Alert>
          )}
          {saveStatus === 'error' && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Failed to {isCreating ? 'create' : 'update'} project. Please try again.
            </Alert>
          )}

          <Box display="flex" gap={2} justifyContent="flex-end">
            {isCreating && onCancel && (
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={onCancel}
                disabled={loading || saveStatus === 'saving'}
              >
                Cancel
              </Button>
            )}

            {!isCreating && onDelete && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={handleDelete}
                disabled={loading || saveStatus === 'saving'}
              >
                Delete
              </Button>
            )}

            <Button
              type="submit"
              variant="contained"
              startIcon={saveStatus === 'saving' ? <CircularProgress size={20} /> : <Save />}
              disabled={loading || saveStatus === 'saving' || (!isDirty && !isCreating)}
            >
              {saveStatus === 'saving' ? 'Saving...' : isCreating ? 'Create Project' : 'Save Changes'}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={configDialogOpen} onClose={() => setConfigDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Edit Project Configuration</DialogTitle>
        <DialogContent>
          {localRows.map((row, rowIdx) => (
            <Box
              key={row.id}
              mb={3}
              p={2}
              border={activeRowIdx === rowIdx ? 2 : 1}
              borderColor={activeRowIdx === rowIdx ? 'primary.main' : '#eee'}
              borderRadius={2}
              bgcolor="transparent"
              onClick={() => setActiveRowIdx(rowIdx)}
              style={{ cursor: 'pointer', textAlign: 'center' }}
            >
              <Typography variant="subtitle2" color={activeRowIdx === rowIdx ? 'primary' : 'textSecondary'} mb={1}>
                Row {rowIdx + 1}
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                {row.shapes && Array.isArray(row.shapes) && row.shapes.map((shape, shapeIdx) => (
                  <Box
                    key={shape.id}
                    border={editingShapeIndex === shapeIdx && activeRowIdx === rowIdx ? 2 : 0}
                    borderColor={editingShapeIndex === shapeIdx && activeRowIdx === rowIdx ? 'info.main' : 'transparent'}
                    borderRadius={2}
                    p={2}
                    minWidth={220}
                    bgcolor="transparent"
                    onClick={e => {
                      e.stopPropagation();
                      setActiveRowIdx(rowIdx);
                      setEditingShapeIndex(shapeIdx);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <ShapePreview shape={{
                      id: shape.id || uuidv4(),
                      componentType: (shape.componentType === 'rectangle' || shape.componentType === 'circle') ? (shape.componentType as 'rectangle' | 'circle') : 'rectangle',
                      content: shape.content,
                      styleName: shape.styleName,
                      size: shape.size,
                      positioning: shape.positioning,
                      animation: shape.animation
                    } as ShapeConfig} selected={editingShapeIndex === shapeIdx && activeRowIdx === rowIdx} />
                    {editingShapeIndex === shapeIdx && activeRowIdx === rowIdx && (
                      <Box mt={1}>
                        <Typography variant="caption">Edit Shape</Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                          <Box>
                            <Typography variant="caption">Type</Typography>
                            <Box display="flex" gap={1}>
                              {shapeTypes.map(type => (
                                <Button
                                  key={type}
                                  variant={shape.componentType === type ? 'contained' : 'outlined'}
                                  size="small"
                                  onClick={() => handleShapeChangeInRow(rowIdx, shapeIdx, { componentType: type })}
                                >
                                  {type}
                                </Button>
                              ))}
                            </Box>
                          </Box>
                          <Box>
                            <Typography variant="caption">Content (HTML)</Typography>
                            <TextField
                              multiline
                              minRows={2}
                              maxRows={6}
                              fullWidth
                              value={shape.content}
                              onChange={e => handleShapeChangeInRow(rowIdx, shapeIdx, { content: e.target.value })}
                              variant="outlined"
                              size="small"
                            />
                          </Box>
                          <Box>
                            <Typography variant="caption">Style Name</Typography>
                            <FormControl fullWidth size="small">
                              <InputLabel id={`styleName-label-${rowIdx}-${shapeIdx}`}>Style</InputLabel>
                              <Select
                                labelId={`styleName-label-${rowIdx}-${shapeIdx}`}
                                value={shape.styleName}
                                label="Style"
                                onChange={e => handleShapeChangeInRow(rowIdx, shapeIdx, { styleName: e.target.value as StyleName })}
                              >
                                {styleNames.map((style) => (
                                  <MenuItem key={style} value={style}>{style}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box>
                            <Typography variant="caption">Size</Typography>
                            <FormControl fullWidth size="small">
                              <InputLabel id={`size-label-${rowIdx}-${shapeIdx}`}>Size</InputLabel>
                              <Select
                                labelId={`size-label-${rowIdx}-${shapeIdx}`}
                                value={shape.size}
                                label="Size"
                                onChange={e => handleShapeChangeInRow(rowIdx, shapeIdx, { size: Number(e.target.value) as Size })}
                              >
                                {sizeOptions.map((size) => (
                                  <MenuItem key={size} value={size}>{size}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box>
                            <Typography variant="caption">Positioning</Typography>
                            <select
                              value={shape.positioning}
                              onChange={e => handleShapeChangeInRow(rowIdx, shapeIdx, { positioning: e.target.value as Positioning })}
                            >
                              {positioningOptions.map(pos => (
                                <option key={pos} value={pos}>{pos}</option>
                              ))}
                            </select>
                          </Box>
                          <Box>
                            <Typography variant="caption">Animation</Typography>
                            <FormControl fullWidth size="small">
                              <InputLabel id={`animation-label-${rowIdx}-${shapeIdx}`}>Animation</InputLabel>
                              <Select
                                labelId={`animation-label-${rowIdx}-${shapeIdx}`}
                                value={shape.animation || ''}
                                label="Animation"
                                onChange={e => handleShapeChangeInRow(rowIdx, shapeIdx, { animation: e.target.value as AnimationType })}
                              >
                                {animationOptions.map((anim) => (
                                  <MenuItem key={anim} value={anim}>{anim}</MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                      </Box>
                    )}
                    <Button onClick={() => handleRemoveShapeFromRow(rowIdx, shapeIdx)} size="small" color="error" disabled={!row.shapes || row.shapes.length <= 1}>
                      Remove
                    </Button>
                  </Box>
                ))}
              </Box>
              <Box mt={2}>
                <Button onClick={() => handleAddShapeToRow(rowIdx)} disabled={!row.shapes || row.shapes.length >= 6} variant="outlined" size="small">
                  Add Shape
                </Button>
                {localRows.length > 1 && (
                  <Button onClick={() => handleRemoveRow(rowIdx)} size="small" color="error" sx={{ ml: 2 }}>
                    Remove Row
                  </Button>
                )}
              </Box>
            </Box>
          ))}
          {localRows.map((row, rowIdx) => (
            <Box key={row.id + '-add-row'} textAlign="center" mb={2}>
              <Button onClick={() => handleAddRowBelow(rowIdx)} variant="text" color="primary">
                Add New Section Below
              </Button>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfigDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfigSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 