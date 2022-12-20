import { EditGuesser, InputGuesser } from "@api-platform/admin";
import { ImageField, ImageInput, ReferenceInput, required, WithRecord } from "react-admin";


const transform = data => ({
    ...data,
    product: `${data.product["@id"]}`
});

const SkuEdit = () => (
    <EditGuesser transform={transform}>
        <ReferenceInput source="product.@id" reference="products" />
        <ImageInput source="thumbnail" fullWidth>
            <ImageField source="src" title="title" />
        </ImageInput>
        <WithRecord label="thumbnail" render={record =>
            <img className="thumbnail" src={`http://localhost:8000/uploads/${record.thumbnail}`} />
        } />
        <InputGuesser source="price" validate={required()} />
        <InputGuesser source="stock" validate={required()} />
        <InputGuesser source="referenceNumber" validate={required()} />

        {/* <InputGuesser source="skuValues" /> */}
        {/* <InputGuesser source="thumbnail" /> */}
    </EditGuesser>
)
export default SkuEdit;