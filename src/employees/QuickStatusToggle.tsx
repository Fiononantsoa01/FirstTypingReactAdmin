import { useRecordContext, useUpdate } from 'react-admin';
import { Button } from '@mui/material';

export const QuickStatusToggle = () => {
  const record = useRecordContext();

  const [update, { isPending }] = useUpdate(
    'employees',
    {
      id: record?.id,
      data: { active: !record?.active },
      previousData: record, 
    }
  );

  if (!record) return null;

  return (
    <Button
      variant="contained"
      color={record.active ? 'error' : 'success'}
      disabled={isPending}
      onClick={(e) => {
        e.stopPropagation(); 
        update();
      }}
      size="small"
    >
      {record.active ? 'Désactiver' : 'Activer'}
    </Button>
  );
};