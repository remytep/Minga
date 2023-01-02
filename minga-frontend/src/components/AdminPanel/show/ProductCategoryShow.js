import { FieldGuesser, ShowGuesser } from "@api-platform/admin";
import {
  ChipField,
  ReferenceArrayField,
  SingleFieldList,
  WithRecord,
} from "react-admin";
import { ProductCategoryTitle } from "../TitleComponents";

const ProductCategoryShow = (props) => (
  <ShowGuesser title={<ProductCategoryTitle />} {...props}>
    <FieldGuesser source={"name"} />
    <WithRecord
      label="thumbnail"
      render={(record) => (
        <img
          className="thumbnail"
          src={`https://localhost:8000/uploads/${record.thumbnail}`}
        />
      )}
    />
    <WithRecord
      label="Product subcategories"
      render={(record) =>
        record.productSubCategories.length === 0 ? (
          <span>No subcategories found</span>
        ) : (
          <ReferenceArrayField
            source="productSubCategories"
            reference="product_sub_categories"
          />
        )
      }
    />
  </ShowGuesser>
);
export default ProductCategoryShow;
