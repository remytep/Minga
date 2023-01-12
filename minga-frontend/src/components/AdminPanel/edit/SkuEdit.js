import { EditGuesser, InputGuesser } from "@api-platform/admin";
import {
    AutocompleteInput,
    ImageField,
    ImageInput,
    ReferenceInput,
    required,
    WithRecord,
} from "react-admin";

const transform = (data) => ({
    ...data,
    product: `${data.product["@id"]}`,
});

const SkuEdit = () => (
    <EditGuesser transform={transform}>
        <ReferenceInput source="product.@id" reference="products">
            <AutocompleteInput source="name" validate={required()} fullWidth />
        </ReferenceInput>
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
        <InputGuesser source="price" validate={required()} />
        <InputGuesser source="stock" validate={required()} />
        <InputGuesser source="weight" validate={required()} />
        <InputGuesser source="referenceNumber" validate={required()} />
        <InputGuesser source="discountPercent" validate={required()} />
    </EditGuesser>
);
export default SkuEdit;
