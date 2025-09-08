"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
const getPostTimestamp = (post) => {
  if (!post || !post._id) return Date.now();
  

  if (typeof post._id === 'string') {
    const timestamp = parseInt(post._id.substring(0, 8), 16) * 1000;
    return timestamp;
  } else if (post._id.getTimestamp && typeof post._id.getTimestamp === 'function') {
    return post._id.getTimestamp().getTime();
  } else if (post.timestamp) {
    return new Date(post.timestamp).getTime();
  }
  return Date.now();
};

const calculateRelativeTime = (timestamp) => {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - postDate) / 1000);
  
  if (diffInSeconds < 60) {
    return "just now";
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  }
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
};

const PostCard = ({post}) => {
    const [relativeTime, setRelativeTime] = useState("just now");

  const postTimestamp = getPostTimestamp(post);

  useEffect(() => {
    const updateTime = () => {
      setRelativeTime(calculateRelativeTime(postTimestamp));
    };
    
    updateTime(); 
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [postTimestamp]);
  return (
        <div className="border border-slate-300 border-dashed p-2 rounded-md h-full">
            <p className="text-teal-400 text-sm font-semibold"> Posted {relativeTime}</p>
            <Link href={`/posts/show/${post._id?.toString()}`} className="block text-xl font-bold">{post.title}</Link>
            <p className="text-sm">{post.content}</p>
        </div>
  )
}

export default PostCard