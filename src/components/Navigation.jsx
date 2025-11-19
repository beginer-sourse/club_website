import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { LogOut, Shield, Menu, X } from "lucide-react";

export default function Navigation({ 
  currentPage, 
  setCurrentPage, 
  isAuthenticated, 
  onLogout, 
  onAdminClick 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const navRef = useRef(null);

  const publicNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'team', label: 'Team' },
    { id: 'events', label: 'Upcoming Events' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  // Check screen size and set desktop/mobile mode
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      if (width >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav ref={navRef} className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-medium">S</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-medium">
                {isDesktop ? "Springer Research Paper Club" : "Paper Club"}
              </h1>
              {isDesktop && (
                <p className="text-sm text-muted-foreground">
                  Academic Excellence Through Research
                </p>
              )}
            </div>
          </div>
          
          {/* Desktop Navigation - Only show on desktop */}
          {isDesktop && (
            <div className="flex items-center space-x-1">
              {/* Public Navigation Items */}
              {publicNavItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => setCurrentPage(item.id)}
                  className="text-sm"
                >
                  {item.label}
                </Button>
              ))}

              {/* Admin Section */}
              {isAuthenticated ? (
                <>
                  <Button
                    variant={currentPage === "admin" ? "default" : "ghost"}
                    onClick={onAdminClick}
                    className="text-sm flex items-center space-x-1"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                  </Button>
                  <div className="flex items-center space-x-2 ml-2 pl-2 border-l">
                    <Badge variant="secondary" className="text-xs">
                      Admin
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onLogout}
                      className="text-sm flex items-center space-x-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={onAdminClick}
                  className="text-sm flex items-center space-x-1"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin Login</span>
                </Button>
              )}
            </div>
          )}

          {/* Mobile Menu Button - Only show on mobile */}
          {!isDesktop && (
            <div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu - Only show on mobile when open */}
        {!isDesktop && isMobileMenuOpen && (
          <div className="border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Public Navigation Items */}
              {publicNavItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full justify-start text-sm"
                >
                  {item.label}
                </Button>
              ))}

              {/* Admin Section */}
              {isAuthenticated ? (
                <>
                  <Button
                    variant={currentPage === "admin" ? "default" : "ghost"}
                    onClick={() => {
                      onAdminClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-sm flex items-center space-x-2"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                  </Button>
                  <div className="flex items-center justify-between px-3 py-2 border-t">
                    <Badge variant="secondary" className="text-xs">
                      Admin
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-sm flex items-center space-x-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    onAdminClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-sm flex items-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin Login</span>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}