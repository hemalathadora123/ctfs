import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import BlogPost from '../../../models/BlogPost';

export async function GET() {
  try {
    await connectDB();
    
    // Get total posts count
    const totalPosts = await BlogPost.countDocuments();
    
    // Get CTF category counts
    const ctfStats = await BlogPost.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get difficulty distribution
    const difficultyStats = await BlogPost.aggregate([
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 }
        }
      }
    ]);

    // Calculate total CTFs (excluding non-CTF blog posts if any)
    const totalCTFs = ctfStats.reduce((acc, curr) => acc + curr.count, 0);

    return NextResponse.json({
      totalPosts,
      totalCTFs,
      categoryBreakdown: ctfStats,
      difficultyBreakdown: difficultyStats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
} 