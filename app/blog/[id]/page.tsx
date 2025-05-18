'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Image from 'next/image'
import { BlogPost } from '../../types/blog'
import { formatDate } from '../../utils/date'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch post')
        const data = await response.json()
        setPost(data)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPost()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Navbar />
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">Loading post...</div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Navbar />
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">Post not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <article className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6 relative">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0">
                <Image
                  src={post.author.image || '/default-avatar.png'}
                  alt={post.author.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-gray-300 font-medium">{post.author.name}</p>
                <p className="text-gray-500">{formatDate(post.createdAt)}</p>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: tag.color + '20', color: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
            {post.coverImage && (
              <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-cyan max-w-none">
            <ReactMarkdown
              components={{
                code: ({ className, children }) => {
                  const match = /language-(\w+)/.exec(className || '')
                  const isInline = !match
                  return !isInline ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Metadata */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                post.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                post.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {post.difficulty}
              </span>
              <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-medium">
                {post.category}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
} 