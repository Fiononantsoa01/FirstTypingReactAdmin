import { Create, SimpleForm, TextInput, ReferenceInput,NumberInput, required, BooleanInput, SelectInput, AutocompleteInput, minValue } from 'react-admin';
import { useWatch, useFormContext } from 'react-hook-form';
import { useGetOne } from 'react-admin';
import {useEffect} from 'react';
const AutoDepartment = () => {
    const managerId = useWatch({ name: 'managerId' });
    const { setValue } = useFormContext();

    const { data: manager } = useGetOne('employees',
        { id: managerId },
        { enabled: !!managerId }
    );

    useEffect(() => {
        if (manager) {
            setValue('department', manager.department);
        }
    }, [manager]);

    return (
        <TextInput source="department" label="Département" disabled />
    );
};
const SalaireConditionnel = () => {
    const isPaid = useWatch({ name: 'isPaid' });
    
    if (!isPaid) return null;
    
    return (
      <NumberInput 
        source="amount" 
        label="Salaire" 
        validate={[required(),minValue(300)]} 
        min={300}
      />
    );
  };
export const InternCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="firstname" label="Prénom" validate={required()} />
            <TextInput source="lastname" label="Nom" validate={required()} />
            <TextInput source="email" label="Email" validate={required()} />
            <TextInput source="phone" label="Téléphone" />
            <ReferenceInput source='managerId' reference='employees' label='Manager'>
                <AutocompleteInput label='firstName' validate={required()} />
            </ReferenceInput>
            <AutoDepartment />
            <TextInput source="startDate" label="Date début" />
                    <TextInput source="endDate" label="Date fin" />
            <BooleanInput source='isPaid' label="salaire" />
            <SalaireConditionnel/>
        </SimpleForm>
    </Create>
)