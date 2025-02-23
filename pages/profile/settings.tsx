"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfileSettings() {
  const router = useRouter(); // Initialize the router

  // State to track user profile fields
  const [profile, setProfile] = useState({
    doctorID: "123456",
    name: "Dr. John Doe",
    email: "johndoe@example.com",
    phone: "+1 (123) 456-7890",
    location: "Naples, Florida",
    residency: "Gastroenterology",
    yearsCompleted: "2015 - 2018",
  });

  const [isSaved, setIsSaved] = useState(false);

  // Load stored profile from localStorage on mount
  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  // Save profile to localStorage and navigate to Profile page
  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profile));
    setIsSaved(true);

    // Navigate back to the Profile page
    setTimeout(() => {
      router.push("/profile"); // Change this if your profile page has a different route
    }, 500); // Short Delay 
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Doctor ID</label>
          <Input name="doctorID" value={profile.doctorID} onChange={handleChange} disabled />
        </div>

        <div>
          <label className="text-sm font-medium">Name</label>
          <Input name="name" value={profile.name} onChange={handleChange} />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <Input name="email" value={profile.email} onChange={handleChange} />
        </div>

        <div>
          <label className="text-sm font-medium">Phone</label>
          <Input name="phone" value={profile.phone} onChange={handleChange} />
        </div>

        <div>
          <label className="text-sm font-medium">Location</label>
          <Input name="location" value={profile.location} onChange={handleChange} />
        </div>

        <div>
          <label className="text-sm font-medium">Residency</label>
          <Input name="residency" value={profile.residency} onChange={handleChange} />
        </div>

        <div>
          <label className="text-sm font-medium">Years Completed</label>
          <Input name="yearsCompleted" value={profile.yearsCompleted} onChange={handleChange} />
        </div>

        <Button className="mt-4 w-full" onClick={handleSave}>
          Save Changes
        </Button>

        {isSaved && <p className="text-green-500 text-sm mt-2">Profile saved! Redirecting...</p>}
      </div>
    </div>
  );
}

