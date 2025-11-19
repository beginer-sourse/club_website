import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Machine Learning Research Symposium",
      date: "April 15, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Engineering Building, Room 201",
      description: "Join us for presentations on cutting-edge machine learning research from our members and guest speakers from industry.",
      type: "Symposium",
      capacity: "150 attendees",
      registrationOpen: true,
      featured: true
    },
    {
      id: 2,
      title: "Peer Review Workshop",
      date: "April 22, 2024", 
      time: "6:00 PM - 8:00 PM",
      location: "Library Conference Room A",
      description: "Learn the fundamentals of academic peer review with hands-on practice reviewing sample papers.",
      type: "Workshop",
      capacity: "30 attendees",
      registrationOpen: true,
      featured: false
    },
    {
      id: 3,
      title: "Guest Lecture: Dr. Sarah Kim",
      date: "April 28, 2024",
      time: "3:00 PM - 4:30 PM", 
      location: "Science Auditorium",
      description: "Dr. Kim from MIT will present her research on quantum computing applications in cryptography.",
      type: "Lecture",
      capacity: "200 attendees",
      registrationOpen: true,
      featured: true
    },
    {
      id: 4,
      title: "Research Proposal Presentations",
      date: "May 5, 2024",
      time: "1:00 PM - 4:00 PM",
      location: "Student Union, Room 301",
      description: "Club members present their research proposals for feedback and potential collaboration opportunities.",
      type: "Presentation",
      capacity: "80 attendees",
      registrationOpen: true,
      featured: false
    },
    {
      id: 5,
      title: "Academic Writing Bootcamp",
      date: "May 12, 2024",
      time: "10:00 AM - 3:00 PM",
      location: "Writing Center",
      description: "Intensive workshop covering academic writing techniques, citation styles, and publication strategies.",
      type: "Bootcamp",
      capacity: "25 attendees",
      registrationOpen: false,
      featured: false
    },
    {
      id: 6,
      title: "End-of-Year Research Showcase",
      date: "May 20, 2024",
      time: "5:00 PM - 8:00 PM",
      location: "University Gallery",
      description: "Celebrate the year's achievements with poster presentations, networking, and awards ceremony.",
      type: "Showcase",
      capacity: "300 attendees",
      registrationOpen: true,
      featured: true
    }
  ];

  const pastEvents = [
    {
      title: "Spring Research Conference",
      date: "March 15, 2024",
      attendance: "175 participants",
      highlights: "25 paper presentations, 3 keynote speakers"
    },
    {
      title: "Data Science Workshop Series", 
      date: "February 28, 2024",
      attendance: "45 participants",
      highlights: "Python tutorials, statistical analysis methods"
    },
    {
      title: "Publishing Workshop with IEEE",
      date: "February 10, 2024", 
      attendance: "60 participants",
      highlights: "Publication guidelines, submission process"
    }
  ];

  const getEventTypeColor = (type) => {
    const colors = {
      "Symposium": "bg-blue-100 text-blue-800",
      "Workshop": "bg-green-100 text-green-800", 
      "Lecture": "bg-purple-100 text-purple-800",
      "Presentation": "bg-orange-100 text-orange-800",
      "Bootcamp": "bg-red-100 text-red-800",
      "Showcase": "bg-yellow-100 text-yellow-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay engaged with our research community through workshops, presentations, and collaborative sessions.
        </p>
      </div>
 
      {/* Featured Events
      <section className="space-y-6">
        <h2 className="text-2xl font-medium">Featured Events</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {upcomingEvents.filter(event => event.featured).map((event) => (
            <Card key={event.id} className="relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl pr-20">{event.title}</CardTitle>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>{event.capacity}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{event.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant={event.registrationOpen ? "default" : "secondary"}>
                    {event.registrationOpen ? "Registration Open" : "Registration Closed"}
                  </Badge>
                  <Button size="sm" disabled={!event.registrationOpen}>
                    {event.registrationOpen ? "Register Now" : "Full"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>*/}

      {/* All Upcoming Events */}
      {/* <section className="space-y-6">
        <h2 className="text-2xl font-medium">All Upcoming Events</h2>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-lg">{event.title}</h3>
                      <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                      {event.featured && <Badge variant="outline">Featured</Badge>}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{event.capacity}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm">{event.description}</p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <Badge variant={event.registrationOpen ? "default" : "secondary"}>
                      {event.registrationOpen ? "Open" : "Closed"}
                    </Badge>
                    <Button size="sm" disabled={!event.registrationOpen}>
                      {event.registrationOpen ? "Register" : "Full"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Event Calendar */}
      {/* <section className="space-y-6">
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
              <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Calendar View
              </Button>
            </div>
          </CardContent>
        </Card>
      </section> */}

      {/* Past Events */}
      {/* <section className="space-y-6">
        <h2 className="text-2xl font-medium">Recent Past Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {pastEvents.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{event.attendance}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{event.highlights}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Newsletter Signup */}
      {/* <section className="bg-muted rounded-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-medium">Stay Updated</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Subscribe to our newsletter to receive event notifications, research updates, and exclusive opportunities.
        </p>
        <div className="flex max-w-md mx-auto space-x-2">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 px-3 py-2 border border-border rounded-md"
          />
          <Button>Subscribe</Button>
        </div>
      </section>   */}
    </div>
  );
}