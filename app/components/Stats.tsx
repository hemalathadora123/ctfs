'use client'
import React, { useEffect, useState } from 'react'

interface StatsData {
  totalPosts: number;
  totalCTFs: number;
  categoryBreakdown: Array<{ _id: string; count: number }>;
  difficultyBreakdown: Array<{ _id: string; count: number }>;
}

export default function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
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

    // Add event listener for stats refresh
    const handleStatsRefresh = () => {
      fetchStats();
    };

    const statsElement = document.querySelector('[data-stats-refresh]');
    if (statsElement) {
      statsElement.addEventListener('statsRefresh', handleStatsRefresh);
    }

    // Cleanup
    return () => {
      if (statsElement) {
        statsElement.removeEventListener('statsRefresh', handleStatsRefresh);
      }
    };
  }, []);

  if (loading) {
    return <div className="text-gray-400">Loading stats...</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Posts */}
      <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-400">Total Write-ups</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-4xl font-bold text-white mt-4">{stats.totalPosts}</p>
      </div>

      {/* Total CTFs */}
      <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-400">Total CTFs</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <p className="text-4xl font-bold text-white mt-4">{stats.totalCTFs}</p>
      </div>

      {/* Category Breakdown */}
      <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400">Categories</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <div className="space-y-2">
          {stats.categoryBreakdown.map((cat) => (
            <div key={cat._id} className="flex justify-between items-center">
              <span className="text-gray-400">{cat._id}</span>
              <span className="text-white font-medium">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400">Difficulty</h3>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="space-y-2">
          {stats.difficultyBreakdown.map((diff) => (
            <div key={diff._id} className="flex justify-between items-center">
              <span className={`text-sm font-medium ${
                diff._id === 'Easy' ? 'text-green-400' :
                diff._id === 'Medium' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {diff._id}
              </span>
              <span className="text-white font-medium">{diff.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 