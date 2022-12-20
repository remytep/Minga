import React from "react";
import { RadioGroup } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ColorRadio({ option, colorId, setColorId }) {
  return (
    <RadioGroup value={colorId} onChange={setColorId}>
      <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
      <div className="flex-1 flex items-center space-x-3">
        {option.productOptionValues.map((color) => (
          <RadioGroup.Option
            key={color.value}
            value={color.id}
            className={({ active, checked }) =>
              classNames(
                "ring-[#C9C5BA]",
                active && checked ? "ring ring-offset-1" : "",
                !active && checked ? "ring ring-offset-1" : "",
                "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
              )
            }
            style={{ backgroundColor: color.value }}
          >
            <RadioGroup.Label as="span" className="sr-only">
              {color.value}
            </RadioGroup.Label>
            <span
              aria-hidden="true"
              className="h-8 w-8 border border-black border-opacity-10 rounded-full"
            />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

export default ColorRadio;
