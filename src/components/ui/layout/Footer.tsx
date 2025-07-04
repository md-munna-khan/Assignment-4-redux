import logo from "./logo.jpg";
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10">
        <div className=" flex items-center justify-center mb-4 mx-auto space-x-3">
           <img className="w-20 h-20 rounded-full" src={logo}></img>
            <span className="text-2xl font-bold text-gray-900">BookZone</span>
          </div>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-10">
          {/* Logo & Brand */}
        

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 flex-grow">
            {/* Quick Links */}
            <div>
              <h3 className="text-gray-900 text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="/" className="hover:text-blue-500 transition">Home</a>
                </li>
                <li>
                  <a href="/books" className="hover:text-blue-500 transition">Books</a>
                </li>
                <li>
                  <a href="/borrow-summary" className="hover:text-blue-500 transition">Borrow Summary</a>
                </li>
                <li>
                  <a href="/services" className="hover:text-blue-500 transition">Services</a>
                </li>
                <li>
                  <a href="/membership" className="hover:text-blue-500 transition">Membership</a>
                </li>
              </ul>
            </div>

            {/* E-books */}
            <div>
              <h3 className="text-gray-900 text-lg font-semibold mb-4">E-books</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="/ebooks" className="hover:text-blue-500 transition">E-books</a>
                </li>
                <li>
                  <a href="/audiobooks" className="hover:text-blue-500 transition">Audiobooks</a>
                </li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h3 className="text-gray-900 text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="/mission" className="hover:text-blue-500 transition">Our Mission</a>
                </li>
                <li>
                  <a href="/team" className="hover:text-blue-500 transition">Team</a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-blue-500 transition">Careers</a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-gray-900 text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="/help-center" className="hover:text-blue-500 transition">Help Center</a>
                </li>
                <li>
                  <a href="/faqs" className="hover:text-blue-500 transition">FAQs</a>
                </li>
                <li>
                  <a href="/feedback" className="hover:text-blue-500 transition">Feedback</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Bookio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
