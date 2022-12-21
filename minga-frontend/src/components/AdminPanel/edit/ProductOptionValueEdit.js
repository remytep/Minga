import { EditGuesser, InputGuesser } from "@api-platform/admin";
import axios from "axios";
import { useEffect, useState } from "react";
import { AutocompleteInput, ReferenceInput, FormDataConsumer, required } from "react-admin";

const ProductOptionValueEdit = (props) => {

    const [product, setProduct] = useState();
    const [optionsByProduct, setOptionsByProduct] = useState();

    useEffect(() => {
        if (product) {
            axios
                .get(`http://localhost:8000${product}`)
                .then((res) => {
                    console.log(res.data.productOptions);
                    return setOptionsByProduct(res.data.productOptions);
                })
                .catch((err) => {
                    throw err;
                })

        }
    }, [product])

    return (
        <EditGuesser  {...props} >
            <ReferenceInput source="product" reference="products">
                <AutocompleteInput source="name" validate={required()} fullWidth />
            </ReferenceInput>
            <FormDataConsumer>
                {({ formData, scopedFormData, ...rest }) => {
                    setProduct(formData.product);
                    console.log(optionsByProduct);
                    return (
                        <AutocompleteInput
                            source="productOption"
                            choices={optionsByProduct}
                            optionValue="@id"
                            validate={required()}
                            {...rest}
                        />
                    )
                }}
            </FormDataConsumer>
            <InputGuesser source="value" validate={required()} fullWidth />
        </EditGuesser>
    )
}
export default ProductOptionValueEdit;