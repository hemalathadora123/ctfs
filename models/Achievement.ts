import mongoose, { Document, Model } from 'mongoose';

export interface AchievementDocument extends Document {
  ctfName: string;
  platform: string;
  challengeName: string;
  category: 'Web' | 'Crypto' | 'Forensics' | 'Pwn' | 'Reverse' | 'Misc';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  solvedDate: Date;
  writeupId?: mongoose.Types.ObjectId;
}

const achievementSchema = new mongoose.Schema<AchievementDocument>({
  ctfName: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  challengeName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Web', 'Crypto', 'Forensics', 'Pwn', 'Reverse', 'Misc'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  solvedDate: {
    type: Date,
    default: Date.now
  },
  writeupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: false
  }
}, {
  timestamps: true
});

// Explicitly define the model type
const Achievement: Model<AchievementDocument> = mongoose.models.Achievement || mongoose.model<AchievementDocument>('Achievement', achievementSchema);

export default Achievement;
