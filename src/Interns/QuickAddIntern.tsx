import { useState } from 'react';
import { useCreate, useRefresh, useNotify, ReferenceInput, AutocompleteInput } from 'react-admin';
import {
  Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const QuickAddIntern = () => {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [managerId, setManagerId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [create, { isPending }] = useCreate();
  const refresh = useRefresh();
  const notify = useNotify();


  const handleOpen = () => {
    setOpen(true);
    setErrorMsg('');
  };


  const handleClose = () => {
    setOpen(false);
    setFirstname('');
    setLastname('');
    setManagerId(null);
    setErrorMsg('');
  };

 
  const handleSubmit = () => {
    if (!firstname || !lastname || !managerId) {
      setErrorMsg('Tous les champs sont obligatoires.');
      return;
    }

    create(
      'interns',
      { data: { firstname, lastname, managerId, isPaid: false, amount: 0 } },
      {
        onSuccess: () => {
          notify('Stagiaire créé avec succès !', { type: 'success' });
          refresh(); 
          handleClose();
        },
        onError: () => {
          setErrorMsg('Erreur lors de la création du stagiaire.');
        },
      }
    );
  };

  return (
    <>
     
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Ajouter stagiaire rapide
      </Button>

      
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Ajouter un stagiaire rapidement</DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
         
          {errorMsg && (
            <Alert severity="error">{errorMsg}</Alert>
          )}


          <TextField
            label="Prénom"
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            fullWidth
            required
          />

          
          <TextField
            label="Nom"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            fullWidth
            required
          />

       
          <TextField
            label="Manager ID"
            type="number"
            value={managerId ?? ''}
            onChange={e => setManagerId(Number(e.target.value))}
            fullWidth
            required
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={isPending}
          >
            {isPending ? 'Création...' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};