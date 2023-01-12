import React, { useEffect, useState } from "react";
import axios from "axios";
import ColorRadio from "./ColorRadio";
import TextRadio from "./TextRadio";

function Options2({ product, setVariant }) {
  const [option1, setOption1] = useState(null);
  const [option1Value, setOption1Value] = useState([]);
  const [option2, setOption2] = useState(null);
  const [option2Value, setOption2Value] = useState([]);
  useEffect(() => {
    setVariant(null);
    axios({
      method: "GET",
      url:
        "https://localhost:8000/api/sku_values?productOptionValue=" + option1,
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        //console.log("color", response.data["hydra:member"]);
        setOption1Value(response.data["hydra:member"]);
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      method: "GET",
      url:
        "https://localhost:8000/api/sku_values?productOptionValue=" + option2,
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        //console.log("size", response.data["hydra:member"]);
        setOption2Value(response.data["hydra:member"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [option1, option2]);

  useEffect(() => {
    let skuValues1 = {};
    option1Value.forEach((obj) => {
      let sku = obj.Sku;
      skuValues1[sku] = obj;
    });
    let skuValues2 = {};
    option2Value.forEach((obj) => {
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
    //console.log(commonSkuValues);
    if (commonSkuValues.length === 2) {
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
  }, [option1Value, option2Value]);
  return (
    <div className="flex flex-col gap-6 md:gap-2 md:flex-row">
      <div id="options" className="flex flex-col gap-4">
        {product.productOptions.map((option) => (
          <div key={option.name}>
            <h4 className="text-2xl mb-2">{option.name}</h4>
            {option.name === "Color" ? (
              <ColorRadio
                option={option}
                colorId={option1}
                setColorId={setOption1}
              />
            ) : (
              <TextRadio
                option={option}
                sizeId={option2}
                setSizeId={setOption2}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Options2;
