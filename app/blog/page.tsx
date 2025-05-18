'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import BlogPost from '../components/BlogPost'
import Stats from '../components/Stats'
import { BlogPost as BlogPostType } from '../types/blog'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostType[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties')

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
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

  const refreshStats = () => {
    // Force a re-render of the Stats component
    const statsElement = document.querySelector('[data-stats-refresh]');
    if (statsElement) {
      const event = new Event('statsRefresh');
      statsElement.dispatchEvent(event);
    }
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
          <div className="flex justify-between items-center mb-12">
            <div className="text-left">
              <h1 className="text-4xl font-extrabold gradient-text">CTF Write-ups & Blog Posts</h1>
              <p className="mt-4 text-xl text-gray-400">
                Detailed write-ups of CTF challenges and security research findings
              </p>
            </div>
            <Link 
              href="/blog/new" 
              className="btn-primary flex items-center gap-2 hover:scale-105 transform transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Write-up
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mb-12" data-stats-refresh>
            <Stats />
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
              <option>Misc</option>
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

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="text-center text-gray-400">Loading posts...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center text-gray-400">
              No posts found. Be the first to create a write-up!
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogPost 
                  key={post._id} 
                  post={post}
                  showDeleteButton={post.author.name === 'Xpl01tE4gl3'}
                  onDelete={handlePostDelete}
                  refreshStats={refreshStats}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 