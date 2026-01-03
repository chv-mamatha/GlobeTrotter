import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark, User, Plus, Send, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import parisImage from "@/assets/destination-paris.jpg";
import tokyoImage from "@/assets/destination-tokyo.jpg";
import baliImage from "@/assets/destination-bali.jpg";

interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

interface CommunityPost {
  id: string;
  user: {
    name: string;
    avatar: string | null;
  };
  title: string;
  content: string;
  destination: string;
  image?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: string;
}

const initialPosts: CommunityPost[] = [
  {
    id: "1",
    user: { name: "Sarah Johnson", avatar: null },
    title: "Amazing Japan Adventure",
    content: "Just got back from an amazing 2-week trip to Japan! Tokyo was incredible - the perfect blend of ancient traditions and modern innovation. Pro tip: Get a JR Pass, it saves so much on travel between cities! 🇯🇵✨",
    destination: "Tokyo, Japan",
    image: tokyoImage,
    likes: 342,
    comments: [
      { id: "c1", author: "Mike Chen", text: "Looks amazing! How was the food?", timestamp: "1 hour ago" },
      { id: "c2", author: "Emma Wilson", text: "I'm planning a trip there next year!", timestamp: "30 minutes ago" }
    ],
    shares: 15,
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: { name: "Mike Chen", avatar: null },
    title: "Paris Winter Magic",
    content: "Paris in winter hits different. Less crowds, cheaper hotels, and the city looks magical with holiday lights. The Louvre was practically empty - I spent 4 hours just wandering around! 🗼",
    destination: "Paris, France",
    image: parisImage,
    likes: 521,
    comments: [
      { id: "c3", author: "Sarah Johnson", text: "Winter in Paris sounds perfect!", timestamp: "2 hours ago" }
    ],
    shares: 32,
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    user: { name: "Emma Wilson", avatar: null },
    title: "Bali Paradise",
    content: "Bali exceeded all my expectations! The rice terraces in Ubud are breathtaking, and the local people are so welcoming. If you're planning a trip, don't miss the sunrise at Mount Batur - it's life-changing! 🌅",
    destination: "Bali, Indonesia",
    image: baliImage,
    likes: 289,
    comments: [],
    shares: 8,
    timestamp: "1 day ago",
  },
];

export default function Community() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", destination: "", image: "" });
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const currentUser = "John Doe";

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('communityPosts');
    const savedLikes = localStorage.getItem('likedPosts');
    const savedBookmarks = localStorage.getItem('savedPosts');
    
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(initialPosts);
    }
    
    if (savedLikes) {
      setLikedPosts(JSON.parse(savedLikes));
    }
    
    if (savedBookmarks) {
      setSavedPosts(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('communityPosts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }, [savedPosts]);

  const toggleLike = (postId: string) => {
    const isLiked = likedPosts.includes(postId);
    
    // Prevent multiple likes by same user
    if (isLiked) {
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes - 1 }
          : post
      ));
      setLikedPosts(prev => prev.filter(id => id !== postId));
    } else {
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      ));
      setLikedPosts(prev => [...prev, postId]);
    }
  };

  const toggleSave = (postId: string) => {
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const addComment = (postId: string) => {
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: currentUser,
      text: commentText,
      timestamp: "Just now"
    };

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));

    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
  };

  const createPost = () => {
    if (!newPost.content.trim() || !newPost.title.trim() || !newPost.destination.trim()) return;

    const post: CommunityPost = {
      id: Date.now().toString(),
      user: { name: currentUser, avatar: null },
      title: newPost.title,
      content: newPost.content,
      destination: newPost.destination,
      image: newPost.image || undefined,
      likes: 0,
      comments: [],
      shares: 0,
      timestamp: "Just now"
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: "", content: "", destination: "", image: "" });
    setShowCreatePost(false);
  };

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            Community
          </h1>
          <p className="text-muted-foreground">
            Share your travel experiences and discover inspiration from fellow travelers
          </p>
        </motion.div>

        {/* Search */}
        <div className="mb-8">
          <SearchBar placeholder="Search posts, destinations, or travelers..." />
        </div>

        {/* Create Post */}
        <div className="mb-8">
          <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground">Share your travel story...</p>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share Your Travel Experience</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                />
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <Input
                    placeholder="Destination"
                    value={newPost.destination}
                    onChange={(e) => setNewPost(prev => ({ ...prev, destination: e.target.value }))}
                    className="flex-1"
                  />
                </div>
                <Textarea
                  placeholder="Share your travel story..."
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                />
                <Input
                  placeholder="Image URL (optional)"
                  value={newPost.image}
                  onChange={(e) => setNewPost(prev => ({ ...prev, image: e.target.value }))}
                />
                <Button onClick={createPost} className="w-full">
                  Share Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{post.user.name}</p>
                  <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                </div>
                <Badge variant="outline">{post.destination}</Badge>
              </div>

              {/* Post Content */}
              <div className="px-4 pb-4">
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-foreground/90 leading-relaxed">{post.content}</p>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="relative aspect-video">
                  <img
                    src={post.image}
                    alt={post.destination}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      likedPosts.includes(post.id) 
                        ? 'text-red-500 scale-105' 
                        : 'text-muted-foreground hover:text-red-500 hover:scale-105'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button 
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm">{post.comments.length}</span>
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="h-5 w-5" />
                    <span className="text-sm">{post.shares}</span>
                  </button>
                </div>
                <button
                  onClick={() => toggleSave(post.id)}
                  className={`transition-colors ${
                    savedPosts.includes(post.id) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${savedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Comments */}
              {expandedComments[post.id] && (
                <div className="border-t border-border px-4 py-3">
                  {post.comments.length > 0 ? (
                    <div className="space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">
                              <span className="font-medium">{comment.author}</span>{" "}
                              {comment.text}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{comment.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm text-center py-4">No comments yet. Be the first to comment!</p>
                  )}
                </div>
              )}

              {/* Add Comment */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && addComment(post.id)}
                  />
                  <Button size="sm" onClick={() => addComment(post.id)}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Layout>
  );
}