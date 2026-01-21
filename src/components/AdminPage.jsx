import { useState, useEffect } from "react";
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
  BookOpen,
  Loader2
} from "lucide-react";

const API_BASE_URL = "https://club-website-backend.onrender.com";

export default function AdminPage() {
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventType, setNewEventType] = useState("");
  const [newEventCapacity, setNewEventCapacity] = useState("");
  const [currentEvents, setCurrentEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);

  // Settings state
  const [openMembership, setOpenMembership] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [publicEventListings, setPublicEventListings] = useState(true);
  const [maxEventCapacity, setMaxEventCapacity] = useState("200");
  const [registrationDeadline, setRegistrationDeadline] = useState("3");

  const memberRequests = [
    { id: 1, name: "John Smith", email: "john.smith@student.edu", major: "Computer Science", year: "Junior", status: "pending" },
    { id: 2, name: "Alice Brown", email: "alice.brown@student.edu", major: "Mathematics", year: "Sophomore", status: "pending" },
    { id: 3, name: "Robert Lee", email: "robert.lee@student.edu", major: "Physics", year: "Senior", status: "pending" }
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/events`);

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched events data:", data);

      // Normalize events to ensure they have an id property
      const normalizedData = data.map(event => ({
        ...event,
        id: event.id || event._id
      }));

      // Filter only upcoming events for admin view
      const now = new Date();
      const upcoming = normalizedData.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now;
      });
      upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

      console.log("Upcoming events for admin:", upcoming);
      setCurrentEvents(upcoming);
    } catch (err) {
      console.error("Error fetching events:", err);
      setCurrentEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const [stats, setStats] = useState([
    { label: "Total Members", value: "45", change: "+3 this month" },
    { label: "Active Events", value: "0", change: "Loading..." },
    { label: "Total Registrations", value: "0", change: "Loading..." },
    { label: "Papers Published", value: "23", change: "+1 this month" }
  ]);

  useEffect(() => {
    if (currentEvents.length > 0) {
      const totalRegistrations = currentEvents.reduce((sum, event) => sum + (event.registrations || 0), 0);
      setStats([
        { label: "Total Members", value: "45", change: "+3 this month" },
        { label: "Active Events", value: currentEvents.length.toString(), change: "Upcoming events" },
        { label: "Total Registrations", value: totalRegistrations.toString(), change: "Across all events" },
        { label: "Papers Published", value: "23", change: "+1 this month" }
      ]);
    }
  }, [currentEvents]);

  const resetForm = () => {
    setNewEventTitle("");
    setNewEventDate("");
    setNewEventTime("");
    setNewEventLocation("");
    setNewEventDescription("");
    setNewEventType("");
    setNewEventCapacity("");
    setEditingEventId(null);
  };

  const handleCreateEvent = async () => {
    if (!newEventTitle || !newEventDate || !newEventTime || !newEventLocation || !newEventType) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setCreating(true);
      const eventData = {
        title: newEventTitle,
        date: newEventDate,
        time: newEventTime,
        location: newEventLocation,
        description: newEventDescription,
        type: newEventType.charAt(0).toUpperCase() + newEventType.slice(1), // Capitalize first letter
        capacity: parseInt(newEventCapacity) || 0,
        featured: false, // Default to not featured
        registrationOpen: true
      };

      let response;
      if (editingEventId) {
        // Update existing event
        const eventIdStr = String(editingEventId);
        console.log(`Attempting to update event with ID: ${eventIdStr} (type: ${typeof editingEventId})`, eventData);
        response = await fetch(`${API_BASE_URL}/api/events/${eventIdStr}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });
      } else {
        // Create new event
        console.log("Creating new event:", eventData);
        response = await fetch(`${API_BASE_URL}/api/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });
      }

      console.log(`Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `Server returned ${response.status}: ${response.statusText}`
        }));
        throw new Error(errorData.message || `Failed to ${editingEventId ? 'update' : 'create'} event`);
      }

      const result = await response.json().catch(() => ({}));
      console.log(`${editingEventId ? 'Update' : 'Create'} successful:`, result);

      alert(`Event ${editingEventId ? 'updated' : 'created'} successfully!`);

      // Reset form
      resetForm();

      // Refresh events list
      fetchEvents();
    } catch (err) {
      console.error(`Error ${editingEventId ? 'updating' : 'creating'} event:`, err);
      alert(`Failed to ${editingEventId ? 'update' : 'create'} event: ${err.message}. Please check the console for details.`);
    } finally {
      setCreating(false);
    }
  };

  const handleApproveMember = (memberId) => {
    console.log("Approving member:", memberId);
    alert("Member approved successfully!");
  };

  const handleDeclineMember = (memberId) => {
    console.log("Declining member:", memberId);
    alert("Member request declined.");
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    // Convert date to YYYY-MM-DD format for input type="date"
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleEditEvent = (eventId) => {
    if (!eventId) {
      console.error("Edit event called without event ID");
      alert("Error: Event ID is missing. Cannot edit event.");
      return;
    }

    // Find the event and populate the form
    const event = currentEvents.find(e => e.id === eventId);
    if (!event) {
      console.error(`Event with ID ${eventId} not found in currentEvents:`, currentEvents);
      alert("Error: Event not found. Please refresh the page and try again.");
      return;
    }

    console.log("Editing event:", event);
    setNewEventTitle(event.title || "");
    setNewEventDate(formatDateForInput(event.date));
    setNewEventTime(event.time || "");
    setNewEventLocation(event.location || "");
    setNewEventDescription(event.description || "");
    setNewEventType(event.type ? event.type.toLowerCase() : "");
    setNewEventCapacity(event.capacity?.toString() || "");
    setEditingEventId(eventId);

    // Scroll to form
    setTimeout(() => {
      document.getElementById("event-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDeleteEvent = async (eventId) => {
    if (!eventId && eventId !== 0) {
      alert("Error: Event ID is missing. Cannot delete event.");
      console.error("Delete event called without event ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      // Ensure eventId is a string for the URL
      const eventIdStr = String(eventId);
      console.log(`Attempting to delete event with ID: ${eventIdStr} (type: ${typeof eventId})`);

      const response = await fetch(`${API_BASE_URL}/api/events/${eventIdStr}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(`Delete response status: ${response.status} ${response.statusText}`);
      console.log(`Delete response headers:`, Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorMessage = `Server returned ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
        }
        throw new Error(errorMessage);
      }

      // Try to parse response, but it might be empty
      try {
        const result = await response.json();
        console.log("Delete successful:", result);
      } catch (e) {
        console.log("Delete successful (no response body)");
      }

      alert("Event deleted successfully!");
      // Refresh events list
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
      console.error("Full error details:", {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
      alert(`Failed to delete event: ${err.message}\n\nPlease check:\n1. Server is accessible\n2. Server supports DELETE method\n3. Check browser console for details`);
    }
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
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Events Management */}
        <TabsContent value="events" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Create/Edit Event */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {editingEventId ? (
                    <>
                      <Edit className="h-5 w-5" />
                      <span>Edit Event</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      <span>Create New Event</span>
                    </>
                  )}
                </CardTitle>
                <CardDescription>
                  {editingEventId ? "Update event details" : "Add a new event for club members"}
                </CardDescription>
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

                <div className="flex space-x-2">
                  {editingEventId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="flex-1"
                      disabled={creating}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    onClick={handleCreateEvent}
                    className={editingEventId ? "flex-1" : "w-full"}
                    disabled={creating}
                  >
                    {creating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {editingEventId ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      editingEventId ? "Update Event" : "Create Event"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Events */}
            <Card>
              <CardHeader>
                <CardTitle>Current Events</CardTitle>
                <CardDescription>Manage existing events and registrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : currentEvents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No upcoming events. Create your first event!</p>
                  </div>
                ) : (
                  currentEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <span>{event.registrations || 0}/{event.capacity || 0} registered</span>
                          <Badge variant="secondary">{event.registrationOpen ? "Active" : "Closed"}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            console.log("Edit button clicked for event:", event);
                            handleEditEvent(event.id);
                          }}
                          title="Edit event"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            console.log("Delete button clicked for event:", event);
                            handleDeleteEvent(event.id);
                          }}
                          title="Delete event"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Members Management */}
        <TabsContent value="members" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Membership Requests */}
            <Card>
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
                      <Button size="sm" variant="default" onClick={() => handleApproveMember(request.id)}>
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeclineMember(request.id)}>
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Member Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Member Management</CardTitle>
                <CardDescription>Tools for managing current members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" onClick={() => alert("Newsletter will be sent to all members!")}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Newsletter to All Members
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => alert("Member list exported successfully!")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Member List
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => alert("Viewing all members...")}>
                  <Users className="h-4 w-4 mr-2" />
                  View All Members
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => alert("Add member form will open...")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member Manually
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
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
                  <Button variant="outline" onClick={() => alert("Full analytics dashboard will open...")}>
                    View Full Analytics
                  </Button>
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
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings" className="space-y-6">
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
                  <Switch checked={openMembership} onCheckedChange={setOpenMembership} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send automatic event reminders</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Event Listings</Label>
                    <p className="text-sm text-muted-foreground">Make events visible to non-members</p>
                  </div>
                  <Switch checked={publicEventListings} onCheckedChange={setPublicEventListings} />
                </div>

                <div className="space-y-2">
                  <Label>Maximum Event Capacity</Label>
                  <Input
                    type="number"
                    value={maxEventCapacity}
                    onChange={(e) => setMaxEventCapacity(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Registration Deadline (days before event)</Label>
                  <Input
                    type="number"
                    value={registrationDeadline}
                    onChange={(e) => setRegistrationDeadline(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
                <CardDescription>Administrative tools and backups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => alert("Backing up club data...")}>
                  <Download className="h-4 w-4 mr-2" />
                  Backup Club Data
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => alert("Exporting event reports...")}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Export Event Reports
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => alert("Opening email template configuration...")}>
                  <Mail className="h-4 w-4 mr-2" />
                  Configure Email Templates
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => alert("Opening advanced settings...")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}