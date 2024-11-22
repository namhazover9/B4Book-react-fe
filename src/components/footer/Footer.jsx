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
    <footer className="bg-gray-950 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 pl-28">
          <h2 className="text-2xl font-bold">BigFour</h2>
          <p className="text-sm">123 Main St, Anytown, CA 12345</p>
          <p className="text-sm text text-orange-500">+(84)-1800-4635</p>
          <p className="text-sm">contact@example.com</p>
          <div className="flex flex-col md:flex-row mt-4 gap-4">
            <a href="#" className="text-gray-400 mr-2">
              <FacebookOutlined />
            </a>
            <a href="#" className="text-gray-400 mr-2">
              <TwitterOutlined />
            </a>
            <a href="#" className="text-gray-400 mr-2">
              <InstagramOutlined />
            </a>
            <a href="#" className="text-gray-400">
              <MailOutlined />
            </a>
          </div>{" "}
        </div>
        <div className="w-px h-full bg-slate-100"></div>
        <div className="flex flex-col md:flex-row space-x-8 px-12 pr-8 gap-20">
          <div>
            <h3 className="text-lg font-bold mb-2">Need Help</h3>
            <p className="text-orange-400">+(84) -1800-4635</p>
            <p className="text-gray-400">Monday - Friday: 9:00-20:00</p>
            <p className="text-gray-400">Saturday: 11:00-15:00</p>
            <p className="text-gray-400">
              <a href="#">contact@example.com</a>
            </p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Our Service</h3>
            <ul>
              <li>
                <a href="#" className="text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Product Recalls
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Store Pickup
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Explore</h3>
            <ul>
              <li>
                <a href="#" className="text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="sm">
                  Bookmarks
                </a>
              </li>
              <li>
                <a href="#" className="sm">
                  Sign In/Join
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4 pr-32 ">Categories</h3>
            <ul>
              <li>
                <a href="#" className="text-sm">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Comedy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Drama
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Horror
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Kids
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex justify-between items-center px-8 pt-6">
        <p className="text-sm pl-20">
          &copy; 2022 Bookory. All rights reserved.
        </p>
        <div className="flex space-x-2 gap-6 pr-28 ">
          <img src={img1} alt="Mastercard" className="h-6" />
          <img src={img5} alt="PayPal" className="h-6 bg-white" />
          <img src={img2} alt="Visa" className="h-6" />
          <img src={img4} alt="Bitcoin" className="h-6 bg-white" />
          <img src={img3} alt="AmericanExpress" className="h-6" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
