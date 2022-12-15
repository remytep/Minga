import {
    FieldGuesser,
    ListGuesser,
} from "@api-platform/admin";
import {
    ArrayField,
    ChipField,
    Datagrid,
    ReferenceArrayField,
    ReferenceManyField,
    ReferenceField,
    SingleFieldList,
    TextField,
    FunctionField,
    useRecordContext,
    useListContext,
    NumberField,
    WithRecord,
} from "react-admin";
import { ProductCategoryTitle, ProductTitle } from "./TitleComponents";
import "./style.css";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";
import { useRef } from "react";
import { Chip } from "@mui/material";
import { Field } from "@api-platform/api-doc-parser";

export const ProductList = (props) => (
    <ListGuesser {...props}>
        <FieldGuesser source={"name"} />
        <FunctionField
            label="Description"
            render={record => record["description"].length > 20 ? record["description"].substring(0, 20) + "..." : record["description"]}
        />
        <FieldGuesser source={"thumbnail"} />
        <FieldGuesser source={"createdAt"} />
        {/* Use react-admin components directly when you want complex fields. */}
        <ReferenceField source="productCategory.@id" reference="product_categories" />

        {/* <ReferenceField source="skuValues" reference="sku_values">
            <FieldGuesser source="id" />
        </ReferenceField> */}


        <ReferenceArrayField source="skus" reference="skus">
            <Datagrid rowClick={"edit"}>
                <ReferenceField source="productOption" reference="product_options">
                    <TextField source="name" />
                </ReferenceField>
                <FieldGuesser source="optionValue" />
                <FunctionField
                    label="Price"
                    render={record => record && record["price"] + " €"}
                />
                <WithRecord
                    label="Stock"
                    render={record => record.stock === 0 ?
                        <span className="no-stock">Out of stock</span>
                        : <span className="in-stock">{record.stock}</span>
                    }
                />
            </Datagrid>
        </ReferenceArrayField>
        <FieldGuesser source={"slug"} />
    </ListGuesser>
);

export const ProductCategoryList = (props) => (
    <ListGuesser {...props} >
        <FieldGuesser source={"name"} />
        <ReferenceArrayField source="products" reference="products" />
    </ListGuesser>
);

export const ProductOptionList = (props) => (
    <ListGuesser {...props} >
        <FieldGuesser source="name" />
    </ListGuesser>
);

export const ProductOptionValueList = (props) => (
    <ListGuesser {...props} >
        <FieldGuesser source="value" />
    </ListGuesser>
);


export const SkuList = (props) => (

    <ListGuesser {...props} >
        <ReferenceField source="product" reference="products" >
            <FieldGuesser source="name" />
        </ReferenceField>
        <ReferenceField source="productOption" reference="product_options" >
            <FieldGuesser source="name" />
        </ReferenceField>
        <FieldGuesser source={"optionValue"} />
        <FunctionField
            label="Price"
            render={record => record ? record["price"] + " €" : null}
        />
        <WithRecord
            label="Stock"
            render={record => record.stock === 0 ?
                <span className="no-stock">Out of stock</span>
                : <span className="in-stock">{record.stock}</span>
            }
        />
        <FieldGuesser source="referenceNumber" />
    </ListGuesser >
);