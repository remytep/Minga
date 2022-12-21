import React from "react";
import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { ImageField, ImageInput, required } from "react-admin";

const ProductCategoryCreate = (props) => (
    <CreateGuesser {...props}>
        <InputGuesser source="name" validate={required()} />
        <ImageInput source="thumbnail" fullWidth>
            <ImageField source="src" title="title" validate={required()} />
        </ImageInput>
    </CreateGuesser>
);
export default ProductCategoryCreate;
