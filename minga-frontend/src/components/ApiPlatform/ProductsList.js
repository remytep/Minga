import {
    FieldGuesser,
    ListGuesser,
} from "@api-platform/admin";
import {
    ChipField,
    ReferenceArrayField,
    ReferenceField,
    SingleFieldList,
    TextField,
    TextInput
} from "react-admin";
import { ProductCategoryTitle, ProductTitle } from "./ProductsTitle";

const productFilters = [
    <TextInput label="search" source="q" alwaysOn />
]

export const ProductList = (props) => (
    <ListGuesser {...props} filters={productFilters}>
        <FieldGuesser source={"name"} />
        <FieldGuesser source={"description"} />
        <FieldGuesser source={"photo"} />
        <FieldGuesser source={"created_at"} />
        {/* Use react-admin components directly when you want complex fields. */}
        <ReferenceField label="Category name" source="category" reference="product_categories">
            <TextField source="name" />
        </ReferenceField>
        <FieldGuesser source={"productOptions"} />
        <FieldGuesser source={"productOptionValues"} />
        <FieldGuesser source={"SKUValues"} />
        <FieldGuesser source={"SKUs"} />
    </ListGuesser>
);

export const ProductCategoryList = (props) => (
    <ListGuesser {...props} >
        <FieldGuesser source={"name"} />
        <ReferenceArrayField label="Products name" source="products" reference="products">
            <SingleFieldList>
                <ChipField source="name" />
            </SingleFieldList>
        </ReferenceArrayField>
    </ListGuesser>
);


export const ProductOptionList = (props) => (
    <ListGuesser {...props} >
        <ReferenceField label="Product name" source="product" reference="products">
            <TextField source="name" />
        </ReferenceField>
        <FieldGuesser source="name" />
        <ReferenceField label="Product option value" source="product_option_values" reference="product_option_values">
            <TextField source="value" />
        </ReferenceField>
    </ListGuesser>
);