import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar, Clock, MapPin, Users, ExternalLink, Loader2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import RegistrationForm from "./RegistrationForm";

const API_BASE_URL = "https://club-website-backend.onrender.com";

export default function EventsPage() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(null); // Store event ID for which form is shown

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/events`);

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      }

      const data = await response.json();

      // Normalize events to ensure they have an id property
      const normalizedData = data.map(event => ({
        ...event,
        id: event.id || event._id
      }));

      // Separate upcoming and past events based on date
      const now = new Date();
      const upcoming = [];
      const past = [];

      normalizedData.forEach(event => {
        const eventDate = new Date(event.date);
        if (eventDate >= now) {
          upcoming.push(event);
        } else {
          past.push(event);
        }
      });

      // Sort upcoming events by date (earliest first)
      upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
      // Sort past events by date (most recent first)
      past.sort((a, b) => new Date(b.date) - new Date(a.date));

      setUpcomingEvents(upcoming);
      setPastEvents(past.slice(0, 3)); // Show only 3 most recent past events
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.message);
      setUpcomingEvents([]);
      setPastEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: newsletterEmail }),
        });

        if (response.ok) {
          alert("Thank you for subscribing! You'll receive event updates via email.");
          setNewsletterEmail("");
        } else {
          alert("Failed to subscribe. Please try again.");
        }
      } catch (err) {
        console.error("Error subscribing to newsletter:", err);
        alert("Failed to subscribe. Please try again.");
      }
    }
  };

  const handleRegisterClick = (eventId) => {
    setShowRegistrationForm(eventId);
  };

  const handleRegistrationSuccess = () => {
    // Refresh events to update registration count
    fetchEvents();
  };

  const handleCloseRegistrationForm = () => {
    setShowRegistrationForm(null);
  };

  const capitalizeType = (type) => {
    if (!type) return "";
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  const getEventTypeColor = (type) => {
    if (!type) return "bg-gray-100 text-gray-800";
    const typeLower = type.toLowerCase();
    const colors = {
      "symposium": "bg-blue-100 text-blue-800",
      "workshop": "bg-green-100 text-green-800",
      "lecture": "bg-purple-100 text-purple-800",
      "presentation": "bg-orange-100 text-orange-800",
      "bootcamp": "bg-red-100 text-red-800",
      "showcase": "bg-yellow-100 text-yellow-800"
    };
    return colors[typeLower] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
            <p className="font-medium">Error loading events</p>
            <p className="text-sm mt-2">{error}</p>
            <Button onClick={fetchEvents} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay engaged with our research community through workshops, presentations, and collaborative sessions.
        </p>
      </div>

      {/* Featured Events */}
      {upcomingEvents.filter(event => event.featured).length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-medium">Featured Events</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {upcomingEvents.filter(event => event.featured).map((event) => (
              <Card key={event.id} className="relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge className={getEventTypeColor(event.type)}>{capitalizeType(event.type)}</Badge>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl pr-20">{event.title}</CardTitle>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(event.date)}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{formatTime(event.time)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4" />
                      <span>{event.capacity} attendees</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={event.registrationOpen ? "default" : "secondary"}>
                      {event.registrationOpen ? "Registration Open" : "Registration Closed"}
                    </Badge>
                    <Button size="sm" disabled={!event.registrationOpen} onClick={() => handleRegisterClick(event.id)}>
                      {event.registrationOpen ? "Register Now" : "Full"}
                    </Button>
                  </div>
                </CardContent>
                {showRegistrationForm === event.id && (
                  <RegistrationForm
                    event={event}
                    onClose={handleCloseRegistrationForm}
                    onSuccess={handleRegistrationSuccess}
                  />
                )}
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* All Upcoming Events */}
      <section className="space-y-6">
        <h2 className="text-2xl font-medium">All Upcoming Events</h2>
        {upcomingEvents.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No upcoming events scheduled. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-lg">{event.title}</h3>
                        <Badge className={getEventTypeColor(event.type)}>{capitalizeType(event.type)}</Badge>
                        {event.featured && <Badge variant="outline">Featured</Badge>}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(event.time)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{event.capacity} attendees</span>
                        </div>
                      </div>

                      <p className="text-sm">{event.description}</p>
                    </div>

                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <Badge variant={event.registrationOpen ? "default" : "secondary"}>
                        {event.registrationOpen ? "Open" : "Closed"}
                      </Badge>
                      <Button size="sm" disabled={!event.registrationOpen} onClick={() => handleRegisterClick(event.id)}>
                        {event.registrationOpen ? "Register" : "Full"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                {showRegistrationForm === event.id && (
                  <RegistrationForm
                    event={event}
                    onClose={handleCloseRegistrationForm}
                    onSuccess={handleRegistrationSuccess}
                  />
                )}
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Event Calendar */}
      <section className="space-y-6">
        <h2 className="text-2xl font-medium">Event Calendar</h2>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-12 space-y-4">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <h3 className="font-medium">Interactive Calendar</h3>
                <p className="text-sm text-muted-foreground">
                  View all events in calendar format, add to your personal calendar, and set reminders.
                </p>
              </div>
              <Button variant="outline" onClick={() => alert("Calendar view will be implemented soon!")}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Calendar View
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-medium">Recent Past Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <Card key={event.id || index}>
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>{formatDate(event.date)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {event.attendance && (
                    <div className="text-sm">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{event.attendance}</span>
                      </div>
                    </div>
                  )}
                  {event.description && (
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="bg-muted rounded-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-medium">Stay Updated</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Subscribe to our newsletter to receive event notifications, research updates, and exclusive opportunities.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto space-x-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </section>
    </div>
  );
}