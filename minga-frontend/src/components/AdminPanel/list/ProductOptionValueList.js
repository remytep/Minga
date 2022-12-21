import { FieldGuesser, ListGuesser } from "@api-platform/admin";
import { ReferenceField } from "react-admin";

const ProductOptionValueList = (props) => (
    <ListGuesser {...props} >
        <ReferenceField source="product" reference="products" />
        <ReferenceField source="productOption.@id" reference="product_options" />
        <FieldGuesser source="value" />
    </ListGuesser>
);
export default ProductOptionValueList;
