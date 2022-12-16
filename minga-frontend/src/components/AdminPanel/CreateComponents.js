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

export const ProductCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="name" fullWidth />
        <InputGuesser source="description" fullWidth multiline />
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
        <ReferenceInput source="product" reference="products">
            <AutocompleteInput optionText="name" disabled />
        </ReferenceInput>
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

export const SkuCreate = (props) => (
    <CreateGuesser {...props}>
        <ReferenceInput source="product" reference="products">
            <AutocompleteInput optionText="name" disabled />
        </ReferenceInput>
        <ReferenceInput source="productOption" reference="product_options">
            <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <ImageInput source="thumbnail" fullWidth >
            <ImageField source="src" title="title" />
        </ImageInput>
        <InputGuesser source="optionValue" fullWidth />
        <InputGuesser source="price" fullWidth />
        <InputGuesser source="stock" fullWidth />
        <InputGuesser source="referenceNumber" fullWidth />
    </CreateGuesser>
)

export const UserCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="email" fullWidth />
        <PasswordInput source="password" fullWidth />
    </CreateGuesser>
);
