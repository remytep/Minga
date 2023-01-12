import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { CartContext } from "../contexts/CartContext";
import Options1 from "../components/ProductPage/Options1";
import Options2 from "../components/ProductPage/Options2";
import Options3 from "../components/ProductPage/Options3";
import AdminPanel from "../components/AdminPanel";

function Product() {
  const location = useLocation();
  let params = location.pathname.split(`/`);
  params.shift();
  let category = params[0];
  let subcategory = params[1];
  let slug = params[2];

  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState(null);
  const [optionGroup, setOptionGroup] = useState(null);

  useEffect(() => {
    if (category !== "admin") {
      axios({
        method: "GET",
        url: "https://localhost:8000/api/products/" + slug,
        headers: { "content-type": "application/json" },
      })
        .then((response) => {
          //console.log(response.data);
          if (response.data.productSubCategory.name === subcategory) {
            setProduct(response.data);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [slug]);

  useEffect(() => {
    if (product) {
      switch (product.productOptions.length) {
        case 1:
          setOptionGroup(
            <Options1 product={product} setVariant={setVariant} />
          );
          break;
        case 2:
          setOptionGroup(
            <Options2 product={product} setVariant={setVariant} />
          );
          break;
        case 3:
          setOptionGroup(
            <Options3 product={product} setVariant={setVariant} />
          );
          break;
        default:
          return;
      }
      axios
        .post("https://localhost:8000/api/products/viewCount/" + product.id, {
          withCredentials: true,
        })
        .then((response) => {
          //console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [product]);
  let stock;
  if (variant && variant.stock >= 10) {
    stock = <p className="text-green-600 font-semibold">In stock</p>;
  } else if (variant && variant.stock > 0) {
    stock = <p className="text-orange-500 font-semibold">Only a few left</p>;
  } else {
    stock = <p className="text-red-600 font-semibold">Out of stock</p>;
  }

  const handleLess = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleMore = () => {
    if (quantity < variant.stock) setQuantity(quantity + 1);
  };

  if (product && category !== "admin") {
    return (
      <main className="flex flex-col lg:flex-row gap-6 py-2 px-5 md:px-6 lg:px-10 xl:px-16 w-screen md:h-full">
        <img src={variant ? `${process.env.REACT_APP_UPLOADS}/${variant.thumbnail}`
          : `${process.env.REACT_APP_UPLOADS}/${product.thumbnail}`} alt="" className="lg:w-1/2 object-cover" />
        <div className="flex flex-col gap-2 justify-between lg:w-1/2">
          <div id="name" className="flex justify-between h-18 md:h-24">
            <div className="flex flex-col">
              <h1 className="text-3xl font-semibold">{product.name}</h1>
              <div className="flex gap-2">
                <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                <Typography component="legend" className="text-gray-500">
                  23 reviews
                </Typography>
              </div>
            </div>
            <div className="flex flex-col">
              {variant ? (
                <>
                  <h1 className="text-3xl md:text-4xl text-right font-semibold">
                    {variant.discountPercent !== 0 ? (
                      <div className="flex items-center">
                        <p className="text-gray-400 line-through text-lg">
                          {variant.price + "€ "}
                        </p>
                        &nbsp;
                        <p className="text-red-600">
                          {(variant.price * (100 - variant.discountPercent)) /
                            100}
                          €
                        </p>
                      </div>
                    ) : (
                      <p>
                        {(variant.price * (100 - variant.discountPercent)) /
                          100}
                        €
                      </p>
                    )}
                  </h1>
                  <p className="text-gray-500">{variant.reference_number}</p>
                  <div className="text-right">{stock}</div>
                </>
              ) : null}
            </div>
          </div>
          <div id="description" className="flex-1 text-gray-500">
            {product.description}
          </div>
          {optionGroup}
          <div className="flex-1 flex flex-col gap-2 justify-center md:justify-end md:items-end md:h-96">
            {variant ? (
              <>
                <ButtonGroup color="inherit" disableElevation>
                  <Button
                    onClick={handleLess}
                    variant="contained"
                    disableElevation
                  >
                    <p className="text-black text-xl">-</p>
                  </Button>
                  <Button
                    disabled
                    variant="outlined"
                    disableElevation
                    sx={{
                      borderColor: "#E0E0E0",
                    }}
                  >
                    <p className="text-black text-xl">{quantity}</p>
                  </Button>
                  <Button
                    onClick={handleMore}
                    variant="contained"
                    disableElevation
                  >
                    <p className="text-black text-xl">+</p>
                  </Button>
                </ButtonGroup>
                {variant.stock > 0 ? (
                  <Button
                    variant="contained"
                    color="inherit"
                    className="transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 border-2 border-gray-900 focus:outline-none"
                    onClick={() => addToCart(variant, variant.id, quantity)}
                    disableElevation
                  >
                    <p className="px-6 py-4 text-xl">Add to cart</p>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    className="px-6 py-2 text-xl transition ease-in duration-200 uppercase focus:outline-none"
                    disabled
                    disableElevation
                  >
                    <p className="px-6 py-4 text-xl">Out of stock</p>
                  </Button>
                )}
              </>
            ) : (
              <>
                <ButtonGroup color="inherit" disableElevation>
                  <Button
                    onClick={handleLess}
                    variant="contained"
                    disableElevation
                    disabled
                  >
                    <p className="text-gray text-xl">-</p>
                  </Button>
                  <Button
                    disabled
                    variant="contained"
                    disableElevation
                    sx={{
                      borderColor: "#E0E0E0",
                    }}
                  >
                    <p className="text-gray text-xl">{quantity}</p>
                  </Button>
                  <Button
                    onClick={handleMore}
                    variant="contained"
                    disableElevation
                    disabled
                  >
                    <p className="text-gray text-xl">+</p>
                  </Button>
                </ButtonGroup>
                <Button
                  variant="contained"
                  className="px-6 py-2 text-xl transition ease-in duration-200 uppercase focus:outline-none"
                  disabled
                  disableElevation
                >
                  <p className="px-6 py-4 text-xl">Add to cart</p>
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default Product;
