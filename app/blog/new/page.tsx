'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Navbar from '../../components/Navbar'
import { BlogPost, Tag } from '../../types/blog'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
);

export default function NewBlogPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<BlogPost['category']>('Web')
  const [difficulty, setDifficulty] = useState<BlogPost['difficulty']>('Medium')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<{ url: string; caption: string }[]>([])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setImages([...images, { url: data.url, caption: '' }]);
        // Insert image markdown at cursor position
        const imageMarkdown = `![${files[0].name}](${data.url})\n`;
        setContent(content + imageMarkdown);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newPost: Partial<BlogPost> = {
        title,
        content,
        excerpt: content.slice(0, 150) + '...',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: {
          name: 'Xpl01tE4gl3',
          image: '/my-avatar.jpg'
        },
        tags: tags.map((tag, index) => ({
          id: index.toString(),
          name: tag,
          color: getTagColor(tag)
        })),
        difficulty,
        category,
        images
      };

      console.log('Sending post data:', newPost);

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Server response:', responseData);
        throw new Error(responseData.error || 'Failed to create post');
      }

      router.push('/blog');
    } catch (error) {
      console.error('Error creating post:', error);
      alert(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const getTagColor = (tag: string) => {
    const colors = ['#2563eb', '#7c3aed', '#dc2626', '#2dd4bf', '#f59e0b'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="max-w-4xl mx-auto py-16 px-4 sm:py-24 sm:px-6">
        <div className="card p-8">
          <h1 className="text-3xl font-bold gradient-text mb-8">Create New Write-up</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>

            {/* Category and Difficulty */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BlogPost['category'])}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Web">Web</option>
                  <option value="Crypto">Crypto</option>
                  <option value="Forensics">Forensics</option>
                  <option value="Pwn">Pwn</option>
                  <option value="Reverse">Reverse</option>
                  <option value="Misc">Misc</option>
                </select>
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as BlogPost['difficulty'])}
                  className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300">
                Tags (Press Enter to add)
              </label>
              <input
                type="text"
                id="tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Add tags..."
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag bg-gray-700 text-gray-300 flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-gray-400 hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Add Images
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1 block w-full text-gray-300"
              />
            </div>

            {/* Content with Markdown Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content (Markdown supported)
              </label>
              <div data-color-mode="dark">
                <MDEditor
                  value={content}
                  onChange={(value) => setContent(value || '')}
                  height={400}
                  preview="edit"
                  hideToolbar={false}
                  enableScroll={true}
                  textareaProps={{
                    placeholder: 'Write your content here...',
                    onKeyDown: (e) => {
                      // Prevent the error by stopping propagation of certain key events
                      if (e.key === 'Tab' || e.key === 'Enter') {
                        e.stopPropagation();
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Write-up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 