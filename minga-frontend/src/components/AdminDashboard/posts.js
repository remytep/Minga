import {
    List,
    Create,
    required,
    Edit,
    EditButton,
    SimpleForm,
    TextInput,
    DateInput,
    DateField,
    ReferenceField,
    CreateButton,
    ExportButton,
    ReferenceManyField,
    Datagrid,
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

export const PostList = () => (
    <List actions={<ListActions />}>
        <DatagridConfigurable rowClick="edit">
            <ReferenceField source="userId" reference="users" />
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
        </DatagridConfigurable>
    </List>
);

export const PostCreate = () => (
    <Create resource="posts" >
        <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
        </SimpleForm>
    </Create>
);

export const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="title" validate={required()} />
            <TextInput multiline source="teaser" validate={required()} />
            <DateInput label="Publication date" source="published_at" />
            <ReferenceManyField label="Comments" reference="comments" target="post_id">
                <Datagrid>
                    <TextField source="body" />
                    <DateField source="created_at" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);