import React, { useEffect, useState } from "react";
import axios from "axios";
import ColorRadio from "./ColorRadio";
import TextRadio from "./TextRadio";

function Options1({ product, setVariant }) {
  const [option1, setOption1] = useState(null);
  const [option1Value, setOption1Value] = useState([]);
  //console.log(product);
  useEffect(() => {
    if (option1) {
      axios({
        method: "GET",
        url:
          "http://localhost:8000/api/sku_values?productOptionValue=" + option1,
        headers: { "content-type": "application/json" },
      })
        .then((response) => {
          //console.log("color", response.data["hydra:member"][0]);
          setOption1Value(response.data["hydra:member"][0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [option1]);

  useEffect(() => {
    if (option1Value.Sku)
      axios({
        method: "GET",
        url: "http://localhost:8000" + option1Value.Sku,
        headers: { "content-type": "application/json" },
      })
        .then((response) => {
          //console.log(response.data);
          setVariant(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [option1Value]);
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
                sizeId={option1}
                setSizeId={setOption1}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Options1;
