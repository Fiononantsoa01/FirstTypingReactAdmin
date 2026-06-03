import { useRecordContext, useGetList } from 'react-admin';
import { 
  Typography, List, ListItem, 
  ListItemText, Link, Box 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const InternsByManager = () => {
  const employee = useRecordContext();

  const { data: interns, isPending, total } = useGetList(
    'interns',
    {
      filter: { managerId: employee?.id },
      pagination: { page: 1, perPage: 100 },
    },
    { enabled: !!employee?.id }
  );

  if (isPending) return <Typography>Chargement...</Typography>;

  return (
    <Box sx={{ mt: 2 }}>
    
      <Typography variant="h6">
        Stagiaires encadrés ({total ?? 0})
      </Typography>

      
      {!interns || interns.length === 0 ? (
        <Typography color="text.secondary">
          Aucun stagiaire pour ce manager.
        </Typography>
      ) : (
        <List>
          {interns.map(intern => (
            <ListItem key={intern.id}>
              <ListItemText
                primary={
               
                  <Link
                    component={RouterLink}
                    to={`/interns/${intern.id}/show`}
                  >
                    {intern.firstname} {intern.lastname}
                  </Link>
                }
                secondary={
                  <>
                    {intern.department} — {' '}
                    {intern.isPaid 
                      ? `Rémunéré : ${intern.amount}€` 
                      : 'Non rémunéré'
                    } — {' '}
                    {intern.startDate} → {intern.endDate}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};