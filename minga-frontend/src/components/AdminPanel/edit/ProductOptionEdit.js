import { EditGuesser, InputGuesser } from "@api-platform/admin";
import { AutocompleteInput, ReferenceInput, required } from "react-admin";

const transform = (data) => ({
  ...data,
  product: `${data.product["@id"]}`,
});

const ProductOptionEdit = () => (
  <EditGuesser transform={transform}>
    <ReferenceInput source="product.@id" reference="products">
      <AutocompleteInput source="name" validate={required()} fullWidth />
    </ReferenceInput>
    <InputGuesser source="name" validate={required()} fullWidth />
  </EditGuesser>
)
export default ProductOptionEdit
