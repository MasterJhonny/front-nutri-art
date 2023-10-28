import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';

export default function LinearColor() {
  return (
    <Box>
      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
        <LinearProgress color="secondary" />
      </Stack>
    </Box>
  );
}
