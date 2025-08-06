import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#301f57] text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Grand Plus</h3>
            <p className="text-sm text-gray-100 mb-6 leading-relaxed">
              We are an online retailer of wine, beer and spirits. We service
              the Rhode Island market.
            </p>
            <div>
              <h4 className="font-semibold mb-3">Subscribe to get 20% off</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white placeholder:text-black text-black"
                />
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Shop All
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Gummies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Prerolls
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Edibles
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Vapes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Flower
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Beverage
                </a>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Legality
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Cannabinoids
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Quality
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Grand Plus COAs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Rewards
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-100 hover:text-white transition-colors"
                >
                  FDA Disclaimer
                </a>
              </li>
            </ul>
          </div>

          {/* contact us  */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="text-sm text-gray-100 space-y-1">
              <p>Store Location Here</p>
              <p>Call us: +1234567890</p>
              <p>WhatsApp: +1234567890</p>
              <p>example@example.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-100 mb-4 md:mb-0">
            © 2024 - Grand Plus - All rights reserved
          </p>

          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-100 hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-100 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-gray-100 hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-100 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-8 bottom-8 opacity-20">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 10 L60 30 L80 30 L65 45 L70 65 L50 55 L30 65 L35 45 L20 30 L40 30 Z" />
          </svg>
        </div>
      </div>
    </footer>
  );
}
