import { EditGuesser, InputGuesser } from "@api-platform/admin";
import {
  required,
  ReferenceInput,
  AutocompleteInput,
  ImageInput,
  ImageField,
  WithRecord,
} from "react-admin";
import { ProductSubCategoryTitle } from "../TitleComponents";

const ProductSubCategoryEdit = (props) => (
  <EditGuesser {...props} title={<ProductSubCategoryTitle />}>
    <InputGuesser source="name" fullWidth validate={required()} />
    <ReferenceInput source="productCategory" reference="product_categories">
      <AutocompleteInput optionText="name" fullWidth validate={required()} />
    </ReferenceInput>
    <ImageInput source="thumbnail" fullWidth>
      <ImageField source="src" title="title" />
    </ImageInput>
    <WithRecord
      label="thumbnail"
      render={(record) => (
        <img
          className="thumbnail"
          src={`${process.env.REACT_APP_UPLOADS}/${record.thumbnail}`}
        />
      )}
    />
  </EditGuesser>
);
export default ProductSubCategoryEdit;
