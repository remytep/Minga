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
        <InputGuesser source="name" fullWidth required />
        <InputGuesser source="description" fullWidth required multiline />
        <ReferenceInput source="productCategory.@id" reference="product_categories" />
        <InputGuesser source="slug" fullWidth required />
        <InputGuesser source="featured" fullWidth />
    </EditGuesser >
);

export const ProductCategoryEdit = (props) => (
    <EditGuesser {...props} title={<ProductCategoryTitle />}>
        <InputGuesser source="name" fullWidth />
    </EditGuesser>
);

export const ProductOptionValueEdit = (props) => (
    <EditGuesser  {...props} >
        <ReferenceInput source="product" reference="products" />
        <ReferenceInput source="productOption.@id" reference="product_options" />
        <InputGuesser source="value" fullWidth />
    </EditGuesser>
)

