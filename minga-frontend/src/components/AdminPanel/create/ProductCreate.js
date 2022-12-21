import React from "react";
import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { AutocompleteInput, ReferenceInput } from "react-admin";
import { required, regex } from 'react-admin';

const ProductCreate = (props) => {
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
export default ProductCreate;