import { FieldGuesser, ListGuesser } from "@api-platform/admin";
import {
  Datagrid,
  ReferenceArrayField,
  ReferenceField,
  FunctionField,
  WithRecord,
  DateField,
  ArrayField,
  TextField,
} from "react-admin";

const EditSku = (id, resource, record) => {
  window.location.href = `/admin/skus/%2Fapi%2Fskus%2F${record.id}/show`;
};

const ProductList = (props) => (
  <ListGuesser {...props}>
    <FieldGuesser source="name" />
    <FunctionField
      label="Description"
      render={(record) =>
        record["description"].length > 20
          ? record["description"].substring(0, 20) + "..."
          : record["description"]
      }
    />
    <DateField source="createdAt" showTime />
    <ReferenceField
      source="productSubCategory.@id"
      reference="product_sub_categories"
    />

    <ArrayField source="skus">
      <FunctionField
        render={(record) => record.skus.length === 0 && <p>No skus found</p>}
      />
      <Datagrid rowClick={EditSku}>
        <FunctionField
          label="Price"
          render={(record) => record && record["price"] + " €"}
        />
        <WithRecord
          label="Stock"
          render={(record) =>
            record.stock === 0 ? (
              <span className="no-stock">Out of stock</span>
            ) : (
              <span className="in-stock">{record.stock}</span>
            )
          }
        />
        <WithRecord
          label="Weight"
          render={(record) =>
            record.weight >= 1000 ? (
              <span>{record.weight / 1000} kg</span>
            ) : (
              <span>{record.weight} g</span>
            )
          }
        />
        <TextField source="referenceNumber" />
      </Datagrid>
    </ArrayField>
    <FieldGuesser source={"slug"} />
    <FunctionField
      label="featured"
      render={(record) => (record["featured"] ? "true" : "false")}
    />
    <FieldGuesser source={"viewCount"} />
  </ListGuesser>
);
export default ProductList;
