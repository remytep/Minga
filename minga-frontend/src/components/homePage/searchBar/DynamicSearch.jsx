import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Avatar, ListItem } from "@mui/material"
// import axios from "axios";
import { faker } from "@faker-js/faker";

const productInfo = Array.from(Array(25).keys()).map((product) => ({
  name : faker.commerce.product(),
  avatar : faker.image.cats(),
  price : faker.commerce.price(200, 500, 0, '€')
}));

export default function DynamicSearchBar() {
  // const [products, setProducts] = useState([]);
  // const [prices, setPrices] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://localhost:8000/api/products")
  //     .then((res) => {
  //       console.log(res.data);
  //       setProducts(Object.values(res.data["hydra:member"]));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   return;
  // }, []);

  return (
    <Stack sx={{ width: 700, marginLeft: 20, marginTop: 5, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Autocomplete
        freeSolo
        id="desks_sample"
        getOptionLabel={(results) =>
          `${results.name} ${results.price}`
        }
        options={productInfo}
        sx={{ width: 700 }}
        isOptionEqualToValue={(option, value) =>
          option.name === value.name
        }
        noOptionsText={"No available desks"}
        renderOption={(props, results) => (
          <ListItem component="li" {...props} key={results.id} sx={{ justifyContent:"space-between" }}>
            <Avatar src={results.avatar} alt="cats" sx={{ width: 90, height: 90 }}></Avatar>   
            <Box sx={{ marginLeft: 5, marginRight: 10 }}>{results.name}</Box>  
            <Box>{results.price}</Box>
          </ListItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for our desks"
          />
        )}
      />
    </Stack>
  );
}
