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
import { useNavigate } from "react-router-dom";

const ProductCategoryList = (props) => {
    const navigate = useNavigate();

    return (
        <ListGuesser {...props}>
            <FieldGuesser source={"name"} />
            <WithRecord
                label="Subcategories"
                render={(record) =>
                    record.productSubCategories.length === 0 ? (
                        <span>No subcategories found</span>
                    ) : (
                        <ArrayField source="productSubCategories">
                            <SingleFieldList linkType={false}>
                                <WithRecord
                                    label="Subcategories"
                                    render={(record) =>
                                        record &&
                                        <Chip
                                            label={record.name}
                                            onClick={() => {
                                                navigate("/admin/product_sub_categories/%2Fapi%2Fproduct_sub_categories%2F" + record.name + "/edit")
                                            }}
                                        />}
                                />
                            </SingleFieldList>
                        </ArrayField>
                    )
                }
            />
        </ListGuesser>
    );
}
export default ProductCategoryList;
