// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Sidebar from "./components/layouts/Sidebar";
import Footer from "./components/layouts/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Customize from "./pages/Customize";
import "./styles/globals.css";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex pt-16">
          <Sidebar />
          {/* Main content wrapper with responsive margin */}
          <div className="flex-1 md:ml-0 lg:ml-72 w-full">
            <main className="min-h-[calc(100vh-4rem)]">
              <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/books" element={<Books />} />
                  <Route path="/customize" element={<Customize />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}