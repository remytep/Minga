import {
    FieldGuesser,
    ShowGuesser
} from "@api-platform/admin";
import {
    ArrayField,
    Button,
    Link,
    ReferenceField,
    SingleFieldList,
    useRecordContext,
    TabbedShowLayout,
    Tab,
    WithRecord,
    FunctionField,
    DateField,
    Datagrid,
    TextField
} from "react-admin";
import { ProductTitle } from "../TitleComponents";
import Chip from '@mui/material/Chip';

const AddSkuValue = () => {
    const record = useRecordContext();
    return (
        <Button
            component={Link}
            to={{
                pathname: "/admin/skus/create",
                // Here we specify the initial record for the create view
                state: { record: { product: record["@id"] } },
            }}
            label="Add sku value"
        >
        </Button>
    );
}

const AddOptionValue = () => {
    const record = useRecordContext();
    return (
        <Button
            component={Link}
            to={{
                pathname: "/admin/product_options/create",
                // Here we specify the initial record for the create view
                state: { record: { product: record["@id"] } },
            }}
            label="Add option value"
        >
        </Button>
    );
}

const EditSku = (id, resource, record) => {
    window.location.href = `/admin/skus/%2Fapi%2Fskus%2F${record.id}/show`;
}

const ProductShow = (props) => (
    <ShowGuesser title={<ProductTitle />} {...props} >
        <TabbedShowLayout>
            <Tab label="product info">
                <FieldGuesser source="name" />
                <FieldGuesser source="description" />
                <DateField source={"createdAt"} showTime />
                <ReferenceField source="productCategory.@id" reference="product_categories" />
                <FieldGuesser source="slug" />
                <FunctionField
                    label="featured"
                    render={record => record["featured"] ? "true" : "false"}
                />
            </Tab>

            <Tab label="option value">
                <ArrayField source="productOptions">
                    <FunctionField
                        label="featured"
                        render={record => record["productOptions"].length === 0
                            &&
                            <p>No options found</p>
                        }
                    />
                    <SingleFieldList linkType={false}>
                        <WithRecord
                            render={record => record &&
                                <Chip
                                    label={record.name}
                                    onClick={() => window.location.href = `/admin/product_options/%2Fapi%2Fproduct_options%2F${record.id}/edit`}
                                />
                            }
                        />
                    </SingleFieldList>
                    <AddOptionValue {...props} />

                </ArrayField>
            </Tab>

            <Tab label="SKU">
                <ArrayField source="skus">
                    <FunctionField
                        render={record => record.skus.length === 0
                            && <p>No skus found</p>
                        }
                    />
                    <Datagrid rowClick={EditSku}>
                        <FunctionField
                            label="Price"
                            render={record => record && record.price + " €"}
                        />
                        <WithRecord
                            label="Stock"
                            render={record => record.stock === 0 ?
                                <span className="no-stock">Out of stock</span>
                                : <span className="in-stock">{record.stock}</span>
                            }
                        />
                        <TextField source="referenceNumber" />
                    </Datagrid>

                </ArrayField>
                <AddSkuValue {...props} />
            </Tab>
        </TabbedShowLayout>
    </ShowGuesser>
);
export default ProductShow;