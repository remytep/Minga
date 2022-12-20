import { EditGuesser } from "@api-platform/admin";
import axios from "axios";
import { useEffect, useState } from "react";
import { AutocompleteInput, FormDataConsumer, ReferenceInput, required } from "react-admin";

const SkuValueEdit = () => {
    const [product, setProduct] = useState();
    const [productOption, setProductOption] = useState();
    const [sku, setSku] = useState();

    const [optionsByProduct, setOptionsByProduct] = useState();
    const [optionValuesByOption, setOptionValuesByOption] = useState();
    const [skuByProduct, setSkuByProduct] = useState();

    const transform = data => ({
        ...data,
        product: `${data.product["@id"]}`
    });

    useEffect(() => {
        if (product) {
            axios
                .get(`http://localhost:8000${product}`)
                .then((res) => {
                    // console.log(res.data)
                    setSkuByProduct(res.data.skus);
                    return setOptionsByProduct(res.data.productOptions);
                })
                .catch((err) => {
                    throw err;
                })

        }
        if (productOption) {
            axios
                .get(`http://localhost:8000${productOption}`)
                .then((res) => {
                    // console.log(res.data);
                    return setOptionValuesByOption(res.data.productOptionValues);
                })
                .catch((err) => {
                    throw err;
                })
        }

    }, [product, productOption])

    return (
        <EditGuesser transform={transform}>
            <ReferenceInput source="product.@id" reference="products">
                <AutocompleteInput optionText="name" validate={required()} />
            </ReferenceInput>
            <AutocompleteInput
                source="Sku"
                choices={skuByProduct}
                optionValue="@id"
                optionText="referenceNumber"
                validate={required()}
            />
            <FormDataConsumer>
                {({ formData, scopedFormData, ...rest }) => {
                    // console.log(scopedFormData);
                    if (product !== formData.product["@id"] || sku !== formData.Sku) {
                        formData.productOption = null;
                    }
                    setProductOption(formData.productOption);
                    setProduct(formData.product["@id"]);
                    setSku(formData.Sku)
                    console.log(formData);

                    return (
                        <>
                            <AutocompleteInput
                                source="productOption"
                                choices={optionsByProduct}
                                optionValue="@id"
                                validate={required()}
                                {...rest}
                            />
                            <AutocompleteInput
                                source="productOptionValue"
                                choices={formData.productOption ? optionValuesByOption : []}
                                optionValue="@id"
                                optionText="value"
                                validate={required()}
                                {...rest}
                            />
                        </>

                    )
                }}
            </FormDataConsumer>
        </EditGuesser>
    )

}
export default SkuValueEdit