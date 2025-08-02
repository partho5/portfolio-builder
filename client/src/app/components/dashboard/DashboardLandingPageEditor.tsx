import React, { useEffect, useState } from 'react';
import { fetchPageConfig, savePageConfig } from '../../../modules/landing-page-builder/mockApi';
import { PageConfig, RowConfig } from '../../../modules/landing-page-builder/configTypes';
import { RowPreview } from '../../../modules/landing-page-builder/RowPreview';
import { RowEditorDialog } from '../../../modules/landing-page-builder/RowEditorDialog';
import { Button, Box, Typography, Alert, CircularProgress } from '@mui/material';

interface DashboardLandingPageEditorProps {
  username: string;
}

export const DashboardLandingPageEditor: React.FC<DashboardLandingPageEditorProps> = ({ username }) => {
  const [config, setConfig] = useState<PageConfig>({ rows: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingRow, setEditingRow] = useState<RowConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPageConfig(username)
      .then(cfg => setConfig(cfg))
      .catch(e => setError(e.message || 'Failed to load config'))
      .finally(() => setLoading(false));
  }, [username]);

  const handleEditRow = (row: RowConfig) => setEditingRow(row);
  const handleDialogClose = () => setEditingRow(null);
  const handleDialogSave = (updatedRow: RowConfig) => {
    setConfig(prev => ({
      ...prev,
      rows: prev.rows.map(r => (r.id === updatedRow.id ? updatedRow : r)),
    }));
    setEditingRow(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await savePageConfig(username, config);
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || 'Failed to save config');
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(false), 2000);
    }
  };

  if (loading) return <Box py={8} textAlign="center"><CircularProgress /><Typography mt={2}>Loading landing page config...</Typography></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" mb={2}>Landing Page Builder</Typography>
      {config.rows.length === 0 && <Alert severity="info">No rows yet. Add your first row!</Alert>}
      {config.rows.map(row => (
        <Box key={row.id} mb={3}>
          <RowPreview row={row} />
          <Button variant="outlined" onClick={() => handleEditRow(row)}>Edit Row</Button>
        </Box>
      ))}
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
        {success && <Alert severity="success" sx={{ mt: 2 }}>Saved successfully!</Alert>}
      </Box>
      {editingRow && (
        <RowEditorDialog
          open={!!editingRow}
          row={editingRow}
          onChange={handleDialogSave}
          onClose={handleDialogClose}
        />
      )}
    </Box>
  );
}; 