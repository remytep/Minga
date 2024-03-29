import { EditGuesser, InputGuesser } from "@api-platform/admin";
import { ImageField, ImageInput, required, WithRecord } from "react-admin";
import { ProductCategoryTitle } from "../TitleComponents";

const ProductCategoryEdit = (props) => (
    <EditGuesser {...props} title={<ProductCategoryTitle />}>
        <InputGuesser source="name" fullWidth validate={required()} />
        <ImageInput source="thumbnail" fullWidth>
            <ImageField source="src" title="title" />
        </ImageInput>
        <WithRecord
            label="thumbnail"
            render={(record) => (
                <img
                    className="thumbnail"
                    src={`${process.env.REACT_APP_UPLOADS}/${record.thumbnail}`}
                />
            )}
        />
    </EditGuesser>
);
export default ProductCategoryEdit;
