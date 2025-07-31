'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import Link from 'next/link'

interface AchievementStats {
  totalChallenges: number;
  totalPoints: number;
  categoryStats: Array<{ _id: string; count: number; points: number }>;
  difficultyStats: Array<{ _id: string; count: number; points: number }>;
  platformStats: Array<{ _id: string; count: number; points: number }>;
  achievements: Array<{
    _id: string;
    ctfName: string;
    platform: string;
    challengeName: string;
    category: string;
    difficulty: string;
    points: number;
    solvedDate: string;
  }>;
}

export default function ProfilePage() {
  const [stats, setStats] = useState<AchievementStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/achievements');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm('Are you sure you want to delete this achievement?')) {
      return;
    }

    try {
      const response = await fetch(`/api/achievements/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete achievement');
      }

      // Refresh stats after deletion
      fetchStats();
    } catch (error) {
      console.error('Error deleting achievement:', error);
      alert('Failed to delete achievement');
    }
  };

  // Social media links configuration
  // TO UPDATE: Replace the 'url' values below with your actual profile URLs
  const socialLinks = [
    {
      name: 'LinkedIn',
      // ↓↓↓ PASTE YOUR LINKEDIN PROFILE URL HERE (e.g., https://linkedin.com/in/your-actual-profile) ↓↓↓
      url: 'https://www.linkedin.com/in/sailaja-adireddi-056a9230b',
      // ↑↑↑ PASTE YOUR LINKEDIN PROFILE URL HERE ↑↑↑
      icon: (
        <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/AdireddiSa75619',
      icon: (
        <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    
    {
      name: 'Email',
      url: 'mailto:sailuadireddi@gmail.com',
      icon: (
        <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="text-center">
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF94] to-[#00B8FF] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <Image
                  src="/mine.jpg"
                  alt="Xpl01tE4gl3"
                  width={128}
                  height={128}
                  className="rounded-full border-2 border-gray-800 hover:border-cyan-500 transition-colors duration-300"
                  priority
                />
              </div>
            </div>
            <h1 className="mt-4 text-4xl font-bold gradient-text">Xpl01tE4gl3</h1>
            <p className="mt-2 text-gray-400">Cracking Codes. Capturing Flags. Flying High. – Xpl01tE4gl3</p>
            <Link 
              href="/achievements/new" 
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Achievement
            </Link>
          </div>

          {/* Stats */}
          {loading ? (
            <div className="text-center text-gray-400">Loading achievements...</div>
          ) : stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-400">Total Challenges</dt>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <dd className="mt-2 text-3xl font-semibold gradient-text">{stats.totalChallenges}</dd>
              </div>
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-400">Total Points</dt>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <dd className="mt-2 text-3xl font-semibold gradient-text">{stats.totalPoints}</dd>
              </div>
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-gray-400">Platforms</dt>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <dd className="mt-2 text-3xl font-semibold gradient-text">{stats.platformStats.length}</dd>
              </div>
            </div>
          )}

          {/* Category Breakdown */}
          {stats && (
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-6">Category Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.categoryStats.map((cat) => (
                  <div key={cat._id} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">{cat._id}</span>
                      <span className="text-cyan-400">{cat.points} pts</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Solved</span>
                        <span className="text-white">{cat.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Difficulty Breakdown */}
          {stats && (
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-6">Difficulty Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.difficultyStats.map((diff) => (
                  <div key={diff._id} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm font-medium ${
                        diff._id === 'Easy' ? 'text-green-400' :
                        diff._id === 'Medium' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {diff._id}
                      </span>
                      <span className="text-cyan-400">{diff.points} pts</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Solved</span>
                        <span className="text-white">{diff.count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements List */}
          {stats && (
            <div className="card p-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Achievements</h3>
              <div className="space-y-4">
                {stats.achievements?.map((achievement) => (
                  <div key={achievement._id} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-white">{achievement.challengeName}</h4>
                        <p className="text-gray-400 text-sm">{achievement.ctfName} • {achievement.platform}</p>
                        <div className="flex gap-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            achievement.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                            achievement.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {achievement.difficulty}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium">
                            {achievement.category}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                            {achievement.points} pts
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteAchievement(achievement._id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete achievement"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bio */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-white">About Me</h3>
            <div className="mt-4 text-gray-300">
              <p>
                A passionate CTF player and security enthusiast. I specialize in web exploitation,
                cryptography, and reverse engineering. Through this blog, I share my experiences
                and learnings from various CTF competitions.
              </p>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="card p-6">
            <h3 className="text-xl font-bold text-white mb-6">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Web Exploitation', color: 'blue' },
                { name: 'Cryptography', color: 'purple' },
                
              ].map((skill) => (
                <span
                  key={skill.name}
                  className={`tag bg-${skill.color}-500/20 text-${skill.color}-400`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
            
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300 group"
                >
                  {link.icon}
                  <span className="text-gray-300 group-hover:text-cyan-400 transition-colors">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 