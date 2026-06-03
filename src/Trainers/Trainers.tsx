import { BooleanField, DataTable, DateField, EmailField, List, ReferenceField } from 'react-admin';

export const TrainerList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="firstname" />
            <DataTable.Col source="lastname" />
            <DataTable.Col source="email">
                <EmailField source="email" />
            </DataTable.Col>
            <DataTable.Col source="phone" />
            <DataTable.Col source="department" />
            <DataTable.Col source="managerId">
                <ReferenceField source="managerId" reference="employees" label="manager" />
            </DataTable.Col>
            <DataTable.Col source="startDate">
                <DateField source="startDate" />
            </DataTable.Col>
            <DataTable.Col source="endDate">
                <DateField source="endDate" />
            </DataTable.Col>
            <DataTable.Col source="isPaid">
                <BooleanField source="isPaid" />
            </DataTable.Col>
            <DataTable.NumberCol source="amount" />
        </DataTable>
    </List>
);