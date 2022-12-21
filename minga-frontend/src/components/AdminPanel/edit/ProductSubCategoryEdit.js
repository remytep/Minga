import { EditGuesser, InputGuesser } from "@api-platform/admin";
import { required, ReferenceInput, AutocompleteInput } from "react-admin";
import { ProductSubCategoryTitle } from "../TitleComponents";

const ProductSubCategoryEdit = (props) => (
  <EditGuesser {...props} title={<ProductSubCategoryTitle />}>
    <InputGuesser source="name" fullWidth validate={required()} />
    <ReferenceInput source="productCategory" reference="product_categories">
      <AutocompleteInput optionText="name" fullWidth validate={required()} />
    </ReferenceInput>
  </EditGuesser>
);
export default ProductSubCategoryEdit;
