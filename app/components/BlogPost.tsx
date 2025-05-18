'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '../types/blog'
import { formatDate } from '../utils/date'
import { useRouter } from 'next/navigation'

interface BlogPostProps {
  post: BlogPost;
  showDeleteButton?: boolean;
  onDelete?: (postId: string) => Promise<void>;
  refreshStats?: () => void;
}

export default function BlogPost({ post, showDeleteButton = false, onDelete, refreshStats }: BlogPostProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Call the onDelete callback to update parent state
      if (onDelete) {
        await onDelete(post._id);
      }

      // Refresh stats after successful deletion
      if (refreshStats) {
        refreshStats();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group relative">
      <Link href={`/blog/${post._id}`}>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 relative">
          {showDeleteButton && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="absolute top-2 right-2 z-10 p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full transition-colors"
            >
              {isDeleting ? (
                <svg className="animate-spin h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          )}
          {post.coverImage && (
            <div className="relative h-48 w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-shrink-0">
                <Image
                  src={post.author.image || '/default-avatar.png'}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-gray-300 font-medium">{post.author.name}</p>
                <p className="text-gray-500 text-sm">{formatDate(post.createdAt)}</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
            <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
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
            
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                post.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                post.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {post.difficulty}
              </span>
              <span className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Read more →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
} 