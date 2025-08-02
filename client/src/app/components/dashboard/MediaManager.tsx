import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  IconButton, 
  TextField, 
  Button, 
  Typography,
  Chip
} from '@mui/material';
import { 
  Delete, 
  Add, 
  CloudUpload, 
  VideoLibrary, 
  Image as ImageIcon 
} from '@mui/icons-material';

interface MediaManagerProps {
  media: string[];
  onMediaChange: (media: string[]) => void;
}

export const MediaManager: React.FC<MediaManagerProps> = ({
  media,
  onMediaChange
}) => {
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [uploadingFile, setUploadingFile] = useState(false);

  const handleAddUrl = () => {
    if (newMediaUrl.trim()) {
      onMediaChange([...media, newMediaUrl.trim()]);
      setNewMediaUrl('');
    }
  };

  const handleRemoveMedia = (index: number) => {
    const updatedMedia = media.filter((_, i) => i !== index);
    onMediaChange(updatedMedia);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    
    // TODO: Implement actual file upload to server/S3
    // For now, create a local URL preview
    const localUrl = URL.createObjectURL(file);
    onMediaChange([...media, localUrl]);
    
    setUploadingFile(false);
    event.target.value = '';
  };

  const isYouTubeVideo = (url: string): boolean => {
    return url.includes('youtube.com/embed/') || url.includes('youtu.be/');
  };

  const getMediaType = (url: string): 'image' | 'video' => {
    return isYouTubeVideo(url) ? 'video' : 'image';
  };

  return (
    <Box>
      {/* Add Media Controls */}
      <Box mb={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Add Media URL (Image or YouTube)"
              value={newMediaUrl}
              onChange={(e) => setNewMediaUrl(e.target.value)}
              placeholder="https://example.com/image.jpg or https://youtube.com/embed/..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddUrl()}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={handleAddUrl}
              disabled={!newMediaUrl.trim()}
            >
              Add URL
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="outlined"
              startIcon={<CloudUpload />}
              component="label"
              disabled={uploadingFile}
              fullWidth
            >
              Upload File
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileUpload}
              />
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Media Grid */}
      {media.length > 0 ? (
        <Grid container spacing={2}>
          {media.map((url, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <Box position="relative">
                  {getMediaType(url) === 'video' ? (
                    <Box
                      sx={{
                        width: '100%',
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'grey.100'
                      }}
                    >
                      <iframe
                        src={url}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        title={`Video ${index + 1}`}
                      />
                    </Box>
                  ) : (
                    <CardMedia
                      component="img"
                      height="200"
                      image={url}
                      alt={`Media ${index + 1}`}
                      onError={(e) => {
                        // Fallback for broken images
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMDAgMTAwTDEwMCAxMDBaIiBzdHJva2U9IiNDQ0MiLz4KPC9zdmc+';
                      }}
                    />
                  )}
                  
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.7)'
                      }
                    }}
                    onClick={() => handleRemoveMedia(index)}
                  >
                    <Delete />
                  </IconButton>

                  <Chip
                    icon={getMediaType(url) === 'video' ? <VideoLibrary /> : <ImageIcon />}
                    label={getMediaType(url) === 'video' ? 'Video' : 'Image'}
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: 8,
                      bgcolor: 'rgba(0,0,0,0.7)',
                      color: 'white'
                    }}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            color: 'text.secondary'
          }}
        >
          <Typography variant="body1">
            No media added yet
          </Typography>
          <Typography variant="body2">
            Add images or YouTube videos to showcase your project
          </Typography>
        </Box>
      )}
    </Box>
  );
}; 