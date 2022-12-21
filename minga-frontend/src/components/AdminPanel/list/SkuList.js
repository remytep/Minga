import { FieldGuesser, ListGuesser } from "@api-platform/admin";
import { FunctionField, ReferenceField, WithRecord } from "react-admin";
import "../style.css";

const SkuList = (props) => (
    <ListGuesser {...props} >
        <ReferenceField source="product.@id" reference="products" />
        <FunctionField
            label="Price"
            render={record => record ? record["price"] + " €" : null}
        />
        <WithRecord
            label="Stock"
            render={record => record.stock === 0 ?
                <span className="no-stock">Out of stock</span>
                : <span className="in-stock">{record.stock}</span>
            }
        />
        <FieldGuesser source="referenceNumber" />
        <FieldGuesser source="thumbnail" />

    </ListGuesser >
);
export default SkuList;