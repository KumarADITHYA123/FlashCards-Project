
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full w-9 h-9 transition-all duration-300 dark:hover:bg-gray-800"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-gray-700 transition-transform duration-300" />
          ) : (
            <Sun className="h-5 w-5 text-amber-400 transition-transform duration-300" />
          )}
          <span className="sr-only">
            Toggle {theme === 'light' ? 'dark' : 'light'} mode
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="dark:bg-gray-800 dark:text-gray-100">
        <p>Toggle {theme === 'light' ? 'dark' : 'light'} mode</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
