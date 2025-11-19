import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { 
  Users, 
  Calendar, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Mail,
  Download,
  BarChart3,
  BookOpen
} from "lucide-react";

export default function AdminPage() {
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventType, setNewEventType] = useState("");
  const [newEventCapacity, setNewEventCapacity] = useState("");

  const memberRequests = [
    { id: 1, name: "John Smith", email: "john.smith@student.edu", major: "Computer Science", year: "Junior", status: "pending" },
    { id: 2, name: "Alice Brown", email: "alice.brown@student.edu", major: "Mathematics", year: "Sophomore", status: "pending" },
    { id: 3, name: "Robert Lee", email: "robert.lee@student.edu", major: "Physics", year: "Senior", status: "pending" }
  ];

  const currentEvents = [
    { id: 1, title: "ML Research Symposium", date: "2024-04-15", registrations: 87, capacity: 150, status: "active" },
    { id: 2, title: "Peer Review Workshop", date: "2024-04-22", registrations: 23, capacity: 30, status: "active" },
    { id: 3, title: "Guest Lecture: Dr. Kim", date: "2024-04-28", registrations: 156, capacity: 200, status: "active" }
  ];

  const stats = [
    { label: "Total Members", value: "45", change: "+3 this month" },
    { label: "Active Events", value: "6", change: "+2 this week" },
    { label: "Total Registrations", value: "266", change: "+34 this week" },
    { label: "Papers Published", value: "23", change: "+1 this month" }
  ];

  const handleCreateEvent = () => {
    // Mock event creation
    console.log("Creating event:", {
      title: newEventTitle,
      date: newEventDate,
      time: newEventTime,
      location: newEventLocation,
      description: newEventDescription,
      type: newEventType,
      capacity: newEventCapacity
    });
    
    // Reset form
    setNewEventTitle("");
    setNewEventDate("");
    setNewEventTime("");
    setNewEventLocation("");
    setNewEventDescription("");
    setNewEventType("");
    setNewEventCapacity("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage club activities, members, and events</p>
        </div>
        <Badge variant="outline" className="text-sm">
          Admin Access
        </Badge>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-sm font-medium">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="events" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="events" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Members</span>
          </TabsTrigger>
          {/* <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger> */}
          {/* <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger> */}
        </TabsList>

        {/* Events Management */}
        <TabsContent value="events" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Create New Event */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Create New Event</span>
                </CardTitle>
                <CardDescription>Add a new event for club members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input 
                    id="event-title"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="Enter event title"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Date</Label>
                    <Input 
                      id="event-date"
                      type="date"
                      value={newEventDate}
                      onChange={(e) => setNewEventDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-time">Time</Label>
                    <Input 
                      id="event-time"
                      type="time"
                      value={newEventTime}
                      onChange={(e) => setNewEventTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-location">Location</Label>
                  <Input 
                    id="event-location"
                    value={newEventLocation}
                    onChange={(e) => setNewEventLocation(e.target.value)}
                    placeholder="Enter event location"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-type">Event Type</Label>
                    <Select value={newEventType} onValueChange={setNewEventType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="lecture">Lecture</SelectItem>
                        <SelectItem value="symposium">Symposium</SelectItem>
                        <SelectItem value="presentation">Presentation</SelectItem>
                        <SelectItem value="bootcamp">Bootcamp</SelectItem>
                        <SelectItem value="showcase">Showcase</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-capacity">Capacity</Label>
                    <Input 
                      id="event-capacity"
                      type="number"
                      value={newEventCapacity}
                      onChange={(e) => setNewEventCapacity(e.target.value)}
                      placeholder="Max attendees"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-description">Description</Label>
                  <Textarea 
                    id="event-description"
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}
                    placeholder="Enter event description"
                    rows={3}
                  />
                </div>

                <Button onClick={handleCreateEvent} className="w-full">
                  Create Event
                </Button>
              </CardContent>
            </Card>

            {/* Current Events */}
            <Card>
              <CardHeader>
                <CardTitle>Current Events</CardTitle>
                <CardDescription>Manage existing events and registrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span>{event.registrations}/{event.capacity} registered</span>
                        <Badge variant="secondary">{event.status}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Members Management */}
        {/* <TabsContent value="members" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6"> */}
            { /* Membership Requests */ }
            {/* <Card>
              <CardHeader>
                <CardTitle>Membership Requests</CardTitle>
                <CardDescription>Review and approve new member applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {memberRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{request.name}</h4>
                      <p className="text-sm text-muted-foreground">{request.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.year} • {request.major}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="default">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card> */}

            {/* Member Actions */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Member Management</CardTitle>
                <CardDescription>Tools for managing current members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Newsletter to All Members
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Member List
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  View All Members
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member Manually
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}

        {/* Analytics */}
        {/* <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Analytics</CardTitle>
                <CardDescription>Track event performance and attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 space-y-4">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Detailed Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      View attendance trends, member engagement, and event performance metrics.
                    </p>
                  </div>
                  <Button variant="outline">View Full Analytics</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Member Engagement</CardTitle>
                <CardDescription>Track member activity and participation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Members</span>
                    <span className="font-medium">38/45 (84%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg. Event Attendance</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Papers Submitted</span>
                    <span className="font-medium">23 this semester</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Workshop Completion</span>
                    <span className="font-medium">91%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}

        {/* Settings */}
        {/* <TabsContent value="settings" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Club Settings</CardTitle>
                <CardDescription>Configure club preferences and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Open Membership</Label>
                    <p className="text-sm text-muted-foreground">Allow new members to join automatically</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send automatic event reminders</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Event Listings</Label>
                    <p className="text-sm text-muted-foreground">Make events visible to non-members</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Maximum Event Capacity</Label>
                  <Input type="number" defaultValue="200" />
                </div>

                <div className="space-y-2">
                  <Label>Registration Deadline (days before event)</Label>
                  <Input type="number" defaultValue="3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
                <CardDescription>Administrative tools and backups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Backup Club Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Export Event Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Configure Email Templates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}