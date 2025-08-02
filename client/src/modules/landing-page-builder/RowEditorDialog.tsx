import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Box, Typography } from '@mui/material';
import { RowConfig, ShapeConfig } from './configTypes';
import { RowPreview } from './RowPreview';
import { ShapePreview } from './ShapePreview';

interface RowEditorDialogProps {
  open: boolean;
  row: RowConfig;
  onChange: (row: RowConfig) => void;
  onClose: () => void;
}

export const RowEditorDialog: React.FC<RowEditorDialogProps> = ({ open, row, onChange, onClose }) => {
  const [localRow, setLocalRow] = useState<RowConfig>(row);
  const [error, setError] = useState<string | null>(null);

  // Handle shape config change
  const handleShapeChange = (index: number, updated: Partial<ShapeConfig>) => {
    try {
      const updatedShapes = localRow.components.map((shape, i) =>
        i === index ? { ...shape, ...updated } : shape
      );
      setLocalRow({ ...localRow, components: updatedShapes });
      setError(null);
    } catch (e) {
      setError('Failed to update shape.');
    }
  };

  // Save changes
  const handleSave = () => {
    try {
      onChange(localRow);
      onClose();
    } catch (e) {
      setError('Failed to save row.');
    }
  };

  // Reset on open/row change
  React.useEffect(() => {
    setLocalRow(row);
    setError(null);
  }, [row, open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Edit Row</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <RowPreview row={localRow} />
        </Box>
        {localRow.components.map((shape, idx) => (
          <Box key={shape.id} mb={2} p={2} border={1} borderColor="#eee" borderRadius={2}>
            <Typography variant="subtitle1">Component {idx + 1}</Typography>
            {/* Example: content and size editing, can add more fields as needed */}
            <Box display="flex" gap={2} alignItems="center">
              <input
                type="text"
                value={shape.content}
                onChange={e => handleShapeChange(idx, { content: e.target.value })}
                placeholder="Content HTML"
                style={{ flex: 1 }}
              />
              <input
                type="number"
                value={shape.size}
                min={25}
                max={100}
                step={1}
                onChange={e => {
                  const value = Number(e.target.value);
                  if ([25, 33, 50, 75, 100].includes(value)) {
                    handleShapeChange(idx, { size: value as 25 | 33 | 50 | 75 | 100 });
                  }
                }}
                placeholder="Size"
                style={{ width: 80 }}
              />
            </Box>
            {/* Add more controls for styleName, animation, etc. as needed */}
          </Box>
        ))}
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}; 