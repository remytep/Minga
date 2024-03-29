import React from "react";
import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import {
  AutocompleteInput,
  ReferenceInput,
  ImageInput,
  ImageField,
} from "react-admin";
import { required, regex } from "react-admin";

const ProductCreate = (props) => {
  const validateSlug = [
    required(),
    regex(/^[A-Za-z0-9_]*$/, "Spaces are not allowed"),
  ];

  const transform = (data) => {
    const sanitizedData = {};
    for (const key in data) {
      if (key === "featured") {
        sanitizedData[key] = data[key] === false ? 0 : 1;
        continue;
      }
      sanitizedData[key] = data[key];
    }
    return sanitizedData;
  };

  return (
    <CreateGuesser transform={transform}>
      <InputGuesser source="name" fullWidth validate={required()} />
      <InputGuesser
        source="description"
        fullWidth
        validate={required()}
        multiline
      />
      <ReferenceInput
        source="ProductSubCategory"
        reference="product_sub_categories"
      >
        <AutocompleteInput optionText="name" fullWidth validate={required()} />
      </ReferenceInput>
      <ImageInput source="thumbnail" fullWidth>
        <ImageField source="src" title="title" validate={required()} />
      </ImageInput>
      <InputGuesser source="slug" validate={validateSlug} fullWidth />
      <InputGuesser source="featured" fullWidth />
    </CreateGuesser>
  );
};
export default ProductCreate;
