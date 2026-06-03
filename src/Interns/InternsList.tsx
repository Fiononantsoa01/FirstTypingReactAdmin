import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  SearchInput,
  ReferenceField,
  FunctionField,
  SelectInput,
  EditButton,
  DeleteButton,
} from "react-admin";

const filters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput
    source="department"
    label="Département"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,
  <SelectInput
  source="isPaid"
  label="rénuméré"
  choices={[
   {id:true , name:'Rénuméré'},
    {id:false, name:'non rénuméré'}
  ]}/>
];

export const InternsList = () => (
  <List filters={filters} perPage={5}>
    <Datagrid rowClick="show">
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <TextField source="email" label="Email" />
      <ReferenceField source="id" reference="employees" label="Encadreur" empty="missing manager"
        >
          {/*  <TextField source="firstname"/>
            <TextField source="lastname"/>
             */}
              <FunctionField render={record => `${record.firstname} ${record.lastname}`} /> 
            
        </ReferenceField>
      
      <TextField source="department" label="Département" />
      <NumberField
        source="amount"
        label="Salaire"
        options={{ style: "currency", currency: "EUR" }}
      />
      <BooleanField source="isPaid" label="renumeré" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
