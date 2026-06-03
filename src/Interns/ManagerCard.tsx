import { useRecordContext, useGetOne } from 'react-admin';
import { Card, CardContent, Typography, Chip } from '@mui/material';

export const ManagerCard = () => {
  // useRecordContext pour lire le stagiaire courant
  const intern = useRecordContext();

  // useGetOne pour charger le manager
  // { enabled: !!intern?.managerId } évite un appel avec id undefined
  const { data: manager, isPending, error } = useGetOne(
    'employees',
    { id: intern?.managerId },
    { enabled: !!intern?.managerId }
  );

  // Etat 1 — chargement
  if (isPending) return (
    <Typography>Chargement du manager...</Typography>
  );

  // Etat 2 — erreur
  if (error) return (
    <Typography color="error">
      Erreur : impossible de charger le manager
    </Typography>
  );

  // Etat 3 — données disponibles
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