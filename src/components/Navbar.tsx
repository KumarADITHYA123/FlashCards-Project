import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isFlashcardsPage = location.pathname === "/flashcards";

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
          aria-label="Pulse Robot"
        >
          <svg
            className="h-8 w-8 text-black dark:text-orange-400"
            viewBox="0 0 32 32"
            fill="currentColor"
            aria-label="Pulse Robot Logo"
          >
            <path d="M16 2c1.1 0 2 0.9 2 2v3.06c1.13-0.19 2.3-0.06 3.36 0.41l1.53-2.65c0.55-0.95 1.77-1.27 2.72-0.72s1.27 1.77 0.72 2.72l-1.53 2.65c0.9 0.77 1.66 1.7 2.19 2.77l2.65-1.53c0.95-0.55 2.17-0.23 2.72 0.72s0.23 2.17-0.72 2.72l-2.65 1.53c0.47 1.06 0.6 2.23 0.41 3.36h3.06c1.1 0 2 0.9 2 2s-0.9 2-2 2h-3.06c0.19 1.13 0.06 2.3-0.41 3.36l2.65 1.53c0.95 0.55 1.27 1.77 0.72 2.72s-1.77 1.27-2.72 0.72l-2.65-1.53c-0.53 1.07-1.29 2-2.19 2.77l1.53 2.65c0.55 0.95 0.23 2.17-0.72 2.72s-2.17 0.23-2.72-0.72l-1.53-2.65c-1.06 0.47-2.23 0.6-3.36 0.41v3.06c0 1.1-0.9 2-2 2s-2-0.9-2-2v-3.06c-1.13 0.19-2.3 0.06-3.36-0.41l-1.53 2.65c-0.55 0.95-1.77 1.27-2.72 0.72s-1.27-1.77-0.72-2.72l1.53-2.65c-0.9-0.77-1.66-1.7-2.19-2.77l-2.65 1.53c-0.95 0.55-2.17 0.23-2.72-0.72s-0.23-2.17 0.72-2.72l2.65-1.53c-0.47-1.06-0.6-2.23-0.41-3.36h-3.06c-1.1 0-2-0.9-2-2s0.9-2 2-2h3.06c-0.19-1.13-0.06-2.3 0.41-3.36l-2.65-1.53c-0.95-0.55-1.27-1.77-0.72-2.72s1.77-1.27 2.72-0.72l2.65 1.53c0.53-1.07 1.29-2 2.19-2.77l-1.53-2.65c-0.55-0.95-0.23-2.17 0.72-2.72s2.17-0.23 2.72 0.72l1.53 2.65c1.06-0.47 2.23-0.6 3.36-0.41v-3.06c0-1.1 0.9-2 2-2zm0 8a6 6 0 100 12 6 6 0 000-12z" />
          </svg>
          <span className={cn(
            "text-lg font-medium text-gray-900",
            "dark:text-orange-400"
          )}>Learn AI</span>
        </Link>
        <div className="flex items-center space-x-8">
          <Link to="/" className={cn(
            "nav-link",
            "dark:text-orange-400 dark:hover:text-orange-400"
          )} onClick={scrollToTop}>Home</Link>
          <Link to="/flashcards" className={cn(
            "nav-link",
            "dark:text-orange-400 dark:hover:text-orange-400"
          )}>Flashcards</Link>
          <ThemeToggle />
          <button 
            className="text-gray-700 dark:text-white p-3 focus:outline-none md:hidden" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
