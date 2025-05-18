'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/Navbar'

export default function NewAchievement() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    ctfName: '',
    platform: '',
    challengeName: '',
    category: 'Web',
    difficulty: 'Easy',
    points: 0,
    solvedDate: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/achievements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create achievement')
      }

      router.push('/profile')
    } catch (error) {
      console.error('Error creating achievement:', error)
      alert('Failed to create achievement')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'points' ? parseInt(value) || 0 : value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6">
        <div className="card p-8">
          <h1 className="text-3xl font-bold gradient-text mb-8">Add New Achievement</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* CTF Name */}
            <div>
              <label htmlFor="ctfName" className="block text-sm font-medium text-gray-300">
                CTF Name
              </label>
              <input
                type="text"
                id="ctfName"
                name="ctfName"
                value={formData.ctfName}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            {/* Platform */}
            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-300">
                Platform
              </label>
              <input
                type="text"
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            {/* Challenge Name */}
            <div>
              <label htmlFor="challengeName" className="block text-sm font-medium text-gray-300">
                Challenge Name
              </label>
              <input
                type="text"
                id="challengeName"
                name="challengeName"
                value={formData.challengeName}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              >
                <option value="Web">Web</option>
                <option value="Crypto">Crypto</option>
                <option value="Forensics">Forensics</option>
                <option value="Pwn">Pwn</option>
                <option value="Reverse">Reverse</option>
                <option value="Misc">Misc</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300">
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Points */}
            <div>
              <label htmlFor="points" className="block text-sm font-medium text-gray-300">
                Points
              </label>
              <input
                type="number"
                id="points"
                name="points"
                value={formData.points}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            {/* Solved Date */}
            <div>
              <label htmlFor="solvedDate" className="block text-sm font-medium text-gray-300">
                Solved Date
              </label>
              <input
                type="date"
                id="solvedDate"
                name="solvedDate"
                value={formData.solvedDate}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center gap-2 hover:scale-105 transform transition-all"
              >
                {isSubmitting ? 'Adding...' : 'Add Achievement'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 