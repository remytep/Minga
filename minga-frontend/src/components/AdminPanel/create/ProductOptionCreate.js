import React from "react";
import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { ReferenceInput } from "react-admin";
import { required } from 'react-admin';

const ProductOptionCreate = (props) => (
    <CreateGuesser {...props}>
        <ReferenceInput source="product" reference="products" />
        <InputGuesser label="Option value name" source="name" fullWidth validate={required()} />
    </CreateGuesser>
);

export default ProductOptionCreate;