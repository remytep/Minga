import {
    List,
    Create,
    required,
    Edit,
    EditButton,
    SimpleForm,
    TextInput,
    DateInput,
    EmailField,
    CreateButton,
    ExportButton,
    DatagridConfigurable,
    TextField,
    TopToolbar,
    SelectColumnsButton,
} from 'react-admin';

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export const UserList = () => (
    <List actions={<ListActions />}>
        <DatagridConfigurable
            rowClick="edit"
        >
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" />
        </DatagridConfigurable>
        <EditButton label="Edit comment" />
    </List>
);

export const UserCreate = () => (
    <Create resource="users" >
        <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
        </SimpleForm>
    </Create>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="name" validate={required()} />
            <TextInput source="username" validate={required()} />
            <TextInput source="email" validate={required()} />
            <TextInput source="address.street" validate={required()} />
            <TextInput source="phone" validate={required()} />
            <TextInput source="website" validate={required()} />
            <TextInput source="company.name" validate={required()} />
            <DateInput label="Publication date" source="published_at" />
        </SimpleForm>
    </Edit>
);