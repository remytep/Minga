import React, { useEffect, useState } from "react";
import { CreateGuesser, InputGuesser } from "@api-platform/admin";
import {
  AutocompleteInput,
  ReferenceInput,
  FormDataConsumer,
} from "react-admin";
import { required } from "react-admin";
import axios from "axios";

const ProductOptionValueCreate = (props) => {
  const [product, setProduct] = useState();
  const [optionsByProduct, setOptionsByProduct] = useState();

  useEffect(() => {
    if (product) {
      axios
        .get(`https://localhost:8000${product}`)
        .then((res) => {
          // console.log(res.data.productOptions);
          return setOptionsByProduct(res.data.productOptions);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [product]);

  return (
    <CreateGuesser {...props}>
      <ReferenceInput source="product" reference="products">
        <AutocompleteInput source="name" validate={required()} fullWidth />
      </ReferenceInput>
      <FormDataConsumer>
        {({ formData, scopedFormData, ...rest }) => {
          setProduct(formData.product);
          // console.log(optionsByProduct);
          return (
            <AutocompleteInput
              source="productOption"
              choices={optionsByProduct}
              optionValue="@id"
              validate={required()}
              {...rest}
            />
          );
        }}
      </FormDataConsumer>
      <InputGuesser source="value" validate={required()} />
    </CreateGuesser>
  );
};
export default ProductOptionValueCreate;
