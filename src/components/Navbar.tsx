
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 dark:bg-dark-900/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={scrollToTop}
          aria-label="Learn AI"
        >
          <img 
            src="/logo.svg" 
            alt="Learn AI Logo" 
            className="h-7 sm:h-8" 
          />
          <span className="text-lg font-medium text-gray-900 dark:text-white">Learn AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link dark:text-gray-300 dark:hover:text-white" onClick={scrollToTop}>Home</Link>
          <Link to="/flashcards" className="nav-link dark:text-gray-300 dark:hover:text-white">Flashcards</Link>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile menu button - increased touch target */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button 
            className="text-gray-700 dark:text-gray-300 p-3 focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - improved for better touch experience */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white dark:bg-dark-900 flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-8 items-center mt-8">
          <Link 
            to="/" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800" 
            onClick={() => {
              scrollToTop();
              closeMenu();
            }}
          >
            Home
          </Link>
          <Link 
            to="/flashcards" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800" 
            onClick={closeMenu}
          >
            Flashcards
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
