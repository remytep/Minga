import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Avatar, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiAutocomplete-root": { borderRadius: "50%" },
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
  },
  "&.Mui-focused .MuiInputLabel-outlined": {
    color: "black",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "black",
    backgroundColor: "white",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      // Default left padding is 6px
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
});
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
    <Stack className="rounded-lg border-2">
      <StyledAutocomplete
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
              to={`/${results.productSubCategory.productCategory.name}/${results.productSubCategory.name}/${results.slug}`}
              className="flex items-center justify-center w-full border-b-2 p-3"
            >
              <img
                src={`https://localhost:8000/uploads/${results.thumbnail}`}
                alt={results.description}
                className="h-28"
              />
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
          <TextField
            {...params}
            label="Search for our products"
            className="rounded-full"
          />
        )}
      />
    </Stack>
  );
}
