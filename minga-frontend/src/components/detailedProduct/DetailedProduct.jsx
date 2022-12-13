import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColorPicker from "./components/ColorPicker";
import DimensionPicker from "./components/DimensionPicker";
import { ToggleButtonGroup } from "@mui/material";
import { ToggleButton } from "@mui/material";

import desk_model1 from "../../assets/homePages/auth/desk_example1.jpg";

function DetailedProduct() {
  let { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [color, setColor] = React.useState("");
  const [dimensions, setDimensions] = React.useState("");
  const [sku, setSku] = useState([]);
  const handleColor = (e, newColor) => {
    setColor(newColor);
  };
  const handleDimensions = (e, newDimensions) => {
    setDimensions(newDimensions);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url:
        "https://localhost:8000/api/skus?skuValues%5B%5D=api%2Fsku_values%2F" +
        color +
        "&skuValues%5B%5D=api%2Fsku_values%2F" +
        dimensions,
      headers: { "content-type": "application/json" },
    }).then((response) => {
      console.log(response.data);
      if (response.data["hydra:member"].length === 1) {
        setSku(response.data["hydra:member"][0]);
      }
    });
  }, [color, dimensions]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://localhost:8000/api/products?slug=" + slug,
      headers: { "content-type": "application/json" },
    }).then((response) => {
      console.log(response.data["hydra:member"][0]);
      setProduct(response.data["hydra:member"][0]);
    });
  }, []);
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
                      value={color}
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
                      value={dimensions}
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
            {sku ? (
              <>
                <div>Price : {sku.price}€</div>
                <div>Stock : {sku.stock}</div>
                <div>Reference : {sku.reference_number}</div>
              </>
            ) : null}

            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center"></div>

              <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2"></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailedProduct;
