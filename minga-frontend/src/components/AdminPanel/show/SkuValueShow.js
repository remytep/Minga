import { ShowGuesser } from "@api-platform/admin";
import { ReferenceField } from "react-admin";

const SkuValueShow = () => (
    <ShowGuesser>
        <ReferenceField source="product.@id" reference="products" />
        <ReferenceField source="Sku" reference="skus" />
        <ReferenceField source="productOption" reference="product_options" />
        <ReferenceField source="productOptionValue.@id" reference="product_option_values" />
    </ShowGuesser>
)
export default SkuValueShow;