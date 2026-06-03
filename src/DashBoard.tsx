import { useGetList } from 'react-admin';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, total, color }: {
  title: string;
  total: number | undefined;
  color: string;
}) => (
  <Card sx={{ height: '100%', borderTop: `4px solid ${color}` }}>
    <CardContent>
      <Typography variant="subtitle1" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h3" fontWeight="bold" color={color}>
        {total ?? '...'}
      </Typography>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const navigate = useNavigate();

  const { total: totalEmployees } = useGetList('employees', {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: totalActiveEmployees } = useGetList('employees', {
    pagination: { page: 1, perPage: 1 },
    filter: { active: true },
  });

  const { total: totalInterns } = useGetList('interns', {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: totalPaidInterns } = useGetList('interns', {
    pagination: { page: 1, perPage: 1 },
    filter: { isPaid: true },
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Tableau de bord
      </Typography>

   
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <Box sx={{ flex: '1 1 200px' }}>
          <StatCard title="Total employés"
            total={totalEmployees} color="#1976d2" />
        </Box>
        <Box sx={{ flex: '1 1 200px' }}>
          <StatCard title="Employés actifs"
            total={totalActiveEmployees} color="#2e7d32" />
        </Box>
        <Box sx={{ flex: '1 1 200px' }}>
          <StatCard title="Total stagiaires"
            total={totalInterns} color="#ed6c02" />
        </Box>
        <Box sx={{ flex: '1 1 200px' }}>
          <StatCard title="Stagiaires rémunérés"
            total={totalPaidInterns} color="#9c27b0" />
        </Box>
      </Box>

     
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Actions rapides
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/employees')}
        >
          Liste des employés
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/employees/create')}
        >
          Créer un employé
        </Button>

    
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate('/interns')}
        >
          Liste des stagiaires
        </Button>

        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate('/interns/create')}
        >
          Créer un stagiaire
        </Button>
      </Box>
    </Box>
  );
};