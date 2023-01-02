import { EditGuesser, InputGuesser } from "@api-platform/admin";
import { AutocompleteInput, ImageField, ImageInput, ReferenceInput, required, WithRecord } from "react-admin";
import { ProductTitle } from "../TitleComponents";

const transform = (data) => ({
    ...data,
    ProductSubCategory: `${data.ProductSubCategory["@id"]}`,
});

const ProductEdit = (props) => (
    <EditGuesser {...props} title={<ProductTitle />} transform={transform}>
        <InputGuesser source="name" fullWidth validate={required()} />
        <InputGuesser
            source="description"
            fullWidth
            validate={required()}
            multiline
        />
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
        <ReferenceInput
            source="ProductSubCategory.@id"
            reference="product_sub_categories"
        >
            <AutocompleteInput optionText="name" fullWidth validate={required()} />
        </ReferenceInput>
        <InputGuesser source="slug" fullWidth validate={required()} />
        <InputGuesser source="featured" fullWidth />
    </EditGuesser>
);
export default ProductEdit;
