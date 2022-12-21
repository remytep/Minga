import { EditGuesser, InputGuesser } from "@api-platform/admin";
import { required } from "react-admin";
import { ProductCategoryTitle } from "../TitleComponents";

const ProductCategoryEdit = (props) => (
    <EditGuesser {...props} title={<ProductCategoryTitle />}>
        <InputGuesser source="name" fullWidth validate={required()} />
    </EditGuesser>
);
export default ProductCategoryEdit;