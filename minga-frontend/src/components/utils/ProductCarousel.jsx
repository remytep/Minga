import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./productCarousel.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "./ProductCard";

function ProductCarousel({ category, subcategory, featured }) {
  const products = [
    { name: "Remy", slug: "remy" },
    { name: "Remy", slug: "remy" },
    { name: "Remy", slug: "remy" },
    { name: "Remy", slug: "remy" },
    { name: "Remy", slug: "remy" },
    { name: "Remy", slug: "remy" },
  ];
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [size, setSize] = useState("");
  const [carouselContent, setCarouselContent] = useState(null);
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    //console.log(windowDimensions.width);
    switch (true) {
      case windowDimensions.width < 640:
        setSize("xs");
        break;
      case windowDimensions.width < 1024:
        setSize("sm");
        break;
      case windowDimensions.width < 1280:
        setSize("lg");
        break;
      default:
        return;
    }
  }, [windowDimensions]);
  useEffect(() => {
    //console.log(size);
    if (size) {
      let array = [];
      let columns = [];
      switch (size) {
        case "xs":
          products.forEach((product) => {
            array.push(
              <Link className="flex flex-col justify-between group-hover:opacity-75 px-5 md:px-6 lg:px-10 xl:px-16">
                <img className="object-contain" src="/product.webp" alt="" />
                <div className="flex-1 flex flex-col gap-3 py-3 justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-xl">Remy</h3>
                    </div>
                    <p className="text-gray-500 text-sm">Test</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      Starting from <span className="font-semibold">300 €</span>
                    </div>
                    <div className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                      <p className="text-red-600 font-semibold">Out of stock</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          });
          setCarouselContent(array);
          break;
        case "sm":
          products.forEach((product, i) => {
            columns.push(
              <Link className="col-span-1 flex flex-col justify-between group-hover:opacity-75">
                <img className="object-contain" src="/product.webp" alt="" />
                <div className="flex-1 flex flex-col gap-3 py-3 justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-xl">Remy</h3>
                    </div>
                    <p className="text-gray-500 text-sm">Test</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      Starting from <span className="font-semibold">300 €</span>
                    </div>
                    <div className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                      <p className="text-red-600 font-semibold">Out of stock</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
            if ((i + 1) % 2 === 0) {
              array.push(
                <div className="flex gap-[30px] px-5 md:px-6 lg:px-10 xl:px-16">
                  {columns}
                </div>
              );
              columns = [];
            }
          });
          setCarouselContent(array);
          break;
        case "lg":
          products.forEach((product, i) => {
            columns.push(
              <Link className="col-span-1 flex flex-col justify-between group-hover:opacity-75">
                <img className="object-contain" src="/product.webp" alt="" />
                <div className="flex-1 flex flex-col gap-3 py-3 justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-xl">Remy</h3>
                    </div>
                    <p className="text-gray-500 text-sm">Test</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      Starting from <span className="font-semibold">300 €</span>
                    </div>
                    <div className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                      <p className="text-red-600 font-semibold">Out of stock</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
            if ((i + 1) % 3 === 0) {
              array.push(
                <div className="grid grid-cols-3 gap-[30px] px-5 md:px-6 lg:px-10 xl:px-16">
                  {columns}
                </div>
              );
              columns = [];
            }
          });
          setCarouselContent(array);
          break;
        default:
          return;
      }
    }
  }, [size]);
  return (
    <Carousel
      autoPlay={true}
      interval={5000}
      transitionTime={2000}
      infiniteLoop={true}
      stopOnHover={true}
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
    >
      {carouselContent && carouselContent.map((content) => content)}
    </Carousel>
  );
}

export default ProductCarousel;
