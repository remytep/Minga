import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import ColorPicker from "../components/ProductPage/ColorPicker";
import DimensionPicker from "../components/ProductPage/DimensionPicker";
import { ToggleButtonGroup } from "@mui/material";
import { ToggleButton } from "@mui/material";
import { CartContext } from "../contexts/CartContext";

function Product() {
  let { category, slug } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [colorId, setColorId] = useState("");
  const [dimensionsId, setDimensionsId] = useState("");
  const [color, setColor] = useState([]);
  const [dimensions, setDimensions] = useState([]);
  const [variant, setVariant] = useState(null);
  const handleColor = (e, newColor) => {
    setColorId(newColor);
  };
  const handleDimensions = (e, newDimensions) => {
    setDimensionsId(newDimensions);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:8000/api/products/" + slug,
      headers: { "content-type": "application/json" },
    }).then((response) => {
      console.log(response.data);
      if (response.data.productCategory.name === category) {
        setProduct(response.data);
      }
    });
  }, [slug]);

  useEffect(() => {
    setVariant(null);
    axios({
      method: "GET",
      url:
        "https://localhost:8000/api/sku_values?product_option_value=/api/product_option_values/" +
        colorId,
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        //console.log(response.data["hydra:member"]);
        setColor(response.data["hydra:member"]);
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      method: "GET",
      url:
        "https://localhost:8000/api/sku_values?product_option_value=/api/product_option_values/" +
        dimensionsId,
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        //console.log(response.data["hydra:member"]);
        setDimensions(response.data["hydra:member"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [colorId, dimensionsId]);

  useEffect(() => {
    let skuValues1 = {};
    color.forEach((obj) => {
      let sku = obj.Sku;
      skuValues1[sku] = obj;
    });
    let skuValues2 = {};
    dimensions.forEach((obj) => {
      let sku = obj.Sku;
      skuValues2[sku] = obj;
    });

    let commonSkuValues = [];
    Object.keys(skuValues1).forEach((sku) => {
      if (skuValues2[sku]) {
        commonSkuValues.push(skuValues1[sku]);
        commonSkuValues.push(skuValues2[sku]);
      }
    });
    if (commonSkuValues.length == 2) {
      axios({
        method: "GET",
        url: "https://localhost:8000" + commonSkuValues[0].Sku,
        headers: { "content-type": "application/json" },
      })
        .then((response) => {
          //console.log(response.data);
          setVariant(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [color, dimensions]);
  let stock;
  if (variant && variant.stock >= 10) {
    stock = <p className="text-green-600 font-semibold">In stock</p>;
  } else if (variant && variant.stock > 0) {
    stock = <p className="text-orange-500 font-semibold">Few left</p>;
  } else {
    stock = <p className="text-red-600 font-semibold">Out of stock</p>;
  }
  if (product) {
    return (
      <main className="flex flex-col lg:flex-row gap-6 py-2 px-5 md:px-6 lg:px-10 xl:px-16 w-screen md:h-full">
        <img src="/product.webp" alt="" className="lg:w-1/2 object-cover" />
        <div className="flex flex-col gap-2 justify-between lg:w-1/2">
          <div id="name" className="flex justify-between h-24">
            <div className="flex flex-col">
              <h1 className="text-3xl font-semibold">{product.name}</h1>
              <div className="flex gap-2">
                <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                <Typography component="legend" className="text-gray-500">
                  (23)
                </Typography>
              </div>
            </div>
            <div className="flex flex-col">
              {variant ? (
                <>
                  <h1 className="text-3xl md:text-4xl text-right font-semibold">
                    {variant.price}€
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
          <div className="flex">
            <div id="options" className="flex flex-col gap-2">
              {product.productOptions.map((option) => (
                <div key={option.name}>
                  <h4 className="font-Inder text-2xl pb-2">{option.name} :</h4>
                  {option.name === "Color" ? (
                    <ToggleButtonGroup
                      value={colorId}
                      exclusive
                      className="flex flex-row"
                      onChange={handleColor}
                    >
                      {option.productOptionValues.map((value) => (
                        <ToggleButton value={value.id} key={value.id}>
                          <ColorPicker color={value.value} />
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  ) : null}
                  {option.name === "Dimensions" || option.name === "Size" ? (
                    <ToggleButtonGroup
                      value={dimensionsId}
                      exclusive
                      className="flex flex-row items-center"
                      onChange={handleDimensions}
                    >
                      {option.productOptionValues.map((value) => (
                        <ToggleButton value={value.id} key={value.id}>
                          <DimensionPicker dimensions={value.value} />
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              {variant ? (
                <button
                  className="px-6 py-2 text-xl transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                  onClick={() => addToCart(variant, variant.id)}
                >
                  Add to cart
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    );

    /* 
           
            <p>{product.description}</p>
            {variant ? (
              <>
                <div className="font-bold text-xl">
                  Price : {variant.price}€
                </div>
                <div>Stock : {variant.stock}</div>
                <div>Reference : {variant.reference_number}</div>
              </>
            ) : null}

            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center">
                {variant ? (
                  <button
                    className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                    onClick={() => addToCart(variant, variant.id)}
                  >
                    Add to cart
                  </button>
                ) : null}
              </div>

              <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"></p>
            </div>
          </div>
        </div>
      </div>
 */
  }
}

export default Product;
