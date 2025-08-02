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
  InputLabel
} from '@mui/material';
import { Add, Delete, Edit, Save, Cancel } from '@mui/icons-material';
import { UserProfile } from '../../types/user';

// Common icons for services
const ICON_OPTIONS = [
  'Globe', 'Smartphone', 'Database', 'Settings', 'Zap', 'Code',
  'Palette', 'Eye', 'Monitor', 'Cloud', 'Shield', 'Cpu'
];

interface Service {
  id: string;
  icon?: string;
  title: string;
  orderIndex: number;
}

interface ServiceManagerProps {
  services: Service[];
  onChange: (services: Service[]) => void;
  error?: string;
}

export const ServiceManager: React.FC<ServiceManagerProps> = ({
  services,
  onChange,
  error
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newService, setNewService] = useState<Service>({ id: '', icon: '', title: '', orderIndex: 0 });
  const [isAdding, setIsAdding] = useState(false);

  const generateId = () => Date.now().toString();

  const handleAddService = () => {
    if (newService.title.trim()) {
      const serviceToAdd: Service = {
        ...newService,
        id: generateId(),
        title: newService.title.trim(),
        orderIndex: services.length
      };
      onChange([...services, serviceToAdd]);
      setNewService({ id: '', icon: '', title: '', orderIndex: 0 });
      setIsAdding(false);
    }
  };

  const handleUpdateService = (index: number, updatedService: Service) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedService, title: updatedService.title.trim() };
    onChange(updatedServices);
    setEditingIndex(null);
  };

  const handleDeleteService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    // Reorder remaining services
    const reorderedServices = updatedServices.map((service, i) => ({
      ...service,
      orderIndex: i
    }));
    onChange(reorderedServices);
  };

  const ServiceForm = ({ 
    service, 
    onSave, 
    onCancel 
  }: { 
    service: Service; 
    onSave: (service: Service) => void; 
    onCancel: () => void; 
  }) => {
    const [formData, setFormData] = useState(service);

    return (
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Service title"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Icon</InputLabel>
              <Select
                value={formData.icon || ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                label="Icon"
              >
                <MenuItem value="">None</MenuItem>
                {ICON_OPTIONS.map((icon) => (
                  <MenuItem key={icon} value={icon}>
                    {icon}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
        </Grid>
      </Box>
    );
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {services
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((service, index) => (
            <Grid item xs={12} key={service.id}>
              <Card variant="outlined">
                <CardContent>
                  {editingIndex === index ? (
                    <ServiceForm
                      service={service}
                      onSave={(updated) => handleUpdateService(index, updated)}
                      onCancel={() => setEditingIndex(null)}
                    />
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body1">
                          {service.title}
                        </Typography>
                        {service.icon && (
                          <Typography variant="caption" color="text.secondary">
                            Icon: {service.icon}
                          </Typography>
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                          onClick={() => setEditingIndex(index)}
                          size="small"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteService(index)}
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
                <ServiceForm
                  service={newService}
                  onSave={handleAddService}
                  onCancel={() => {
                    setIsAdding(false);
                    setNewService({ id: '', icon: '', title: '', orderIndex: 0 });
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
          Add Service
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