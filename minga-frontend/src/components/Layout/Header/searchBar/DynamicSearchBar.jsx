import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Avatar, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
/* import { faker } from "@faker-js/faker";

const productInfo = Array.from(Array(25).keys()).map((product) => ({
  name: faker.commerce.product(),
  avatar: faker.image.cats(),
  price: faker.commerce.price(200, 500, 0, "€"),
})); */

export default function DynamicSearchBar() {
  const [products, setProducts] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://localhost:8000/api/products")
      .then((res) => {
        //console.log(Object.values(res.data["hydra:member"]));
        setProducts(Object.values(res.data["hydra:member"]));
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  }, []);

  return (
    <Stack
      sx={{
        width: 700,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Autocomplete
        freeSolo
        id="desks_sample"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.defaultMuiPrevented = true;
            navigate("/search/" + searchTerms);
          }
        }}
        onInputChange={(event, newInputValue) => {
          setSearchTerms(newInputValue);
        }}
        inputValue={searchTerms}
        getOptionLabel={(results) => `${results.name}`}
        options={products}
        sx={{ width: 700 }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        noOptionsText={"No available products"}
        renderOption={(props, results) => (
          <ListItem
            component="li"
            {...props}
            key={results.id}
            sx={{ justifyContent: "space-between" }}
          >
            <Link
              to={`${results.productCategory.name}/${results.slug}`}
              className="flex items-center w-full"
            >
              <Avatar src={results.avatar} alt="cats"></Avatar>
              <div className="flex justify-between w-full">
                <Box sx={{ marginLeft: 5, marginRight: 10 }}>
                  {results.name}
                </Box>
                {results.skus[0] ? (
                  <Box>Starting from {results.skus[0].price}€</Box>
                ) : null}
              </div>
            </Link>
          </ListItem>
        )}
        includeInputInList
        selectOnFocus
        clearOnBlur
        renderInput={(params) => (
          <TextField {...params} label="Search for our products" />
        )}
      />
    </Stack>
  );
}
