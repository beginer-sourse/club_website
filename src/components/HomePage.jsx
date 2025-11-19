import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar, Users, BookOpen, Trophy } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import SimpleCarousel from "./ui/simple-carousel";
import SingleImageCarousel from "./ui/single-image-carousel";

export default function HomePage({ setCurrentPage }) {
  const recentHighlights = [
    {
      title: "Best Paper Award at ACM Conference",
      description: "Our member Sarah Chen won best paper award for her research on machine learning algorithms.",
      date: "March 15, 2024",
      type: "Achievement"
    },
    {
      title: "Spring Research Symposium",
      description: "Successfully hosted our annual symposium with 150+ attendees and 25 paper presentations.",
      date: "March 10, 2024",
      type: "Event"
    },
    {
      title: "New Partnership with IEEE",
      description: "Established collaboration with IEEE for joint research initiatives and publication opportunities.",
      date: "March 5, 2024",
      type: "Partnership"
    }
  ];

  const stats = [
    { label: "Active Members", value: "45", icon: Users },
    { label: "Papers Published", value: "23", icon: BookOpen },
    { label: "Conferences Attended", value: "12", icon: Calendar },
    { label: "Awards Won", value: "8", icon: Trophy }
  ];

  const eventPhotos = [
    {
      id: 1,
      title: "Annual Research Conference",
      description: "Dr. Johnson presenting on machine learning applications in healthcare",
      image: "/images/DSC_4492.JPG",
      alt: "Conference presentation"
    },
    {
      id: 2,
      title: "Spring Research Symposium",
      description: "Students presenting their research findings to faculty and peers",
      image: "/images/DSC_4515.JPG",
      alt: "Students research symposium"
    },
    {
      id: 3,
      title: "Research Event",
      description: "Club members engaged in research activities",
      image: "/images/DSC_4536.JPG",
      alt: "Research event"
    },
    {
      id: 4,
      title: "Research Activities",
      description: "Highlights from our research club events",
      image: "/images/DSC_4561.JPG",
      alt: "Research activities"
    },
    {
      id: 5,
      title: "Research Event Highlights",
      description: "Showcasing our club's research activities and events",
      image: "/images/DSC_4577.JPG",
      alt: "Research event highlights"
    },
    {
      id: 6,
      title: "Poster Session",
      description: "Interactive poster presentations during our monthly research showcase",
      image: "https://images.unsplash.com/photo-1719845853806-1c54b0ed37c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMHBvc3RlciUyMHNlc3Npb258ZW58MXx8fHwxNzU4NjQxMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Academic poster session"
    },
    {
      id: 7,
      title: "Research Collaboration Meeting",
      description: "Weekly meetings where members discuss ongoing projects and collaborate",
      image: "https://images.unsplash.com/photo-1736066330610-c102cab4e942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwcmVzZWFyY2hlMjBtZWV0aW5nfGVufDF8fHx8MTc1ODY0MTA5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "University research meeting"
    },
    {
      id: 8,
      title: "Award Ceremony",
      description: "Celebrating Sarah Chen's best paper award at the ACM Conference",
      image: "https://images.unsplash.com/photo-1758270703639-5f6f600baffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGF3YXJkJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzU4NjQxMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Academic award ceremony"
    },
    {
      id: 9,
      title: "Workshop Session",
      description: "Hands-on workshop on research methodology and paper writing techniques",
      image: "https://images.unsplash.com/photo-1735639013995-086e648eaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMGNvbGxhYm9yYXRpb24lMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NTg2NDEwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Research collaboration workshop"
    }
  ];

  const eventGalleryPhotos = [
    {
      id: 1,
      title: "Research Team Group Photo",
      description: "Our research team at the annual conference",
      image: "/images/DSC_4492.JPG",
      alt: "Research team group photo"
    },
    {
      id: 2,
      title: "Conference Networking",
      description: "Networking session during the research conference",
      image: "/images/DSC_4515.JPG",
      alt: "Conference networking"
    },
    {
      id: 3,
      title: "Research Event Gallery",
      description: "Moments from our research activities",
      image: "/images/DSC_4536.JPG",
      alt: "Research event gallery"
    },
    {
      id: 4,
      title: "Club Event Gallery",
      description: "Capturing moments from our club activities",
      image: "/images/DSC_4561.JPG",
      alt: "Club event gallery"
    },
    {
      id: 5,
      title: "Club Event Highlights",
      description: "Showcasing memorable moments from our club events",
      image: "/images/DSC_4577.JPG",
      alt: "Club event highlights"
    },
    {
      id: 6,
      title: "Research Workshop",
      description: "Hands-on research methodology workshop",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHdvcmtzaG9wfGVufDF8fHx8MTc1ODY0MTEwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Research workshop"
    },
    {
      id: 7,
      title: "Research Collaboration",
      description: "International research collaboration meeting",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHx8MTc1ODY0MTEwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Research collaboration"
    },
    {
      id: 8,
      title: "Academic Conference",
      description: "Large academic conference with multiple speakers",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FkZW1pYyUyMGNvbmZlcmVuY2UlMjBhdWRpZW5jZXxlbnwxfHx8fDE3NTg2NDExMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Academic conference audience"
    },
    {
      id: 9,
      title: "Research Presentation",
      description: "Student presenting research findings to faculty",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NTg2NDExMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Research presentation"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Welcome to Springer Research Paper Club</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advancing academic excellence through collaborative research, peer review, and scholarly publication. 
            Join us in exploring the frontiers of knowledge and contributing to scientific progress.
          </p>
        </div>
        
        <div className="relative h-96 rounded-lg overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1588618319407-948d4424befd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMHJlc2VhcmNoJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzU4NjQwMzIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Students researching in library"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-8">
            <div className="text-center text-white space-y-4">
              <h2 className="text-2xl font-medium">Research. Collaborate. Publish.</h2>
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-white/90"
                onClick={() => setCurrentPage('team')}
              >
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-muted rounded-lg p-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-medium">Our Mission</h2>
          <p className="text-lg">
            To foster a collaborative environment where students and faculty can engage in meaningful research, 
            develop critical thinking skills, and contribute to the global academic community through high-quality 
            scholarly publications and presentations.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <Icon className="h-8 w-8 mx-auto text-primary" />
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Recent Highlights */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-medium">Recent Highlights</h2>
          <p className="text-muted-foreground">Stay updated with our latest achievements and activities</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {recentHighlights.map((highlight, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{highlight.type}</Badge>
                  <span className="text-sm text-muted-foreground">{highlight.date}</span>
                </div>
                <CardTitle className="text-lg">{highlight.title}</CardTitle>
                <CardDescription>{highlight.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Event Photos */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-medium">Event Photos</h2>
          <p className="text-muted-foreground">Capturing moments from our research activities and academic events</p>
        </div>
        
        <SimpleCarousel 
          itemsPerView={3}
          autoPlay={true}
          autoPlayInterval={4000}
          className="w-full"
        >
          {eventPhotos.map((photo) => (
            <div key={photo.id} className="space-y-3">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={photo.image}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">{photo.title}</h3>
                <p className="text-sm text-muted-foreground">{photo.description}</p>
              </div>
            </div>
          ))}
        </SimpleCarousel>
      </section>

      {/* Event Gallery Photos */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-medium">Event Gallery</h2>
          <p className="text-muted-foreground">Behind-the-scenes moments and candid shots from our events</p>
        </div>
        
        <SingleImageCarousel 
          images={eventGalleryPhotos}
          autoPlay={true}
          autoPlayInterval={1500}
          className="w-full"
        />
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-medium">Ready to Get Involved?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're interested in presenting your research, collaborating on projects, or simply learning 
            from others, we welcome you to join our community.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => setCurrentPage('events')}>
            View Upcoming Events
          </Button>
          <Button size="lg" variant="outline" onClick={() => setCurrentPage('contact')}>
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}