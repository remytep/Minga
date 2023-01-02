import { FieldGuesser, ListGuesser } from "@api-platform/admin";
import {
    ArrayField,
    FunctionField,
    ReferenceArrayField,
    ReferenceField,
    SingleFieldList,
    WithRecord,
} from "react-admin";
import Chip from "@mui/material/Chip";

const ProductCategoryList = (props) => (
    <ListGuesser {...props}>
        <FieldGuesser source={"name"} />
        <WithRecord
            label="Subcategories"
            render={(record) =>
                record.productSubCategories.length === 0 ? (
                    <span>No subcategories found</span>
                ) : (
                    <ReferenceArrayField
                        source="productSubCategories"
                        reference="product_sub_categories"
                    />
                )
            }
        />
    </ListGuesser>
);
export default ProductCategoryList;
