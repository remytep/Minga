import React from "react";
import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { required } from 'react-admin';

const ProductCategoryCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="name" validate={required()} />
    </CreateGuesser>
);
export default ProductCategoryCreate;