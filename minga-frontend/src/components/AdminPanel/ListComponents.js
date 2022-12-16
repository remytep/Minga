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
    ExportButton,
    FilterButton,
    TopToolbar,
    useCreateSuggestionContext,
    useCreate,
    Link,
    AutocompleteInput,
} from "react-admin";
import { ProductCategoryTitle, ProductTitle } from "./TitleComponents";
import "./style.css";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Chip } from "@mui/material";
import { Field } from "@api-platform/api-doc-parser";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField as TextFieldMui } from '@mui/material';
import axios from "axios";
import { ENTRYPOINT } from "../../config";

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
];

const CreateProductOption = () => {
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState(null);
    const record = useRecordContext();

    const handleSubmit = event => {
        event.preventDefault();
    };

    useEffect(() => {
        axios
            .get(ENTRYPOINT + "/products")
            .then((res) => {
                let filteredProducts = res.data["hydra:member"].map(obj => ({
                    "name": obj.name,
                }));
                console.log(top100Films);

                console.log(filteredProducts);
                setProducts(filteredProducts);
            })
            .catch((err) => {
                console.log(err);
            })
        return;
    }, [])

    const handleClick = () => {
        setShow(!show);
    }


    const change = (e) => {
        console.log(e);
        setValue(e);
    }

    return (
        <>
            <Button onClick={handleClick} label="ra.action.create">
                <AddIcon />
                <span>CREATE</span>
            </Button>
            <Dialog open={show}>
                <DialogContent>

                    {
                        products &&
                        <Autocomplete
                            sx={{ width: 300 }}
                            options={products}
                            renderInput={(params) => <TextFieldMui {...params} label="Movie" />}
                            onChange={(e, value) => change(value)}
                        />
                    }



                </DialogContent>
                <DialogActions>
                    <Button
                        component={Link}
                        to={{
                            pathname: "/admin/product_options/create",
                            // Here we specify the initial record for the create view
                            state: { record: { product: value } },
                        }}
                    >
                        Add option value
                    </Button>
                    <Button onClick={handleClick}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>

    );
};


const ListActions = () => (
    <TopToolbar>
        {/* <ExportButton /> */}
        <CreateProductOption />
    </TopToolbar>
);

export const ProductList = (props) => (
    <ListGuesser {...props}>
        <FieldGuesser source={"name"} />
        <FunctionField
            label="Description"
            render={record => record["description"].length > 20 ? record["description"].substring(0, 20) + "..." : record["description"]}
        />
        <FieldGuesser source={"createdAt"} />
        {/* Use react-admin components directly when you want complex fields. */}
        <ReferenceField source="productCategory.@id" reference="product_categories" />

        {/* <ReferenceField source="skuValues" reference="sku_values">
            <FieldGuesser source="id" />
        </ReferenceField> */}


        <ReferenceArrayField source="skus" reference="skus">
            <Datagrid rowClick={"edit"}>
                <ReferenceField source="productOption" reference="product_options" />
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
    <ListGuesser {...props}>
        <FieldGuesser source={"name"} />
        <ReferenceArrayField source="products" reference="products" />
    </ListGuesser>
);

export const ProductOptionList = (props) => (
    <ListGuesser {...props} actions={<ListActions />}>
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