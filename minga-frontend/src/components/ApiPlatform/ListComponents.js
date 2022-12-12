import {
    FieldGuesser,
    ListGuesser,
} from "@api-platform/admin";
import {
    ArrayField,
    ChipField,
    Datagrid,
    ReferenceArrayField,
    ReferenceManyField,
    ReferenceField,
    SingleFieldList,
    TextField,
    FunctionField,
} from "react-admin";
import { ProductCategoryTitle, ProductTitle } from "./TitleComponents";
import "./style.css";

export const ProductList = (props) => (
    <ListGuesser {...props}>
        <FieldGuesser source={"name"} />
        <FunctionField
            label="Description"
            render={record => record["description"].length > 20 ? record["description"].substring(0, 20) + "..." : record["description"]}
        />
        <FieldGuesser source={"thumbnail"} />
        <FieldGuesser source={"createdAt"} />
        {/* Use react-admin components directly when you want complex fields. */}
        <ReferenceField source="productCategory.@id" reference="product_categories" >
            <FieldGuesser source="name" />
        </ReferenceField>

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
        <FieldGuesser source="name" />
    </ListGuesser>
);