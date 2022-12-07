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
} from "react-admin";
import { ProductCategoryTitle, ProductTitle } from "./TitleComponents";


const format = ({ source }) => {
    console.log(source)
}

export const ProductList = (props) => (
    <ListGuesser {...props}>
        <FieldGuesser source={"name"} />
        <FieldGuesser source={"description"} />
        <FieldGuesser source={"thumbnail"} />
        <FieldGuesser source={"createdAt"} />
        {/* Use react-admin components directly when you want complex fields. */}
        <ReferenceField source="productCategory.@id" reference="product_categories" >
            <FieldGuesser source="name" />
        </ReferenceField>
        <FieldGuesser source={"productOptions"} />
        <FieldGuesser source={"skus"} />
        <FieldGuesser source={"slug"} />
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