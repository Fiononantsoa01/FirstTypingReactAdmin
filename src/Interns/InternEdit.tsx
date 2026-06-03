import { 
    Edit, SimpleForm, TextInput, NumberInput,
    BooleanInput, ReferenceInput, SelectInput,
    required, useRecordContext, useGetOne
  } from 'react-admin';
  import { useWatch, useFormContext } from 'react-hook-form';
  import { useEffect } from 'react';

  const InternTitle = () => {
    const record = useRecordContext();
    return record 
      ? <span>Modifier : {record.firstname} {record.lastname}</span>
      : null;
  };
  
 
  const AutoDepartment = () => {
    const managerId = useWatch({ name: 'managerId' });
    const { setValue } = useFormContext();
    
    const { data: manager } = useGetOne(
      'employees',
      { id: managerId },
      { enabled: !!managerId }
    );
  
    useEffect(() => {
      if (manager) {
        setValue('department', manager.department);
      }
    }, [manager]);
  
    return <TextInput source="department" label="Département" disabled />;
  };
  
 
  const SalaireConditionnel = () => {
    const isPaid = useWatch({ name: 'isPaid' });
    if (!isPaid) return null;
    return (
      <NumberInput 
        source="amount" 
        label="Salaire" 
        validate={required()} 
      />
    );
  };
  
  export const InternEdit = () => (
    <Edit title={<InternTitle />}>
      <SimpleForm>
        <TextInput source="firstname" label="Prénom" validate={required()} />
        <TextInput source="lastname" label="Nom" validate={required()} />
        <TextInput source="email" label="Email" validate={required()} />
        <TextInput source="phone" label="Téléphone" />
        <ReferenceInput source="managerId" reference="employees">
          <SelectInput 
            optionText={r => `${r.firstname} ${r.lastname}`} 
            label="Manager" 
            validate={required()} 
          />
        </ReferenceInput>
        <AutoDepartment />
        <TextInput source="startDate" label="Date début" />
        <TextInput source="endDate" label="Date fin" />
        <BooleanInput source="isPaid" label="Rémunéré" />
        <SalaireConditionnel />
      </SimpleForm>
    </Edit>
  );