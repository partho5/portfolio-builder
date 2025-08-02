import React, { useState } from 'react';
import {
  Box,
  Chip,
  TextField,
  Button,
  Typography,
  IconButton,
  Alert
} from '@mui/material';
import { Add, Close } from '@mui/icons-material';

interface Skill {
  id: string;
  name: string;
  orderIndex: number;
}

interface SkillManagerProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
  error?: string;
}

export const SkillManager: React.FC<SkillManagerProps> = ({
  skills,
  onChange,
  error
}) => {
  const [newSkill, setNewSkill] = useState('');

  const generateId = () => Date.now().toString();

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.some(skill => skill.name === newSkill.trim())) {
      const skillToAdd: Skill = {
        id: generateId(),
        name: newSkill.trim(),
        orderIndex: skills.length
      };
      onChange([...skills, skillToAdd]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillId: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== skillId);
    // Reorder remaining skills
    const reorderedSkills = updatedSkills.map((skill, index) => ({
      ...skill,
      orderIndex: index
    }));
    onChange(reorderedSkills);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill"
          size="small"
          fullWidth
        />
        <Button
          onClick={handleAddSkill}
          variant="outlined"
          startIcon={<Add />}
          disabled={!newSkill.trim() || skills.some(skill => skill.name === newSkill.trim())}
        >
          Add
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {skills.map((skill) => (
          <Chip
            key={skill.id}
            label={skill.name}
            onDelete={() => handleRemoveSkill(skill.id)}
            deleteIcon={<Close />}
            variant="outlined"
          />
        ))}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}; 