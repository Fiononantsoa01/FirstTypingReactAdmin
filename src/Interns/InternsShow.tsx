import {
    Show, SimpleShowLayout, TextField, DateField,
    BooleanField, NumberField, ReferenceField,
    TopToolbar, ListButton, EditButton, FunctionField
  } from 'react-admin';
  import { ManagerCard } from './ManagerCard';
  
  const ShowActions = () => (
    <TopToolbar>
      <ListButton />
      <EditButton />
    </TopToolbar>
  );
  
  export const InternShow = () => (
    <Show actions={<ShowActions />}>
      <SimpleShowLayout>
    
        <TextField source="firstname" label="Prénom" />
        <TextField source="lastname" label="Nom" />
        <TextField source="email" label="Email" />
        <TextField source="phone" label="Téléphone" />
        <TextField source="department" label="Département" />
        <DateField source="startDate" label="Date début" />
        <DateField source="endDate" label="Date fin" />
        <BooleanField source="isPaid" label="Rémunéré" />
        <NumberField source="amount" label="Rémunération"
          options={{ style: 'currency', currency: 'EUR' }} />
  
      
        <ReferenceField 
          source="managerId" 
          reference="employees" 
          label="Manager"
          link="show"
        >
          <FunctionField render={r => `${r.firstname} ${r.lastname}`} />
        </ReferenceField>
  
      
        <ManagerCard />
      </SimpleShowLayout>
    </Show>
  );