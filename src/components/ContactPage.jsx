import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Users,
  Calendar,
  ExternalLink
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: ""
  });

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "scset.bsc@bennett.edu.in",
      description: "General inquiries and information"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "(555) 123-4567",
      description: "Office hours only"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Bennett University Greater Noida",
      description: "Plot No. 8-11, Tech Zone II, Greater Noida, Uttar Pradesh 201310"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Monday - Friday: 2:00 PM - 5:00 PM",
      description: "Walk-ins welcome during office hours"
    }
  ];

  const keyContacts = [
    {
      name: "Dr. Emily Richardson",
      role: "Faculty Advisor",
      email: "scset.bsc@bennett.edu.in",
      office: "Engineering Building, Room 312",
      hours: "Tue/Thu 1:00-3:00 PM"
    },
    {
      name: "Alex Chen",
      role: "Club President",
      email: "alex.chen@student.edu",
      office: "Student Union, Room 204",
      hours: "Mon/Wed/Fri 3:00-4:00 PM"
    },
    {
      name: "Sarah Johnson",
      role: "Vice President",
      email: "sarah.j@student.edu",
      office: "Student Union, Room 204",
      hours: "Tue/Thu 2:00-4:00 PM"
    }
  ];

  const faqItems = [
    {
      question: "How do I join the Springer Research Paper Club?",
      answer: "You can apply for membership through our online application form. We accept new members at the beginning of each semester. No prior research experience is required."
    },
    {
      question: "What are the membership requirements?",
      answer: "We welcome students from all disciplines with a GPA of 3.0 or higher and a genuine interest in research. Active participation in club activities is expected."
    },
    {
      question: "Are there membership fees?",
      answer: "There are no membership fees. However, some special events or conferences may have optional registration fees."
    },
    {
      question: "Can I present my research at club meetings?",
      answer: "Absolutely! We encourage all members to share their research. Contact our Program Committee to schedule a presentation slot."
    },
    {
      question: "Do you help with research publication?",
      answer: "Yes, we provide guidance on academic writing, peer review processes, and publication strategies. We also host workshops on these topics."
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Mock form submission
    alert("Thank you for your message! We'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      inquiryType: ""
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions about our research club? Want to collaborate or join our community? 
          We'd love to hear from you.
        </p>
      </div>

      {/* Contact Information */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6 text-center space-y-4">
                <Icon className="h-8 w-8 mx-auto text-primary" />
                <div>
                  <h3 className="font-medium">{info.title}</h3>
                  <p className="font-medium text-sm mt-1">{info.details}</p>
                  <p className="text-xs text-muted-foreground mt-2">{info.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Send us a Message</span>
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiry-type">Inquiry Type</Label>
                  <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="membership">Membership Application</SelectItem>
                      <SelectItem value="collaboration">Research Collaboration</SelectItem>
                      <SelectItem value="event">Event Information</SelectItem>
                      <SelectItem value="presentation">Presentation Opportunity</SelectItem>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief subject line"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Key Contacts & FAQ */}
        <section className="space-y-6">
          {/* Key Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Key Contacts</span>
              </CardTitle>
              <CardDescription>Direct contact information for club leadership</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {keyContacts.map((contact, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                  </div>
                  {/* <div className="text-sm space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3" />
                      <span>{contact.office}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{contact.hours}</span>
                    </div>
                  </div> */}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Additional resources and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule a Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                Join Our Mailing List
              </Button> */}
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                Follow Us on Social Media
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-medium">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Find answers to common questions about our club</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {faqItems.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{item.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Location Map */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-medium">Visit Us</h2>
          <p className="text-muted-foreground">Find us on campus during our office hours</p>
        </div>
        
        {/* <Card>
          <CardContent className="p-6">
            <div className="text-center py-12 space-y-4">
              <MapPin className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <h3 className="font-medium">Campus Location</h3>
                <p className="text-sm text-muted-foreground">
                  Student Union Building, Room 204<br />
                  123 University Avenue, College Town, ST 12345
                </p>
              </div>
              <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Campus Map
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </section>
    </div>
  );
}