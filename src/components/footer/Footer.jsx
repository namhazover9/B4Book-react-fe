import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
} from "@ant-design/icons";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">BigFour</h2>
          <p className="text-sm">123 Main St, Anytown, CA 12345</p>
          <p className="text-sm">+(84)-1800-4635</p>
          <p className="text-sm">contact@example.com</p>
          <div className="mt-4">
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
        <div className="flex flex-col md:flex-row space-x-8">
          <div>
            <h3 className="text-lg font-bold mb-2">Need Help</h3>
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
                  Sign In
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">Our Services</h3>
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
      <div className="mt-8 border-t border-gray-700 py-4 text-center">
        <p className="text-sm">&copy; 2022 Bookory. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
