"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Bell,
  Shield,
  Package,
  Palette,
  Settings as SettingsIcon,
  Camera,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  MessageSquare,
  MapPin,
  Download,
  Trash2,
  Moon,
  Sun,
  Monitor,
  Lock,
  Key,
  Search,
  Filter,
  Calendar,
  BookText,
  LogOut,
  Plus,
  X,
  Check,
} from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "January 2024",
  totalOrders: 12,
  totalRentals: 8,
}

// Mock saved searches
const mockSavedSearches = [
  { id: 1, name: "Science Fiction Books", query: "genre:sci-fi", count: 45 },
  { id: 2, name: "Under $15", query: "price:<15", count: 123 },
  { id: 3, name: "Local Pickup Only", query: "pickup:true", count: 67 },
]

// Mock devices
const mockDevices = [
  { id: 1, name: "iPhone 15 Pro", location: "New York, NY", lastActive: "Active now", current: true },
  { id: 2, name: "MacBook Pro", location: "New York, NY", lastActive: "2 hours ago", current: false },
  { id: 3, name: "iPad Air", location: "Brooklyn, NY", lastActive: "1 day ago", current: false },
]

const accentColors = [
  { name: "Amber", value: "amber", color: "bg-amber-500" },
  { name: "Blue", value: "blue", color: "bg-blue-500" },
  { name: "Green", value: "green", color: "bg-green-500" },
  { name: "Purple", value: "purple", color: "bg-purple-500" },
  { name: "Red", value: "red", color: "bg-red-500" },
  { name: "Pink", value: "pink", color: "bg-pink-500" },
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [user, setUser] = useState(mockUser)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedAccentColor, setSelectedAccentColor] = useState("amber")
  const [savedSearches, setSavedSearches] = useState(mockSavedSearches)
  const [devices, setDevices] = useState(mockDevices)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    orderUpdates: true,
    rentalReminders: true,
    priceAlerts: true,
    newMessages: true,
    communityUpdates: false,
  })

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    showLocationOnMap: true,
    allowDirectChat: true,
    profileVisibility: "public",
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const handleProfileUpdate = () => {
    // Update profile page data
    const profileData = JSON.parse(localStorage.getItem("userProfile") || "{}")
    const updatedProfileData = { 
      ...profileData, 
      name: user.name,
      email: user.email,
      phone: user.phone
    }
    localStorage.setItem("userProfile", JSON.stringify(updatedProfileData))
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
    setIsEditingProfile(false)
  }

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    })
    setPasswords({ current: "", new: "", confirm: "" })
  }

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUser({ ...user, avatar: e.target?.result as string })
        // Also update the profile page data
        const profileData = JSON.parse(localStorage.getItem("userProfile") || "{}")
        const updatedProfileData = { ...profileData, avatar: e.target?.result as string }
        localStorage.setItem("userProfile", JSON.stringify(updatedProfileData))
        
        toast({
          title: "Profile Picture Updated",
          description: "Your profile picture has been changed successfully.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export will be emailed to you within 24 hours.",
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Your account deletion request has been submitted. You'll receive a confirmation email.",
      variant: "destructive",
    })
  }

  const removeSavedSearch = (id: number) => {
    setSavedSearches(savedSearches.filter(search => search.id !== id))
    toast({
      title: "Search Removed",
      description: "Saved search has been deleted.",
    })
  }

  const removeDevice = (id: number) => {
    setDevices(devices.filter(device => device.id !== id))
    toast({
      title: "Device Removed",
      description: "Device has been signed out successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <SettingsIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Advanced</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Management */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-transparent"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Change Picture
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="hidden"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      JPG, PNG or GIF. Max size 5MB.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      disabled={!isEditingProfile}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      disabled={!isEditingProfile}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={user.phone}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      disabled={!isEditingProfile}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Member Since</Label>
                    <Input value={user.joinDate} disabled />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  {isEditingProfile ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleProfileUpdate} className="bg-amber-600 hover:bg-amber-700">
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditingProfile(true)} className="bg-amber-600 hover:bg-amber-700">
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showNewPassword ? "text" : "password"}
                        value={passwords.new}
                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handlePasswordChange} className="bg-amber-600 hover:bg-amber-700">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Communication Methods */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Communication Methods</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive important updates via SMS</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Notification Types */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">What to Notify About</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-muted-foreground">Status changes for your orders</p>
                      </div>
                      <Switch
                        checked={notifications.orderUpdates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Rental Reminders</p>
                        <p className="text-sm text-muted-foreground">Due date reminders for rented books</p>
                      </div>
                      <Switch
                        checked={notifications.rentalReminders}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, rentalReminders: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Price Alerts</p>
                        <p className="text-sm text-muted-foreground">Price drops on your wishlist items</p>
                      </div>
                      <Switch
                        checked={notifications.priceAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, priceAlerts: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Messages</p>
                        <p className="text-sm text-muted-foreground">Messages from other users</p>
                      </div>
                      <Switch
                        checked={notifications.newMessages}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, newMessages: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Community Updates</p>
                        <p className="text-sm text-muted-foreground">New posts and discussions</p>
                      </div>
                      <Switch
                        checked={notifications.communityUpdates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, communityUpdates: checked })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Show Location on Map</p>
                        <p className="text-sm text-muted-foreground">Allow others to see your general location</p>
                      </div>
                    </div>
                    <Switch
                      checked={privacy.showLocationOnMap}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showLocationOnMap: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Allow Direct Chat</p>
                        <p className="text-sm text-muted-foreground">Let other users message you directly</p>
                      </div>
                    </div>
                    <Switch
                      checked={privacy.allowDirectChat}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, allowDirectChat: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-sm text-muted-foreground">Who can see your profile information</p>
                    </div>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Data Management */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Data Management</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Download className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Export My Data</p>
                          <p className="text-sm text-muted-foreground">Download a copy of your data</p>
                        </div>
                      </div>
                      <Button variant="outline" onClick={handleExportData} className="bg-transparent">
                        Export
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Trash2 className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="font-medium text-red-600">Delete My Account</p>
                          <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                        </div>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders & Rentals */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Orders & Rentals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <Package className="w-8 h-8 text-amber-600" />
                      <div>
                        <h3 className="text-lg font-semibold">My Orders</h3>
                        <p className="text-sm text-muted-foreground">View and track your purchases</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-amber-600">{user.totalOrders}</span>
                      <span className="text-sm text-muted-foreground">Total Orders</span>
                    </div>
                    <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
                      <Link href="/my-orders">View Orders</Link>
                    </Button>
                  </div>

                  <div className="p-6 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <BookText className="w-8 h-8 text-green-600" />
                      <div>
                        <h3 className="text-lg font-semibold">My Rentals</h3>
                        <p className="text-sm text-muted-foreground">Manage your rented books</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-600">{user.totalRentals}</span>
                      <span className="text-sm text-muted-foreground">Total Rentals</span>
                    </div>
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                      <Link href="/my-rentals">View Rentals</Link>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button asChild variant="outline" className="h-auto p-4 bg-transparent">
                    <Link href="/wishlist" className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-lg">♥</span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Wishlist</p>
                        <p className="text-sm text-muted-foreground">Books you want to buy later</p>
                      </div>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="h-auto p-4 bg-transparent">
                    <Link href="/wallet" className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-600 text-lg">$</span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Wallet</p>
                        <p className="text-sm text-muted-foreground">Manage your wallet balance</p>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Selection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      onClick={() => setTheme("light")}
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                    >
                      <Sun className="w-6 h-6" />
                      <span>Light</span>
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      onClick={() => setTheme("dark")}
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                    >
                      <Moon className="w-6 h-6" />
                      <span>Dark</span>
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      onClick={() => setTheme("system")}
                      className="h-auto p-4 flex flex-col items-center space-y-2"
                    >
                      <Monitor className="w-6 h-6" />
                      <span>System</span>
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Accent Color */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Accent Color</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {accentColors.map((color) => (
                      <Button
                        key={color.value}
                        variant="outline"
                        onClick={() => setSelectedAccentColor(color.value)}
                        className={`h-auto p-3 flex flex-col items-center space-y-2 ${
                          selectedAccentColor === color.value ? "ring-2 ring-offset-2 ring-amber-500" : ""
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full ${color.color}`} />
                        <span className="text-xs">{color.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            {/* Device Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Device Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            {device.name}
                            {device.current && <Badge className="bg-green-100 text-green-800">Current</Badge>}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {device.location} • {device.lastActive}
                          </p>
                        </div>
                      </div>
                      {!device.current && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeDevice(device.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                        >
                          <LogOut className="w-4 h-4 mr-1" />
                          Sign Out
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Saved Searches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Saved Searches & Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedSearches.map((search) => (
                    <div key={search.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Filter className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{search.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {search.count} results • {search.query}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSavedSearch(search.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {savedSearches.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No saved searches yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Two-Factor Authentication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={twoFactorEnabled}
                      onCheckedChange={setTwoFactorEnabled}
                    />
                    {twoFactorEnabled && (
                      <Badge className="bg-green-100 text-green-800">
                        <Check className="w-3 h-3 mr-1" />
                        Enabled
                      </Badge>
                    )}
                  </div>
                </div>
                {twoFactorEnabled && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      Two-factor authentication is enabled. You'll need to enter a code from your authenticator app when signing in.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}