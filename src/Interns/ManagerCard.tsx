import { useRecordContext, useGetOne } from 'react-admin';
import { Card, CardContent, Typography, Chip } from '@mui/material';

export const ManagerCard = () => {
 
  const intern = useRecordContext();

 
  const { data: manager, isPending, error } = useGetOne(
    'employees',
    { id: intern?.managerId },
    { enabled: !!intern?.managerId }
  );

  if (isPending) return (
    <Typography>Chargement du manager...</Typography>
  );


  if (error) return (
    <Typography color="error">
      Erreur : impossible de charger le manager
    </Typography>
  );

  
  return (
    <Card sx={{ mt: 2, maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Fiche Manager
        </Typography>
        <Typography>
          <strong>Nom complet : </strong>
          {manager.firstname} {manager.lastname}
        </Typography>
        <Typography>
          <strong>Département : </strong>
          {manager.department}
        </Typography>
        <Typography>
          <strong>Email : </strong>
          <a href={`mailto:${manager.email}`}>{manager.email}</a>
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>Statut : </strong>
          <Chip 
            label={manager.active ? 'Actif' : 'Inactif'} 
            color={manager.active ? 'success' : 'error'}
            size="small"
          />
        </Typography>
      </CardContent>
    </Card>
  );
};