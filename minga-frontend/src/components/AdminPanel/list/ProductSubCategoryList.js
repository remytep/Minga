import { FieldGuesser, ListGuesser } from "@api-platform/admin";
import {
  ArrayField,
  FunctionField,
  ReferenceArrayField,
  ReferenceField,
  SingleFieldList,
  WithRecord,
} from "react-admin";
import Chip from "@mui/material/Chip";

const ProductSubCategoryList = (props) => (
  <ListGuesser {...props}>
    <FieldGuesser source={"name"} />
    <ReferenceField
      source="productCategory.@id"
      reference="product_categories"
    />
    <WithRecord
      render={(record) =>
        record.products.length === 0 ? (
          <span>No products found</span>
        ) : (
          <ReferenceArrayField source="products" reference="products" />
        )
      }
    />
  </ListGuesser>
);
export default ProductSubCategoryList;
