import { FieldGuesser, ShowGuesser } from "@api-platform/admin";
import { FunctionField, ReferenceField, WithRecord } from "react-admin";
import "./style.css";
const SkuShow = () => (
  <ShowGuesser>
    <ReferenceField source="product.@id" reference="products" />
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
    <FieldGuesser source="referenceNumber" />
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
      label="Discount Percent"
      render={(record) =>
        record.discountPercent === 0 ? (
          <span>Full price</span>
        ) : (
          <span className="discount">{record.discountPercent}%</span>
        )
      }
    />
  </ShowGuesser>
);
export default SkuShow;
