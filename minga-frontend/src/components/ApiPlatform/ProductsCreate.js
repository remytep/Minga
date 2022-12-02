import {
    CreateGuesser,
} from "@api-platform/admin";
import {
    ReferenceInput,
    AutocompleteInput,
    TextInput
} from "react-admin";

export const ProductCreate = (props) => (
    <CreateGuesser {...props}>
        <TextInput source="name" />
        <TextInput source="description" />
        <TextInput source="photo" />
        <ReferenceInput source="category" reference="product_categories">
            <AutocompleteInput
                optionText="name"
            />
        </ReferenceInput>
        <ReferenceInput source="productOptions" reference="product_options">
            <AutocompleteInput
                optionText="name"
            />
        </ReferenceInput>
        <ReferenceInput source="productOptionsValues" reference="product_option_values">
            <AutocompleteInput
                optionText="name"
            />
        </ReferenceInput>
        <ReferenceInput source="SKUs" reference="s_k_us">
            <AutocompleteInput
                optionText="price"
            />
        </ReferenceInput>
    </CreateGuesser>
);

export const ProductCategoryCreate = (props) => (
    <CreateGuesser {...props}>
        <TextInput source="name" />
        <ReferenceInput source="product" reference="products">
            <AutocompleteInput
                optionText="name"
            />
        </ReferenceInput>
    </CreateGuesser>
);

export const ProductOptionCreate = (props) => (
    <CreateGuesser {...props}>
        <ReferenceInput source="product" reference="products">
            <AutocompleteInput
                optionText="name"
            />
        </ReferenceInput>
        <TextInput source="name" />
        <ReferenceInput source="product_option_values" reference="product_option_values">
            <TextInput
                source="value"
            />
        </ReferenceInput>
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
        <TextInput source="value" />
    </CreateGuesser>
);