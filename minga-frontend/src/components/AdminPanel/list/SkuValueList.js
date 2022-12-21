import { ListGuesser } from "@api-platform/admin";
import { ReferenceField } from "react-admin";

const SkuValueList = () => (
    <ListGuesser>
        <ReferenceField source="product.@id" reference="products" />
        <ReferenceField source="Sku" reference="skus" />
        <ReferenceField source="productOption" reference="product_options" />
        <ReferenceField source="productOptionValue.@id" reference="product_option_values" />
    </ListGuesser>
);
export default SkuValueList;