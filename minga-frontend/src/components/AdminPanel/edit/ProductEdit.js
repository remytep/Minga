import { EditGuesser, InputGuesser } from "@api-platform/admin";
import { ReferenceInput, required } from "react-admin";
import { ProductTitle } from "../TitleComponents";

const transform = data => ({
    ...data,
    productCategory: `${data.productCategory["@id"]}`
});

const ProductEdit = (props) => (
    <EditGuesser {...props} title={<ProductTitle />} transform={transform}>
        <InputGuesser source="name" fullWidth validate={required()} />
        <InputGuesser source="description" fullWidth validate={required()} multiline />
        <ReferenceInput source="productCategory.@id" reference="product_categories" />
        <InputGuesser source="slug" fullWidth validate={required()} />
        <InputGuesser source="featured" fullWidth />
    </EditGuesser >
);
export default ProductEdit;
