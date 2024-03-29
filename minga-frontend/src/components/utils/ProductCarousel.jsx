import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./productCarousel.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "./ProductCard";

function ProductCarousel({ products, category, subcategory, featured }) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [carouselContent, setCarouselContent] = useState([]);
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    //console.log(windowDimensions);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let array = [];
    let columns = [];
    //console.log("troisieme", windowDimensions);
    if (windowDimensions) {
      //console.log("1");
      switch (true) {
        case windowDimensions.width < 640:
          //console.log("small");
          products.forEach((product) => {
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
          break;
        case windowDimensions.width < 1024:
          //console.log("large");
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
            if (products.length % 2 !== 0) {
              if ((i + 1) % 2 === 0) {
                array.push(
                  <div className="flex gap-[30px] px-5 md:px-6 lg:px-10 xl:px-16">
                    {columns}
                  </div>
                );
                columns = [];
              }
              if (i === products.length - 1) {
                array.push(
                  <div className="flex gap-[30px] px-5 md:px-6 lg:px-10 xl:px-16">
                    {columns}
                    <div className="col-span-1 flex flex-col invisible">
                      <img
                        src="/product.webp"
                        alt=""
                        className="object-cover h-full sm:h-[20rem] md:h-[28rem] lg:h-[24rem] xl:h-[40rem] invisible"
                      />
                    </div>
                  </div>
                );
              }
            } else {
              if ((i + 1) % 2 === 0) {
                array.push(
                  <div className="flex gap-[30px] px-5 md:px-6 lg:px-10 xl:px-16">
                    {columns}
                  </div>
                );
                columns = [];
              }
            }
          });
          break;
        default:
          //console.log("xl");
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
            if (products.length % 3 !== 0) {
              if ((i + 1) % 3 === 0) {
                array.push(
                  <div className="flex gap-[30px] px-5 md:px-6 lg:px-10 xl:px-16">
                    {columns}
                  </div>
                );
                columns = [];
              }
              if (i === products.length - 1) {
                array.push(
                  <div className="flex gap-[30px] px-5 md:px-6 lg:px-10 xl:px-16">
                    {columns}
                    <div className="col-span-1 flex flex-col invisible">
                      <img
                        src="/product.webp"
                        alt=""
                        className="object-cover h-full sm:h-[20rem] md:h-[28rem] lg:h-[24rem] xl:h-[40rem] invisible"
                      />
                    </div>
                  </div>
                );
              }
            } else {
              if ((i + 1) % 3 === 0) {
                array.push(
                  <div className="grid grid-cols-3 gap-[30px] px-5 md:px-6 lg:px-10 xl:px-16">
                    {columns}
                  </div>
                );
                columns = [];
              }
            }
          });
          break;
      }
    }
    setCarouselContent(array);
    //console.log(carouselContent);
    //console.log(windowDimensions, carouselContent);
  }, [windowDimensions]);

  useEffect(() => {
    setTimeout(() => {
      setWindowDimensions(getWindowDimensions());
      //console.log("deuxieme", windowDimensions);
    }, 750);
  }, []);

  return (
    <Carousel
      autoPlay={true}
      interval={7000}
      transitionTime={2500}
      infiniteLoop={true}
      stopOnHover={true}
      showIndicators={true}
      showArrows={false}
      showThumbs={false}
      showStatus={false}
    >
      {carouselContent &&
        carouselContent.map((content, i) => <div key={i}>{content}</div>)}
    </Carousel>
  );
}

export default ProductCarousel;
