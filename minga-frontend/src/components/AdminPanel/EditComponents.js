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
import { ProductCategoryTitle, ProductTitle } from "./TitleComponents";

export const ProductEdit = (props) => (
    <EditGuesser {...props} title={<ProductTitle />}>
        <InputGuesser source={"name"} fullWidth />
        <InputGuesser source={"description"} fullWidth multiline />
        <InputGuesser source={"thumbnail"} fullWidth />
        <ReferenceInput source="productCategory" reference="product_categories">
            <AutocompleteInput
                optionText="name"
                fullWidth
            />
        </ReferenceInput>
        <InputGuesser source={"slug"} fullWidth />
    </EditGuesser>
);

export const ProductCategoryEdit = (props) => (
    <EditGuesser {...props} title={<ProductCategoryTitle />}>
        <InputGuesser source={"name"} fullWidth />
    </EditGuesser>
);

