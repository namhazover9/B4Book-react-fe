import React from "react";

const logos = [
  {
    src: "./src/assets/images/LogoShopBook/brand_1.svg",
    alt: "Books For Life",
  },
  { src: "./src/assets/images/LogoShopBook/brand_2.svg", alt: "Cook Books" },
  {
    src: "./src/assets/images/LogoShopBook/brand_3.svg",
    alt: "Mit Media Lab",
  },
  {
    src: "./src/assets/images/LogoShopBook/brand_4.svg",
    alt: "Mountain  Books",
  },
  {
    src: "./src/assets/images/LogoShopBook/brand_5.svg",
    alt: "Particular Books",
  },
  {
    src: "./src/assets/images/LogoShopBook/brand_6.svg",
    alt: "Travel Books",
  },
];
function LogoShopBook() {
  return (
    <div className="flex p-12 justify-center items-center space-x-12">
      {logos.map((logo, index) => (
        <div key={index} className="relative">
          <img
            src={logo.src}
            alt={logo.alt}
            className="max-w-44 max-h-28 hover:scale-110 transition duration-300"
          />
        </div>
      ))}
    </div>
  );
}

export default LogoShopBook;
