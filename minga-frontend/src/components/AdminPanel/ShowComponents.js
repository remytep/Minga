import {
    FieldGuesser,
    ShowGuesser
} from "@api-platform/admin";
import {
    ArrayField,
    Button,
    ChipField,
    Datagrid,
    Link,
    ReferenceField,
    ReferenceArrayField,
    SingleFieldList,
    TextField,
    useRecordContext,
    Show, TabbedShowLayout, Tab
} from "react-admin";
import { ProductCategoryTitle, ProductTitle } from "./TitleComponents";

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

export const ProductShow = (props) => (
    <ShowGuesser title={<ProductTitle />} {...props} >
        <TabbedShowLayout>
            <Tab label="product info">
                <FieldGuesser source={"name"} />
                <FieldGuesser source={"description"} />
                <FieldGuesser source={"thumbnail"} />
                <FieldGuesser source={"createdAt"} />
                <ReferenceField source="productCategory.@id" reference="product_categories" >
                    <FieldGuesser source="name" />
                </ReferenceField>
                <FieldGuesser source={"slug"} />
            </Tab>

            <Tab label="SKU">
                <ArrayField source="productOptionValues" reference="product_option_values">
                    <Datagrid rowClick={"edit"}>
                        <ReferenceField source="productOption.@id" reference="product_options">
                            <TextField source="name" />
                        </ReferenceField>
                        <TextField source="value" />
                    </Datagrid>
                </ArrayField>
                <AddSkuValue {...props} />
            </Tab>
        </TabbedShowLayout>
    </ShowGuesser>
);

export const ProductCategoryShow = (props) => (
    <ShowGuesser title={<ProductCategoryTitle />}  {...props}>
        <FieldGuesser source={"name"} />
        <ReferenceArrayField source="products.id" reference="products">
            <SingleFieldList>
                <ChipField source="name" />
            </SingleFieldList>
        </ReferenceArrayField>
    </ShowGuesser>
);