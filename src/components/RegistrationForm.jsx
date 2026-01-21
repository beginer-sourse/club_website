import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X, Loader2 } from "lucide-react";

const API_BASE_URL = "https://club-website-backend.onrender.com";

export default function RegistrationForm({ event, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email ID is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/events/${event.id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          mobileNumber: formData.mobileNumber.trim() || null
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register for the event");
      }

      const result = await response.json();

      // Show success message
      alert(`Successfully registered for "${event.title}"!\n\nRegistration Details:\nName: ${formData.name}\nEmail: ${formData.email}${formData.mobileNumber ? `\nMobile: ${formData.mobileNumber}` : ''}`);

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobileNumber: ""
      });
      setErrors({});

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Close the form
      if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error("Error registering for event:", err);
      alert(err.message || "Failed to register. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Card className="mt-4 border-2">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Register for Event</CardTitle>
            <CardDescription>{event.title}</CardDescription>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={errors.name ? "border-destructive" : ""}
              required
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email ID <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
              required
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              type="tel"
              placeholder="Enter your mobile number (optional)"
              value={formData.mobileNumber}
              onChange={(e) => handleChange("mobileNumber", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Optional</p>
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
