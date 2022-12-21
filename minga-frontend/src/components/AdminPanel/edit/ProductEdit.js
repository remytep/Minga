import { EditGuesser, InputGuesser } from "@api-platform/admin";
import { ReferenceInput, required } from "react-admin";
import { ProductTitle } from "../TitleComponents";

const transform = (data) => ({
  ...data,
  ProductSubCategory: `${data.ProductSubCategory["@id"]}`,
});

const ProductEdit = (props) => (
  <EditGuesser {...props} title={<ProductTitle />} transform={transform}>
    <InputGuesser source="name" fullWidth validate={required()} />
    <InputGuesser
      source="description"
      fullWidth
      validate={required()}
      multiline
    />
    <ReferenceInput
      source="ProductSubCategory.@id"
      reference="product_sub_categories"
    />
    <InputGuesser source="slug" fullWidth validate={required()} />
    <InputGuesser source="featured" fullWidth />
  </EditGuesser>
);
export default ProductEdit;
