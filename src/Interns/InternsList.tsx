import {
  List,
  Datagrid,
  TextField,
  NumberField,
  BooleanField,
  SearchInput,
  SelectInput,
  EditButton,
  DeleteButton,
} from "react-admin";

const filters = [
  <SearchInput source="q" alwaysOn />,
  /*<SelectInput
    source="department"
    label="Département"
    choices={[
      { id: "Informatique", name: "Informatique" },
      { id: "Marketing", name: "Marketing" },
      { id: "RH", name: "RH" },
      { id: "Finance", name: "Finance" },
    ]}
  />,*/
];

export const InternsList = () => (
  <List filters={filters} perPage={5}>
    <Datagrid rowClick="show">
      <TextField source="firstname" label="Prénom" />
      <TextField source="lastname" label="Nom" />
      <TextField source="email" label="Email" />
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
