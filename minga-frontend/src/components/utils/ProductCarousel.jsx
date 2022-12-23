import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./productCarousel.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "./ProductCard";

function ProductCarousel({ products, category, subcategory, featured }) {
  /*   const products = [
    { name: "Remy", slug: "remy" },
    { name: "Remy", slug: "remy" },
    { name: "Remy", slug: "remy" },
    { name: "Remy", slug: "remy" },
    { name: "Remy", slug: "remy" },
    { name: "Remy", slug: "remy" },
  ]; */
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
          products.forEach((product, i) => {
            array.push(
              <Link
                to={`/${
                  category
                    ? category
                    : product.productSubCategory.productCategory.name
                }/${
                  subcategory ? subcategory : product.productSubCategory.name
                }/${product.slug}`}
                key={product.slug}
                className="flex flex-col justify-between group-hover:opacity-75 px-5 md:px-6 lg:px-10 xl:px-16"
              >
                <ProductCard product={product} featured={featured} />
              </Link>
            );
          });
          setCarouselContent(array);
          break;
        case "sm":
          products.forEach((product, i) => {
            columns.push(
              <Link
                to={`/${
                  category
                    ? category
                    : product.productSubCategory.productCategory.name
                }/${
                  subcategory ? subcategory : product.productSubCategory.name
                }/${product.slug}`}
                key={product.slug}
                className="col-span-1 flex flex-col justify-between group-hover:opacity-75"
              >
                <ProductCard product={product} featured={false} />
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
              <Link
                to={`/${
                  category
                    ? category
                    : product.productSubCategory.productCategory.name
                }/${
                  subcategory ? subcategory : product.productSubCategory.name
                }/${product.slug}`}
                key={product.slug}
                className="col-span-1 flex flex-col justify-between group-hover:opacity-75"
              >
                <ProductCard product={product} featured={false} />
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
      {carouselContent &&
        carouselContent.map((content, i) => <div key={i}>{content}</div>)}
    </Carousel>
  );
}

export default ProductCarousel;
