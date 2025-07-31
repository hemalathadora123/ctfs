'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import BlogPost from '../components/BlogPost'
import { BlogPost as BlogPostType } from '../types/blog'

export default function WriteUpsPage() {
  const [posts, setPosts] = useState<BlogPostType[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties')

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      // Filter posts to only show CTF writeups
      const writeups = data.filter((post: BlogPostType) => 
        ['Web', 'Crypto', 'Forensics', 'Pwn', 'Reverse'].includes(post.category)
      );
      setPosts(writeups);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostDelete = async (postId: string) => {
    // Remove the post from the local state immediately
    setPosts(currentPosts => currentPosts.filter(post => post._id !== postId));
  };

  const filteredPosts = posts.filter(post => 
    (selectedCategory === 'All Categories' || post.category === selectedCategory) &&
    (selectedDifficulty === 'All Difficulties' || post.difficulty === selectedDifficulty)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold gradient-text">CTF Write-ups</h1>
            <p className="mt-4 text-xl text-gray-400">
              Detailed solutions and explanations for various CTF challenges
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4">
            <select 
              className="bg-gray-800 border-gray-700 text-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Web</option>
              <option>Crypto</option>
              <option>Forensics</option>
              <option>Pwn</option>
              <option>Reverse</option>
            </select>

            <select 
              className="bg-gray-800 border-gray-700 text-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option>All Difficulties</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          {/* Write-ups Grid */}
          {loading ? (
            <div className="text-center text-gray-400">Loading write-ups...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center text-gray-400">
              No write-ups found for the selected filters.
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogPost 
                  key={post._id} 
                  post={post}
                  showDeleteButton={post.author.name === 'Xpl01tE4gl3'}
                  onDelete={handlePostDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 