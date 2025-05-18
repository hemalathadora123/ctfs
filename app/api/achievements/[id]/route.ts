import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Achievement from '../../../../models/Achievement';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const result = await Achievement.deleteOne({ _id: params.id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Achievement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    return NextResponse.json(
      { error: 'Failed to delete achievement' },
      { status: 500 }
    );
  }
} 