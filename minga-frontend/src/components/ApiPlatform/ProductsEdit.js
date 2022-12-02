import {
    EditGuesser,
    InputGuesser
} from "@api-platform/admin";
import {
    ReferenceInput,
    ReferenceArrayInput,
    AutocompleteInput,
    AutocompleteArrayInput
} from "react-admin";
import { ProductCategoryTitle, ProductTitle } from "./ProductsTitle";

export const ProductEdit = (props) => (
    <EditGuesser {...props} title={<ProductTitle />}>
        <InputGuesser source={"name"} />
        <InputGuesser source={"description"} />
        <InputGuesser source={"photo"} />
        <ReferenceInput label="category" source="category" reference="product_categories">
            <AutocompleteInput
                optionText="name"
            />
        </ReferenceInput>
        <InputGuesser source={"productOptions"} />
        <InputGuesser source={"productOptionValues"} />
        <InputGuesser source={"SKUValues"} />
        <InputGuesser source={"SKUs"} />
    </EditGuesser>
);

export const ProductCategoryEdit = (props) => (
    <EditGuesser {...props} title={<ProductCategoryTitle />}>
        <InputGuesser source={"name"} />
        <ReferenceArrayInput label="Products name" source="products" reference="products">
            <AutocompleteArrayInput
                optionText="name"
            />
        </ReferenceArrayInput>
    </EditGuesser>
);

