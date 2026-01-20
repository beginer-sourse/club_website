import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "./ui/button";
import "./TeamPage.css";

export default function TeamPage() {
  const facultyAdvisor = {
    name: "Dr. Simar Preet Singh",
    position: "Faculty Advisor",
    department: "Computer Science",
    email: "scset.bsc@bennett.edu.in",
    bio: "Dr. Simar Preet Singh specializes in cloud computing.",
    image: "/images/simar_sir.jpeg"
  };

  const officers = [
    {
      name: "Kritika Dawar",
      position: "President",
      year: "Senior",
      major: "Computer Science",
      email: "kritika.dawar@student.edu",
      linkedin: "linkedin.com/in/kritikadawar",
      
      bio: "Leading research in AI ethics and natural language processing.",
      image: "/images/PHOTO-2025-11-14-16-43-04.jpg"
    },
    {
      name: "Jasnoor Kaur Bhullar",
      position: "Vice-President",
      year: "Senior",
      major: "Computer Science",
      email: "jasnoor.bhullar@student.edu",
      bio: "Supporting club leadership and strategic initiatives.",
      image: "/images/PHOTO-2025-11-14-16-57-21.jpg"
    },
    {
      name: "Piyush Yadav",
      position: "Head of Tech",
      year: "Senior",
      major: "computer Science",
      // email: "karan.malhotra@student.edu",
      bio: "Creatiion of website and its maintenance and engaging with the online community.",
      image: "/images/PHOTO-2025-11-18-01-22-45.jpg"
    },
    {
      name: "Jatin Sharma",
      position: "Co-head Tech",
      year: "Senior",
      major: "Computer Science",
      email: "jatinsharma1400@gmail.com",
      linkedin: "linkedin.com/in/jatinsharma1400",
      bio: "Managing website and its maintenance and engaging with the online community.",
      image: "/images/PHOTO-2025-11-17-23-05-18.jpg"
    },
    
    {
      name: "Diva Malik",
      position: "Head Social Media Team",
      year: "Senior",
      major: "Computer Science",
      email: "diva.malik@student.edu",
      bio: "Managing social media strategy and engaging with the online community.",
      image: "/images/PHOTO-2025-11-14-20-43-41.jpg"
    },
    {
      name: "Vanshika Dhull",
      position: "Co-Head Social Media Team",
     year: "Senior",
      major: "Computer Science",
      email: "vanshika.dhull@student.edu",
      bio: "Contributing to club activities and initiatives.",
      image: "/images/PHOTO-2025-11-14-20-42-57.jpg"
    },
    {
      name: "Prachi Shoree",
      position: "Design Head",
      year: "Senior",
      major: "Computer Science",
      email: "prachi.shoree@student.edu",
      linkedin: "linkedin.com/in/prachishoree",
      bio: "Leading design initiatives and visual identity for the club.",
      image: "/images/PHOTO-2025-11-14-16-41-42.jpg"
    },
    ,
    {
      name: "Gunnidhi Mago",
      position: "Co-Head Design Team",
      year: "Senior",
      major: "Computer Science",
      email: "gunnidhi.mago@student.edu",
      bio: "Leading design initiatives and visual identity for the club.",
      image: "/images/PHOTO-2025-11-14-20-45-25.jpg"
    },
    
    {
      name: "Himanshi Singal",
      position: "Head PR and Outreach",
      year: "Senior",
      major: "Computer Science",
      email: "himanshi.singal@student.edu",
      bio: "Leading public relations and outreach initiatives to build connections and promote the club.",
      image: "/images/PHOTO-2025-11-16-23-56-17.jpg"
    },
    {
      name: "Shreya Tiwari",
      position: "Co head PR and Outreach",
      year: "Senior",
      major: "Computer Science",
      email: "shreya.tiwari@student.edu",
      bio: "Promoting club activities and building brand awareness across campus through PR and outreach initiatives.",
      image: "/images/PHOTO-2025-11-16-23-54-59.jpg"
    },
    {
      name: "Udit Bhardwaj",
      position: "Head Finance Team",
      year: "Senior",
      major: "Computer Science",
      email: "udit.bhardwaj@student.edu",
      linkedin: "linkedin.com/in/uditbhardwaj",
      bio: "Managing social media strategy and online engagement for the club.",
      image: "/images/PHOTO-2025-11-14-16-45-56.jpg"
    },
    {
      name: "Shikhar",
      position: "Co-Head Finance Team",
      year: "Senior",
      major: "Computer Science",
      email: "shikhar@student.edu",
      bio: "Contributing to club activities and initiatives.",
      image: "/images/PHOTO-2025-11-14-15-26-11.jpg"
    },
    
    {
      name: "Garvita Singh",
      position: "Head Management Team",
     year: "Senior",
      major: "Computer Science",
      email: "garvita.singh@student.edu",
      bio: "Leading content creation and writing initiatives for the club.",
      image: "/images/PHOTO-2025-11-14-16-38-05.jpg"
    },
    
    
    // {
    //   name: "Divya Joshi",
    //   position: "Head of Mentorship",
    //   year: "Senior",
    //   major: "Education",
    //   email: "divya.joshi@student.edu",
    //   linkedin: "linkedin.com/in/divyajoshi",
    //   bio: "Connecting students with mentors and facilitating knowledge transfer.",
    //   image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
    // },
    // {
    //   name: "Arjun Verma",
    //   position: "Head of Workshops",
    //   year: "Junior",
    //   major: "Engineering",
    //   email: "arjun.verma@student.edu",
    //   bio: "Coordinating skill development workshops and training sessions.",
    //   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
    // },
    // {
    //   name: "Kavya Srinivasan",
    //   position: "Head of Documentation",
    //   year: "Junior",
    //   major: "Technical Writing",
    //   email: "kavya.srinivasan@student.edu",
    //   bio: "Maintaining comprehensive records and documentation for all club activities.",
    //   image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    // },
    // {
    //   name: "Aditya Choudhury",
    //   position: "Head of Partnerships",
    //   year: "Senior",
    //   major: "Business Administration",
    //   email: "aditya.choudhury@student.edu",
    //   linkedin: "linkedin.com/in/adityachoudhury",
    //   bio: "Establishing collaborations with industry partners and academic institutions.",
    //   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    // },
    // {
    //   name: "Isha Gupta",
    //   position: "Head of Community",
    //   year: "Sophomore",
    //   major: "Sociology",
    //   email: "isha.gupta@student.edu",
    //   bio: "Fostering an inclusive and supportive community environment for all members.",
    //   image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
    // },
    // {
    //   name: "Rahul Sharma",
    //   position: "Head of Innovation",
    //   year: "Senior",
    //   major: "Innovation Management",
    //   email: "rahul.sharma@student.edu",
    //   linkedin: "linkedin.com/in/rahulsharma",
    //   github: "github.com/rahulsharma",
    //   bio: "Driving innovative research initiatives and exploring emerging technologies.",
    //   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
    // },
    // {
    //   name: "Neha Kapoor",
    //   position: "Head of Quality Assurance",
    //   year: "Junior",
    //   major: "Quality Management",
    //   email: "neha.kapoor@student.edu",
    //   bio: "Ensuring high standards in all club deliverables and research outputs.",
    //   image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
    // },
    // {
    //   name: "Siddharth Agarwal",
    //   position: "Head of Strategy",
    //   year: "Senior",
    //   major: "Strategic Management",
    //   email: "siddharth.agarwal@student.edu",
    //   linkedin: "linkedin.com/in/siddharthagarwal",
    //   bio: "Developing long-term strategic plans and growth initiatives for the club.",
    //   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    // }
  ];

  const members = [
    { name: "James Wilson", year: "Senior", major: "Physics", research: "Quantum Computing" },
    { name: "Lisa Park", year: "Junior", major: "Biology", research: "Computational Biology" },
    { name: "David Kim", year: "Sophomore", major: "Chemistry", research: "Materials Science" },
    { name: "Rachel Green", year: "Senior", major: "Psychology", research: "Cognitive Science" },
    { name: "Tom Anderson", year: "Junior", major: "Engineering", research: "Robotics" },
    { name: "Maya Patel", year: "Sophomore", major: "Neuroscience", research: "Brain Imaging" },
    { name: "Carlos Rodriguez", year: "Senior", major: "Philosophy", research: "Ethics in AI" },
    { name: "Anna Lee", year: "Junior", major: "Statistics", research: "Bayesian Methods" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Our Team</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Meet the dedicated individuals who drive our research initiatives and foster academic excellence within our community.
        </p>
      </div>

      {/* Faculty Advisor */}
      <section className="space-y-6">
        <h2 className="text-2xl font-medium">Faculty Advisor</h2>
        <Card className="max-w-2xl">
          <CardHeader>
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={facultyAdvisor.image} alt={facultyAdvisor.name} />
                <AvatarFallback>{facultyAdvisor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle>{facultyAdvisor.name}</CardTitle>
                <CardDescription>{facultyAdvisor.position} • {facultyAdvisor.department}</CardDescription>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{facultyAdvisor.bio}</p>
          </CardContent>
        </Card>
      </section>

      {/* Club Officers */}
      <section className="space-y-6">
        <h2 className="text-2xl font-medium">Club Officers</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {officers.map((officer, index) => (
            <Card key={index} className="team-officer-card">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="team-officer-avatar">
                    <AvatarImage src={officer.image} alt={officer.name} />
                    <AvatarFallback>{officer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{officer.name}</CardTitle>
                    <CardDescription>
                      {officer.position} • {officer.year} • {officer.major}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    <Button variant="ghost" size="sm" className="h-7 px-2">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                    {officer.linkedin && (
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Linkedin className="h-3 w-3 mr-1" />
                        LinkedIn
                      </Button>
                    )}
                    {officer.github && (
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <Github className="h-3 w-3 mr-1" />
                        GitHub
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{officer.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Active Members */}
      {/* {
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">Active Members</h2>
          <Badge variant="secondary">{members.length} Members</Badge>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-sm">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{member.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {member.year} • {member.major}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Research: {member.research}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section> */}
      
      {/* Join Our Team */}
      <section className="bg-muted rounded-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-medium">Interested in Joining?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We welcome students from all disciplines who are passionate about research and academic excellence. 
          No prior research experience required - just curiosity and dedication to learning.
        </p>
        <div className="space-y-2">
          <p className="font-medium">Next Application Deadline: April 15, 2024</p>
          <Button size="lg">Apply for Membership</Button>
        </div>
      </section>
    </div>
  );
}