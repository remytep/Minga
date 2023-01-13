import {
    FieldGuesser,
    ListGuesser,
} from "@api-platform/admin";
import {
    ArrayField,
    ReferenceField,
    SingleFieldList,
    WithRecord,
    FunctionField,
} from "react-admin";
import Chip from '@mui/material/Chip';
import "../style.css";
import { useNavigate } from "react-router-dom";

const ProductOptionList = (props) => {
    const navigate = useNavigate();
    return (
        <ListGuesser {...props}>
            <ReferenceField source="product.@id" reference="products" />
            <FieldGuesser source="name" />
            <ArrayField source="productOptionValues">
                <FunctionField
                    render={record => record.productOptionValues.length === 0
                        && <p>No option values found</p>
                    }
                />
                <SingleFieldList linkType={false}>
                    <WithRecord
                        render={record => record &&
                            <Chip
                                label={record.value}
                                onClick={() => {
                                    navigate("/admin/product_option_values/%2Fapi%2Fproduct_option_values%2F" + record.id + "/edit")
                                }}
                            />
                        }
                    />
                </SingleFieldList>
            </ArrayField>
        </ListGuesser>
    )
}
export default ProductOptionList;