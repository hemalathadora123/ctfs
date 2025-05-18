import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import BlogPost from '../../../models/BlogPost';

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.content || !data.difficulty || !data.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Transform the data to match the schema
    const postData = {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt || data.content.slice(0, 150) + '...',
      date: data.date ? new Date(data.date) : new Date(),
      author: {
        name: data.author?.name || 'Anonymous',
        image: data.author?.image || '/default-avatar.jpg'
      },
      tags: data.tags || [],
      difficulty: data.difficulty,
      category: data.category,
      images: data.images || []
    };

    const post = await BlogPost.create(postData);
    return NextResponse.json(post);
  } catch (error: any) {
    console.error('Error creating post:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', details: validationErrors },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create post', details: error.message },
      { status: 500 }
    );
  }
} 