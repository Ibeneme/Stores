import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imageone from "../Products/images/JA23_BRAND_DAY_NIVEAslider_FS.jpeg";
import "./Navbar.css";

const images = [
  {
    src: imageone,
    alt: "Image 1",
  },
  {
    src: imageone,
    alt: "Image 2",
  },
  {
    src: imageone,
    alt: "Image 3",
  },
];

const Carousels = () => {
  return (
    <div
      className="caro-div"
      style={{
        paddingLeft: "1em",
        paddingRight: "1em",
      }}
    >
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        transitionTime={1000}
        stopOnHover={true}
      >
        {images.map((image) => (
          <div key={image.src}>
            <img
              className="images-in-carousels"
              src={image.src}
              alt={image.alt}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carousels;
