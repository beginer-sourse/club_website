import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Mail, Phone, MapPin, Calendar, Users, BookOpen, Trophy, ExternalLink } from "lucide-react";

export default function Footer({ setCurrentPage }) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", page: "home" },
    { label: "Team", page: "team" },
    { label: "Events", page: "events" },
    { label: "Contact", page: "contact" }
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "#", icon: "💼" },
    { name: "Twitter", url: "#", icon: "🐦" },
    { name: "Facebook", url: "#", icon: "📘" },
    { name: "Instagram", url: "#", icon: "📷" }
  ];

  const stats = [
    { label: "Active Members", value: "45", icon: Users },
    { label: "Papers Published", value: "23", icon: BookOpen },
    { label: "Conferences", value: "12", icon: Calendar },
    { label: "Awards Won", value: "8", icon: Trophy }
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-primary rounded-lg flex items-center justify-center">
               <img src="/images/file.jpg" alt="logo" />
              </div>
              <div>
                <h3 className="font-semibold">Springer Research Paper Club</h3>
                <p className="text-sm text-muted-foreground">Academic Excellence Through Research</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Fostering collaborative research, peer review, and scholarly publication 
              to advance academic excellence and contribute to scientific progress.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => window.open(social.url, '_blank')}
                >
                  <span className="text-lg">{social.icon}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => setCurrentPage(link.page)}
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">scset.bsc@bennett.edu.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+91 70564 88403</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Plot No. 8-11, Tech Zone II,<br />
                   Greater Noida,<br />
                   Uttar Pradesh 201310<br/>
                </span>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <h4 className="font-semibold">Our Impact</h4>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Springer Research Paper Club. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto">
                  Privacy Policy
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto">
                  Terms of Service
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
