import {
    EditGuesser,
    InputGuesser
} from "@api-platform/admin";
import {
    AutocompleteInput,
    AutocompleteArrayInput,
    ReferenceInput,
    ReferenceArrayInput,
    ImageInput,
    ImageField,
} from "react-admin";
import { ProductCategoryTitle, ProductTitle } from "./TitleComponents";

const PreviewImage = ({ record, source }) => {
    console.log(record);
    let images = [{
        url: source,
    }]
    if (typeof (record) == "string") {
        record = {
            [source]: record
        }
    }

    return (
        <ImageInput source="thumbnail" fullWidth >
            <ImageField source="src" />
        </ImageInput>
    )
}

const transform = data => ({
    ...data,
    productCategory: `${data.productCategory["@id"]}`
});

export const ProductEdit = (props) => (
    <EditGuesser {...props} title={<ProductTitle />} transform={transform}>
        <InputGuesser source={"name"} fullWidth />
        <InputGuesser source={"description"} fullWidth multiline />
        <ReferenceInput source="productCategory.@id" reference="product_categories" />
        <InputGuesser source={"slug"} fullWidth />
    </EditGuesser >
);

export const ProductCategoryEdit = (props) => (
    <EditGuesser {...props} title={<ProductCategoryTitle />}>
        <InputGuesser source={"name"} fullWidth />
    </EditGuesser>
);

