import {
    FieldGuesser,
    ListGuesser,
} from "@api-platform/admin";
import {
    ArrayField,
    ReferenceField,
    SingleFieldList,
    useRecordContext,
    WithRecord,
    TopToolbar,
    Link,
} from "react-admin";
import "../style.css";
import { useEffect, useState } from "react";
import Chip from '@mui/material/Chip';
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


const ListActions = () => (
    <TopToolbar>
        <CreateProductOption />
    </TopToolbar>
);

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

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_ENTRYPOINT}/products`)
            .then((res) => {
                let filteredProducts = res.data["hydra:member"].map(obj => ({
                    "name": obj.name,
                }));
                console.log(top100Films);

                console.log(filteredProducts);
                // setProducts(filteredProducts);
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

const ProductOptionList = (props) => (
    <ListGuesser {...props} actions={<ListActions />}>
        <ReferenceField source="product.@id" reference="products" />
        <FieldGuesser source="name" />
        {/* <FieldGuesser source="productOptionValues" /> */}
        {/* <ReferenceArrayField source="productOptionValues" reference="product_option_values" /> */}
        <ArrayField source="productOptionValues">
            <SingleFieldList linkType={false}>
                <WithRecord
                    label="Stock"
                    render={record => record &&
                        <Chip
                            label={record.value}
                            onClick={() => window.location.href = `/admin/product_option_values/%2Fapi%2Fproduct_option_values%2F${record.id}/edit`}
                        />
                    }
                />
            </SingleFieldList>

        </ArrayField>
    </ListGuesser>
)
export default ProductOptionList;