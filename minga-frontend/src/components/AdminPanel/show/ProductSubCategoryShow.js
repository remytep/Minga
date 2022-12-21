import { FieldGuesser, ShowGuesser } from "@api-platform/admin";
import { ChipField, ReferenceArrayField, SingleFieldList } from "react-admin";
import { ProductSubCategoryTitle } from "../TitleComponents";

const ProductSubCategoryShow = (props) => (
  <ShowGuesser title={<ProductSubCategoryTitle />} {...props}>
    <FieldGuesser source={"name"} />
    <ReferenceArrayField source="products" reference="products">
      <SingleFieldList>
        <ChipField source="name" />
      </SingleFieldList>
    </ReferenceArrayField>
  </ShowGuesser>
);
export default ProductSubCategoryShow;
