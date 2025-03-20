import React from 'react';
import { Box, Typography } from '@mui/material';

const ColorIndicator = ({ color }) => {
  const isInch = typeof color === 'string' && color.includes('inch');

  return isInch ? (
    <Typography variant="body1">{color}</Typography>
  ) : (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: color,
        border: '1px solid #000',
      }}
    />
  );
};

export default ColorIndicator;
