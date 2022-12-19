import { EditGuesser, InputGuesser } from "@api-platform/admin";
import { ProductCategoryTitle } from "../TitleComponents";

const ProductCategoryEdit = (props) => (
    <EditGuesser {...props} title={<ProductCategoryTitle />}>
        <InputGuesser source="name" fullWidth />
    </EditGuesser>
);
export default ProductCategoryEdit;