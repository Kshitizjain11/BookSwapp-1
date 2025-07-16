'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/context/wallet-context';
import { 
  User, 
  Wallet, 
  ShoppingBag, 
  BookOpen, 
  MessageCircle,
  Star,
  Award,
  TrendingUp,
  Leaf,
  Calendar,
  Mail,
  Phone,
  Edit,
  CreditCard
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { balance } = useWallet();
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    profileImage: '',
    joinDate: '2024-01-15',
    sellerRating: 4.8,
    buyerRating: 4.9
  });

  const [activityStats, setActivityStats] = useState({
    booksBought: 24,
    booksRented: 18,
    booksSold: 12,
    moneySaved: 450,
    ecoPoints: 85
  });

  // Load user profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const recentActivity = [
    {
      id: 1,
      type: 'purchase',
      book: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      amount: 15.99,
      date: '2024-01-20',
      image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=100&h=150&fit=crop'
    },
    {
      id: 2,
      type: 'rental',
      book: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      amount: 5.99,
      date: '2024-01-18',
      image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=100&h=150&fit=crop'
    },
    {
      id: 3,
      type: 'sale',
      book: '1984',
      author: 'George Orwell',
      amount: 12.50,
      date: '2024-01-15',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=100&h=150&fit=crop'
    }
  ];

  const recentReviews = [
    {
      id: 1,
      reviewer: 'Alice Johnson',
      rating: 5,
      comment: 'Great seller! Book was in excellent condition.',
      type: 'seller',
      date: '2024-01-19'
    },
    {
      id: 2,
      reviewer: 'Bob Smith',
      rating: 4,
      comment: 'Quick buyer, smooth transaction.',
      type: 'buyer',
      date: '2024-01-17'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Purchase',
      description: 'Made your first book purchase',
      icon: ShoppingBag,
      earned: true,
      progress: 100
    },
    {
      id: 2,
      title: 'Eco Warrior',
      description: 'Saved 100 books from waste',
      icon: Leaf,
      earned: false,
      progress: 85
    },
    {
      id: 3,
      title: 'Community Helper',
      description: 'Helped 50 fellow readers',
      icon: Award,
      earned: true,
      progress: 100
    },
    {
      id: 4,
      title: 'Book Collector',
      description: 'Own 100+ books',
      icon: BookOpen,
      earned: false,
      progress: 24
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <ShoppingBag className="w-4 h-4 text-green-600" />;
      case 'rental': return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'sale': return <TrendingUp className="w-4 h-4 text-amber-600" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'text-green-600';
      case 'rental': return 'text-blue-600';
      case 'sale': return 'text-amber-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src={userProfile.profileImage} alt={userProfile.name} />
              <AvatarFallback className="text-2xl bg-amber-700">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">{userProfile.name}</h1>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 text-amber-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{userProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {new Date(userProfile.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{userProfile.sellerRating} Seller</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{userProfile.buyerRating} Buyer</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => router.push('/settings')}
              variant="secondary"
              className="bg-white text-amber-600 hover:bg-amber-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Wallet Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-amber-600" />
                  Wallet Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Balance</p>
                    <p className="text-3xl font-bold text-amber-600">${balance.toFixed(2)}</p>
                  </div>
                  <Button 
                    onClick={() => router.push('/wallet')}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Recharge Wallet
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Activity Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <ShoppingBag className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">{activityStats.booksBought}</p>
                    <p className="text-sm text-gray-600">Books Bought</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">{activityStats.booksRented}</p>
                    <p className="text-sm text-gray-600">Books Rented</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-amber-600">{activityStats.booksSold}</p>
                    <p className="text-sm text-gray-600">Books Sold</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Leaf className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">{activityStats.ecoPoints}</p>
                    <p className="text-sm text-gray-600">Eco Points</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">Money Saved: ${activityStats.moneySaved}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Leaf className="w-3 h-3 mr-1" />
                    Eco-Friendly Reader
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img 
                        src={activity.image} 
                        alt={activity.book}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getActivityIcon(activity.type)}
                          <span className="font-medium">{activity.book}</span>
                        </div>
                        <p className="text-sm text-gray-600">by {activity.author}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                      <div className={`text-right ${getActivityColor(activity.type)}`}>
                        <p className="font-semibold">
                          {activity.type === 'sale' ? '+' : '-'}${activity.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ratings & Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  Recent Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.reviewer}</span>
                          <Badge variant={review.type === 'seller' ? 'default' : 'secondary'}>
                            {review.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                      <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/my-orders')}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  My Orders
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/my-rentals')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  My Rentals
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/community')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  My Chats
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={achievement.id} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${achievement.earned ? 'bg-amber-100' : 'bg-gray-100'}`}>
                          <IconComponent className={`w-4 h-4 ${achievement.earned ? 'text-amber-600' : 'text-gray-400'}`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{achievement.title}</p>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                        </div>
                        {achievement.earned && (
                          <Badge className="bg-amber-100 text-amber-800">
                            Earned
                          </Badge>
                        )}
                      </div>
                      {!achievement.earned && (
                        <Progress value={achievement.progress} className="h-2" />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}