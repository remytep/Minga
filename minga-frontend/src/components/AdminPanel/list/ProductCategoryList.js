import { FieldGuesser, ListGuesser } from "@api-platform/admin";
import { ReferenceArrayField } from "react-admin";

const ProductCategoryList = (props) => (
    <ListGuesser {...props}>
        <FieldGuesser source={"name"} />
        <ReferenceArrayField source="products" reference="products" />
    </ListGuesser>
);
export default ProductCategoryList;