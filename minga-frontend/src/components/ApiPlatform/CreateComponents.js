import React from "react";
import {
    CreateGuesser,
    InputGuesser
} from "@api-platform/admin";
import {
    ArrayInput,
    AutocompleteInput,
    PasswordInput,
    SelectArrayInput,
    SimpleFormIterator,
    ReferenceField,
    ReferenceInput,
    ReferenceArrayInput,
    TextInput,
    useCreate,
    useCreateSuggestionContext,
    useRecordContext
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
    const record = useRecordContext();
    const product = record.product;

    const handleSubmit = event => {
        event.preventDefault();
        create(
            'product_option_values',
            { data: { value: value, product } },
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
                        label="New product option value"
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
        <InputGuesser label="Option value name" source="name" fullWidth />
    </CreateGuesser>
);


export const ProductOptionValueCreate = (props) => (
    <CreateGuesser {...props}>
        <ReferenceInput source="product" reference="products">
            <AutocompleteInput optionText="name" disabled />
        </ReferenceInput>
        <ReferenceInput source="productOption" reference="product_options">
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
