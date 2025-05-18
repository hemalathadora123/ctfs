import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Achievement from '../../../models/Achievement';

export async function GET() {
  try {
    await connectDB();
    
    // Get total challenges solved
    const totalChallenges = await Achievement.countDocuments();
    
    // Get total points earned
    const totalPoints = await Achievement.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$points' }
        }
      }
    ]);

    // Get category breakdown
    const categoryStats = await Achievement.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          points: { $sum: '$points' }
        }
      }
    ]);

    // Get difficulty breakdown
    const difficultyStats = await Achievement.aggregate([
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 },
          points: { $sum: '$points' }
        }
      }
    ]);

    // Get platform breakdown
    const platformStats = await Achievement.aggregate([
      {
        $group: {
          _id: '$platform',
          count: { $sum: 1 },
          points: { $sum: '$points' }
        }
      }
    ]);

    // Get all achievements
    const achievements = await Achievement.find({})
      .sort({ solvedDate: -1 })
      .limit(10);

    return NextResponse.json({
      totalChallenges,
      totalPoints: totalPoints[0]?.total || 0,
      categoryStats,
      difficultyStats,
      platformStats,
      achievements
    });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const achievement = await Achievement.create(data);
    return NextResponse.json(achievement);
  } catch (error) {
    console.error('Error creating achievement:', error);
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
  }
} 