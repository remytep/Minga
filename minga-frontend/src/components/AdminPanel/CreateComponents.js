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
    useRecordContext,
    ImageInput,
    ImageField
} from "react-admin";

import {
    required,
    minLength,
    maxLength,
    minValue,
    maxValue,
    number,
    regex,
    email,
    choices
} from 'react-admin';

export const ProductCreate = (props) => {

    const validateSlug = [required(), regex(/^[A-Za-z0-9_]*$/, 'Spaces are not allowed')];

    return (
        <CreateGuesser {...props}>
            <InputGuesser source="name" fullWidth validate={required()} />
            <InputGuesser source="description" fullWidth validate={required()} multiline />
            <ReferenceInput source="productCategory" reference="product_categories">
                <AutocompleteInput
                    optionText="name"
                    fullWidth
                    validate={required()}
                />
            </ReferenceInput>
            <InputGuesser source="slug" validate={validateSlug} fullWidth />
            <InputGuesser source="featured" fullWidth />
        </CreateGuesser>
    );
}

export const ProductCategoryCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="name" validate={required()} />
    </CreateGuesser>
);

export const ProductOptionCreate = (props) => (
    <CreateGuesser {...props}>
        <ReferenceInput source="product" reference="products">
            <AutocompleteInput optionText="name" validate={required()} />
        </ReferenceInput>
        <InputGuesser label="Option value name" source="name" fullWidth required />
    </CreateGuesser>
);


export const ProductOptionValueCreate = (props) => (
    <CreateGuesser {...props}>
        <ReferenceInput source="product" reference="products">
            <AutocompleteInput optionText="name" disabled />
        </ReferenceInput>
        <ReferenceInput source="productOption" reference="product_options">
            <AutocompleteInput optionText="name" required />
        </ReferenceInput>
        <InputGuesser source="value" required />
    </CreateGuesser>
);

export const SkuCreate = (props) => (
    <CreateGuesser {...props}>
        <ReferenceInput source="product" reference="products">
            <AutocompleteInput optionText="name" disabled />
        </ReferenceInput>
        <ReferenceInput source="productOption" reference="product_options">
            <AutocompleteInput optionText="name" required />
        </ReferenceInput>
        <ImageInput source="thumbnail" fullWidth >
            <ImageField source="src" title="title" required />
        </ImageInput>
        <InputGuesser source="optionValue" fullWidth required />
        <InputGuesser source="price" fullWidth required />
        <InputGuesser source="stock" fullWidth required />
        <InputGuesser source="referenceNumber" fullWidth required />
    </CreateGuesser>
)

export const UserCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="email" fullWidth required />
        <PasswordInput source="password" fullWidth required />
    </CreateGuesser>
);
