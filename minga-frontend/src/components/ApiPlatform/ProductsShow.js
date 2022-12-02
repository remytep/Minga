import {
    FieldGuesser,
    ShowGuesser
} from "@api-platform/admin";
import {
    ChipField,
    ReferenceField,
    ReferenceArrayField,
    SingleFieldList,
    TextField,
    useRecordContext
} from "react-admin";
import { ProductCategoryTitle, ProductTitle } from "./ProductsTitle";

export const ProductShow = (props) => (
    <ShowGuesser title={<ProductTitle />} {...props} >
        <FieldGuesser source={"name"} />
        <FieldGuesser source={"description"} />
        <FieldGuesser source={"photo"} />
        <FieldGuesser source={"created_at"} />
        <ReferenceField label="Category name" source="category" reference="product_categories">
            <TextField source="name" />
        </ReferenceField>
        <FieldGuesser source={"productOptions"} />
        <FieldGuesser source={"productOptionValues"} />
        <FieldGuesser source={"SKUValues"} />
        <FieldGuesser source={"SKUs"} />
    </ShowGuesser>
);

export const ProductCategoryShow = (props) => (
    <ShowGuesser title={<ProductCategoryTitle />}  {...props}>
        <FieldGuesser source={"name"} />
        <ReferenceArrayField label="Products name" source="products" reference="products">
            <SingleFieldList>
                <ChipField source="name" />
            </SingleFieldList>
        </ReferenceArrayField>
    </ShowGuesser>
);