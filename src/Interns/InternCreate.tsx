import { Create, SimpleForm, TextInput, ReferenceInput, required } from 'react-admin';

export const InternCreate = ()=>(
    <Create redirect="list">
    <SimpleForm>
    <TextInput source="firstname" label="Prénom" validate={required()} />
      <TextInput source="lastname" label="Nom" validate={required()} />
      <TextInput source="email" label="Email" validate={required()} />
      <ReferenceInput source='managerId' reference='employees'
      />
    </SimpleForm>
</Create>
)