import React from "react";
import {
    CreateGuesser,
    FieldGuesser,
    InputGuesser
} from "@api-platform/admin";
import {
    ArrayInput,
    AutocompleteInput,
    PasswordInput,
    SimpleFormIterator,
    ReferenceInput,
    TextInput,
    useCreate,
    useCreateSuggestionContext
} from "react-admin";
import {
    Box,
    BoxProps,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
} from '@mui/material';


const CreateOption = () => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [create] = useCreate();
    const [value, setValue] = React.useState(filter || '');

    const handleSubmit = event => {
        event.preventDefault();
        create(
            'product_options',
            { data: { name: value } },
            {
                onSuccess: (data) => {
                    setValue('');
                    onCreate(data);
                },
            }
        );
    };

    return (
        <Dialog open onClose={onCancel}>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        label="New product option name"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        autoFocus
                    />

                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export const ProductCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="name" fullWidth />
        <InputGuesser source="description" fullWidth multiline />
        <InputGuesser source="thumbnail" fullWidth multiline />
        <ReferenceInput source="productCategory" reference="product_categories">
            <AutocompleteInput
                optionText="name"
                fullWidth
            />
        </ReferenceInput>
        <ReferenceInput source="productOptions" reference="product_options">
            <AutocompleteInput
                optionText="name"
                fullWidth
                create={<CreateOption />}
            />
        </ReferenceInput>
        {/* <ArrayInput source="productOptions">
            <SimpleFormIterator inline>

            </SimpleFormIterator>
        </ArrayInput> */}

        <InputGuesser source="slug" fullWidth />
    </CreateGuesser>
);

export const ProductCategoryCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="name" />
    </CreateGuesser>
);

export const ProductOptionCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="name" fullWidth />
    </CreateGuesser>
);

export const ProductOptionValueCreate = (props) => (
    <CreateGuesser {...props}>
        <ReferenceInput label="product" source="products" reference="products">
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="product option name" source="product_options" reference="product_options">
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <InputGuesser source="value" />
    </CreateGuesser>
);

export const UserCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="email" fullWidth />
        <PasswordInput source="password" fullWidth />
    </CreateGuesser>
);
