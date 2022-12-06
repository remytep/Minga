import {
    CreateGuesser,
    InputGuesser
} from "@api-platform/admin";
import {
    AutocompleteInput,
    PasswordInput,
    ReferenceInput,
} from "react-admin";

export const ProductCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="name" fullWidth />
        <InputGuesser source="description" fullWidth multiline />
        <InputGuesser source="thumbnail" fullWidth multiline />
        <ReferenceInput source="productCategory" reference="product_categories">
            <AutocompleteInput optionText="name" fullWidth />
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
