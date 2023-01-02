import { FieldGuesser, ShowGuesser } from "@api-platform/admin";
import {
  ChipField,
  ReferenceArrayField,
  SingleFieldList,
  WithRecord,
} from "react-admin";
import { ProductSubCategoryTitle } from "../TitleComponents";

const ProductSubCategoryShow = (props) => (
  <ShowGuesser title={<ProductSubCategoryTitle />} {...props}>
    <FieldGuesser source={"name"} />
    <WithRecord
      label="thumbnail"
      render={(record) => (
        <img
          className="thumbnail"
          src={`http://localhost:8000/uploads/${record.thumbnail}`}
        />
      )}
    />
    <WithRecord
      label="Products"
      render={(record) =>
        record.products.length === 0 ? (
          <span>No products found</span>
        ) : (
          <ReferenceArrayField source="products" reference="products" />
        )
      }
    />
  </ShowGuesser>
);
export default ProductSubCategoryShow;
