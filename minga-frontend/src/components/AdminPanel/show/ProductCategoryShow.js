import { FieldGuesser, ShowGuesser } from "@api-platform/admin";
import { ChipField, ReferenceArrayField, SingleFieldList } from "react-admin";
import { ProductCategoryTitle } from "../TitleComponents";

const ProductCategoryShow = (props) => (
  <ShowGuesser title={<ProductCategoryTitle />} {...props}>
    <FieldGuesser source={"name"} />

    <ReferenceArrayField
      source="productSubCategories"
      reference="product_sub_categories"
    >
      <SingleFieldList>
        <ChipField source="name" />
      </SingleFieldList>
    </ReferenceArrayField>
  </ShowGuesser>
);
export default ProductCategoryShow;
