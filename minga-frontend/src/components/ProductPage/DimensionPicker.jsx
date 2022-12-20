import React from "react";
import { RadioGroup } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function DimensionPicker({ option, sizeId, setSizeId }) {
  return (
    <RadioGroup value={sizeId} onChange={setSizeId}>
      <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
        {option.productOptionValues.map((size) => (
          <RadioGroup.Option
            key={size.value}
            value={size.id}
            className={({ active }) =>
              classNames(
                active ? "ring-2 ring-[#C9C5BA]" : "",
                "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <RadioGroup.Label as="span">{size.value}</RadioGroup.Label>
                <span
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-[#C9C5BA]" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-md"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

export default DimensionPicker;
