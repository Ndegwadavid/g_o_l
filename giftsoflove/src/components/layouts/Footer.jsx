// src/components/layouts/Footer.jsx
import { Heart, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white/20 backdrop-blur-md">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-bold">Gifts of Love</span>
            </div>
            <p className="text-gray-600 mb-4">
              Creating personalized love stories through beautiful custom books.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Twitter', 'Facebook'].map((social) => (
                <a key={social} href="#" className="text-gray-600 hover:text-rose-500">
                  {social === 'Instagram' && <Instagram size={20} />}
                  {social === 'Twitter' && <Twitter size={20} />}
                  {social === 'Facebook' && <Facebook size={20} />}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Books', 'Create Book', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-rose-500">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-600">
                <Mail size={18} />
                <span>hello@giftsoflove.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone size={18} />
                <span>+254 712 345 678</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <MapPin size={18} />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white/50 border border-gray-200 focus:outline-none focus:border-rose-500"
              />
              <button className="w-full px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">© 2025 Gifts of Love. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-rose-500">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-rose-500">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}