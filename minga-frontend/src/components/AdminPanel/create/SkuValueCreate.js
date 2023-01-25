import { CreateGuesser } from "@api-platform/admin";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  AutocompleteInput,
  FormDataConsumer,
  ReferenceInput,
  required,
} from "react-admin";

const SkuValueCreate = () => {
  const [product, setProduct] = useState();
  const [productOption, setProductOption] = useState();
  const [sku, setSku] = useState();

  const [optionsByProduct, setOptionsByProduct] = useState();
  const [optionValuesByOption, setOptionValuesByOption] = useState();
  const [skuByProduct, setSkuByProduct] = useState();

  useEffect(() => {
    if (product) {
      axios
        .get(`https://localhost:8000${product}`)
        .then((res) => {
          setSkuByProduct(res.data.skus);
          return setOptionsByProduct(res.data.productOptions);
        })
        .catch((err) => {
          throw err;
        });
    }
    if (productOption) {
      axios
        .get(`https://localhost:8000${productOption}`)
        .then((res) => {
          return setOptionValuesByOption(res.data.productOptionValues);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [product, productOption]);

  return (
    <CreateGuesser>
      <ReferenceInput source="product" reference="products">
        <AutocompleteInput optionText="name" validate={required()} />
      </ReferenceInput>
      <AutocompleteInput
        source="Sku"
        choices={skuByProduct}
        optionValue="@id"
        optionText="referenceNumber"
        validate={required()}
      />
      <FormDataConsumer>
        {({ formData, scopedFormData, ...rest }) => {
          if (product !== formData.product || sku !== formData.Sku) {
            formData.productOption = null;
          }
          setProductOption(formData.productOption);
          setProduct(formData.product);
          setSku(formData.Sku);
          return (
            <>
              <AutocompleteInput
                source="productOption"
                choices={optionsByProduct}
                optionValue="@id"
                validate={required()}
                {...rest}
              />
              <AutocompleteInput
                source="productOptionValue"
                choices={formData.productOption ? optionValuesByOption : []}
                optionValue="@id"
                optionText="value"
                validate={required()}
                {...rest}
              />
            </>
          );
        }}
      </FormDataConsumer>
    </CreateGuesser>
  );
};
export default SkuValueCreate;
