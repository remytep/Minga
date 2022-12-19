import { FieldGuesser, ListGuesser } from "@api-platform/admin";
import { FunctionField, ReferenceField, WithRecord } from "react-admin";
import "../style.css";

const SkuList = (props) => (
    <ListGuesser {...props} >
        <ReferenceField source="product" reference="products" >
            <FieldGuesser source="name" />
        </ReferenceField>
        <ReferenceField source="productOption" reference="product_options" >
            <FieldGuesser source="name" />
        </ReferenceField>
        <FieldGuesser source={"optionValue"} />
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
    </ListGuesser >
);
export default SkuList;