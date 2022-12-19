import {
    FieldGuesser,
    ListGuesser,
} from "@api-platform/admin";
import {
    Datagrid,
    ReferenceArrayField,
    ReferenceField,
    FunctionField,
    WithRecord,
    DateField,
} from "react-admin";

const ProductList = (props) => (
    <ListGuesser {...props}>
        <FieldGuesser source="name" />
        <FunctionField
            label="Description"
            render={record => record["description"].length > 20 ?
                record["description"].substring(0, 20) + "..."
                : record["description"]
            }
        />
        <DateField source="createdAt" showTime />
        <ReferenceField source="productCategory.@id" reference="product_categories" />

        <ReferenceArrayField source="skus" reference="skus">
            <Datagrid rowClick="edit">
                <ReferenceField source="productOption" reference="product_options" />
                <FieldGuesser source="optionValue" />
                <FunctionField
                    label="Price"
                    render={record => record && record["price"] + " €"}
                />
                <WithRecord
                    label="Stock"
                    render={record => record.stock === 0 ?
                        <span className="no-stock">Out of stock</span>
                        : <span className="in-stock">{record.stock}</span>
                    }
                />
            </Datagrid>
        </ReferenceArrayField>
        <FieldGuesser source={"slug"} />
        <FunctionField
            label="featured"
            render={record => record["featured"] ? "true" : "false"}
        />
    </ListGuesser>
);
export default ProductList;