import React from "react";
import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { AutocompleteInput, ReferenceInput } from "react-admin";
import { required } from 'react-admin';

const ProductOptionCreate = (props) => (
    <CreateGuesser {...props}>
        <ReferenceInput source="product" reference="products">
            <AutocompleteInput source="name" validate={required()} fullWidth />
        </ReferenceInput>
        <InputGuesser label="Option value name" source="name" fullWidth validate={required()} />
    </CreateGuesser>
);

export default ProductOptionCreate;