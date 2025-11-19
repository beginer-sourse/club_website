import { useState } from "react";
import Navigation from "./components/Navigation.jsx";
import HomePage from "./components/HomePage.jsx";
import TeamPage from "./components/TeamPage.jsx";
import EventsPage from "./components/EventsPage.jsx";
import AdminPage from "./components/AdminPage.jsx";
import ContactPage from "./components/ContactPage.jsx";
import LoginDialog from "./components/LoginDialog.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleLogin = (username, password) => {
    // Simple authentication check (in real app, this would be API call)
    if (username === "admin" && password === "password123") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (currentPage === "admin") {
      setCurrentPage("home");
    }
  };

  const handleAdminClick = () => {
    if (isAuthenticated) {
      setCurrentPage("admin");
    } else {
      setShowLoginDialog(true);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} />;
      case "team":
        return <TeamPage />;
      case "events":
        return <EventsPage />;
      case "admin":
        return isAuthenticated ? <AdminPage /> : <HomePage setCurrentPage={setCurrentPage} />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onAdminClick={handleAdminClick}
      />
      <main className="flex-1 pb-8">
        {renderPage()}
      </main>
      
      <Footer setCurrentPage={setCurrentPage} />
      
      <LoginDialog 
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}