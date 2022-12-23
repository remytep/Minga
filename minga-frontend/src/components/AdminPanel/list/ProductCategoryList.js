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
import { padding } from "@mui/system";

const ProductCategoryList = (props) => (
    <ListGuesser {...props}>
        <FieldGuesser source={"name"} />
        <WithRecord
            label="Subcategories"
            render={(record) =>
                record.productSubCategories.length === 0 ? (
                    <span>No subcategories found</span>
                ) : (
                    <ArrayField source="productSubCategories">
                        <SingleFieldList>
                            <WithRecord
                                label="Subcategories"
                                render={(record) =>
                                    record &&
                                    <span>{record.name}</span>
                                }
                                sx={{ ms: 2 }}
                            />
                        </SingleFieldList>


                    </ArrayField>
                )
            }
        />
    </ListGuesser>
);
export default ProductCategoryList;
