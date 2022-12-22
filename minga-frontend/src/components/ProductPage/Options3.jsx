import React, { useEffect, useState } from "react";
import axios from "axios";
import ColorRadio from "./ColorRadio";
import TextRadio from "./TextRadio";

function Options3({ product, setVariant }) {
  const [option1, setOption1] = useState(null);
  const [option1Value, setOption1Value] = useState([]);
  const [option2, setOption2] = useState(null);
  const [option2Value, setOption2Value] = useState([]);
  const [option3, setOption3] = useState(null);
  const [option3Value, setOption3Value] = useState([]);
  useEffect(() => {
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
    axios({
      method: "GET",
      url:
        "https://localhost:8000/api/sku_values?productOptionValue=" + option3,
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        //console.log("size", response.data["hydra:member"]);
        setOption3Value(response.data["hydra:member"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [option1, option2, option3]);

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
    let skuValues3 = {};
    option3Value.forEach((obj) => {
      let sku = obj.Sku;
      skuValues3[sku] = obj;
    });

    let commonSkuValues = [];
    Object.keys(skuValues1).forEach((sku) => {
      if (skuValues2[sku] && skuValues3[sku]) {
        commonSkuValues.push(skuValues1[sku]);
        commonSkuValues.push(skuValues2[sku]);
        commonSkuValues.push(skuValues3[sku]);
      }
    });
    if (commonSkuValues.length === 3) {
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
  }, [option1Value, option2Value, option3Value]);
  return (
    <div className="flex flex-col gap-6 md:gap-2 md:flex-row">
      <div id="options" className="flex flex-col gap-4">
        {product.productOptions.map((option) => (
          <div>
            <h4 className="text-2xl mb-2">{product.productOptions[0].name}</h4>
            {product.productOptions[0].name === "Color" ? (
              <ColorRadio
                option={option}
                colorId={option1}
                setColorId={setOption1}
              />
            ) : (
              <TextRadio
                option={option}
                sizeId={option1}
                setSizeId={setOption1}
              />
            )}
            <h4 className="text-2xl mb-2">{product.productOptions[1].name}</h4>
            <TextRadio
              option={option}
              sizeId={option2}
              setSizeId={setOption2}
            />
            <h4 className="text-2xl mb-2">{product.productOptions[2].name}</h4>
            <TextRadio
              option={option}
              sizeId={option3}
              setSizeId={setOption3}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Options3;
