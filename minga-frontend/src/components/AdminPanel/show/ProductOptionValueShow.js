import { FieldGuesser, ShowGuesser } from "@api-platform/admin";
import { ReferenceField } from "react-admin";

const ProductOptionValueShow = (props) => (
    <ShowGuesser {...props}>
        <ReferenceField source="product" reference="products" />
        <ReferenceField source="productOption.@id" reference="product_options" />
        <FieldGuesser source={"value"} />
    </ShowGuesser>
);
export default ProductOptionValueShow;