import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColorPicker from "../components/ProductPage/ColorPicker";
import DimensionPicker from "../components/ProductPage/DimensionPicker";
import { ToggleButtonGroup } from "@mui/material";
import BreadcrumbsBar from "../components/utils/BreadcrumbsBar";
import { ToggleButton } from "@mui/material";

import desk_model1 from "../assets/homePages/auth/desk_example1.jpg";

function Product() {
  let { category } = useParams();
  let { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [color, setColor] = useState([]);
  const [dimensions, setDimensions] = useState([]);
  const [colorId, setColorId] = useState("");
  const [dimensionsId, setDimensionsId] = useState("");
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

  if (product) {
    return (
      <div className="w-full h-screen flex items-start">
        <div className="relative w-1/2 h-full flex flex-col">
          <img
            src={desk_model1}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col px-8 py-10 items-center">
          <BreadcrumbsBar category={product.productCategory.name} slug={slug} />
          <h1 className="text-4xl pb-3">{product.name}</h1>
          <div className="w-full flex flex-col max-w-[500px]">
            <div className="w-full flex flex-row items-center justify-start relative mb-12">
              <h3 className="text-md absolute text-black/80 bg-[#f5f5f5] pr-2">
                Customize your {product.productCategory.name}
              </h3>
              <div className="w-full h-[1px] bg-black/40"></div>
            </div>

            <div className="w-full flex flex-col">
              {product.productOptions.map((option) => (
                <div key={option.name}>
                  <h4 className="font-Inder text-2xl pb-2">{option.name}</h4>
                  {option.name === "Color" ? (
                    <ToggleButtonGroup
                      color="primary"
                      value={colorId}
                      exclusive
                      aria-label="Platform"
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
                  {option.name === "Dimensions" ? (
                    <ToggleButtonGroup
                      color="primary"
                      value={dimensionsId}
                      exclusive
                      aria-label="Platform"
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
                  {option.name === "Size" ? (
                    <ToggleButtonGroup
                      color="primary"
                      value={dimensionsId}
                      exclusive
                      aria-label="Platform"
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
                <button className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">
                  Add to cart
                </button>
              </div>

              <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
