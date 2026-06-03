import { useRecordContext, useGetList } from 'react-admin';
import { Typography, Box, Chip } from '@mui/material';

export const DepartmentStats = () => {
  const employee = useRecordContext();

  const { total, isPending } = useGetList(
    'employees',
    {
      filter: { 
        department: employee?.department,
        active: true 
      },
      pagination: { page: 1, perPage: 1 },
    },
    { enabled: !!employee?.department }
  );

  if (isPending) return <Typography>Chargement...</Typography>;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">
        Statistiques du département
      </Typography>
      <Typography>
        Département : <strong>{employee?.department}</strong>
      </Typography>
      <Typography>
        Collègues actifs : {' '}
        <Chip 
          label={total ?? 0} 
          color="primary" 
          size="small" 
        />
      </Typography>
    </Box>
  );
};