import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 mt-10">
      <div className="max-w-[1240px] mx-auto px-5 py-10">

        {/* Top */}
        <div className="grid md:grid-cols-4 gap-8">

          <div>
            <h2 className="text-white text-xl font-bold mb-3">MovieApp</h2>
            <p className="text-sm">
              Watch trending, popular and upcoming movies all in one place.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Browse</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Trending</li>
              <li className="hover:text-white cursor-pointer">Popular</li>
              <li className="hover:text-white cursor-pointer">Top Rated</li>
              <li className="hover:text-white cursor-pointer">Upcoming</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm">
          © {new Date().getFullYear()} MovieApp. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
