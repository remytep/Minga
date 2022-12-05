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
import { ProductCategoryTitle, ProductTitle } from "./TitleComponents";

export const ProductShow = (props) => (
    <ShowGuesser title={<ProductTitle />} {...props} >
        <FieldGuesser source={"name"} />
        <FieldGuesser source={"description"} />
        <FieldGuesser source={"thumbnail"} />
        <ReferenceField source="productCategory" reference="product_categories">
            <TextField source="name" />
        </ReferenceField>
        <FieldGuesser source={"slug"} />
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