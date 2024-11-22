import React from "react";
import img1 from "../../assets/images/FooterCard/MasterCard.webp";
import img2 from "../../assets/images/FooterCard/Visa.webp";
import img3 from "../../assets/images/FooterCard/AmericanExpress.png";
import img4 from "../../assets/images/FooterCard/Bitcoin.webp";
import img5 from "../../assets/images/FooterCard/PayPal.webp";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
} from "@ant-design/icons";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0 pl-20">
          <h2 className="text-2xl font-bold">BigFour</h2>
          <p className="text-sm hidden md:block">
            123 Main St, Anytown, CA 12345
          </p>
          <p className="text-sm text text-orange-500 hidden md:block">
            +(84)-1800-4635
          </p>
          <p className="text-sm hidden md:block">contact@example.com</p>
          <div className="flex md:flex-row mt-4 gap-4">
            <a href="#" className="text-gray-400 mr-2 hidden md:block">
              <FacebookOutlined />
            </a>
            <a href="#" className="text-gray-400 mr-2 hidden md:block">
              <TwitterOutlined />
            </a>
            <a href="#" className="text-gray-400 mr-2 hidden md:block">
              <InstagramOutlined />
            </a>
            <a href="#" className="text-gray-400 hidden md:block">
              <MailOutlined />
            </a>
          </div>{" "}
        </div>
        <div className="flex flex-col md:flex-row space-x-8 px-12 pr-8 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-1 ">Need Help</h3>
            <p className="text-orange-400 hidden md:block">+(84)-1800-4635</p>
            <p className="text-gray-400 hidden md:block">
              Monday - Friday: 9:00-20:00
            </p>
            <p className="text-gray-400 hidden md:block">
              Saturday: 11:00-15:00
            </p>
            <p className="text-gray-400 hidden md:block">
              <a href="#">contact@example.com</a>
            </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-1">Our Service</h3>
            <ul>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Product Recalls
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Store Pickup
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Explore</h3>
            <ul>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Bookmarks
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Sign In/Join
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4 pr-32 ">Categories</h3>
            <ul>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Comedy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Drama
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Horror
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hidden md:block">
                  Kids
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center px-8 pt-6">
        <p className="text-sm pl-10 hidden md:block">
          &copy; 2022 Bookory. All rights reserved.
        </p>
        <div className="flex space-x-2 gap-6 pr-28">
          <img src={img1} alt="Mastercard" className="h-6 hidden md:block" />
          <img
            src={img5}
            alt="PayPal"
            className="h-6 bg-white hidden md:block"
          />
          <img src={img2} alt="Visa" className="h-6 hidden md:block" />
          <img
            src={img4}
            alt="Bitcoin"
            className="h-6 bg-white hidden md:block"
          />
          <img
            src={img3}
            alt="AmericanExpress"
            className="h-6 hidden md:block"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
