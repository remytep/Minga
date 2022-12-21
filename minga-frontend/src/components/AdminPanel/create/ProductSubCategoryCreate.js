import React from "react";
import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import { required, AutocompleteInput, ReferenceInput } from "react-admin";

const ProductSubCategoryCreate = (props) => (
  <CreateGuesser {...props}>
    <InputGuesser source="name" validate={required()} />
    <ReferenceInput source="productCategory" reference="product_categories">
      <AutocompleteInput optionText="name" fullWidth validate={required()} />
    </ReferenceInput>
  </CreateGuesser>
);
export default ProductSubCategoryCreate;
