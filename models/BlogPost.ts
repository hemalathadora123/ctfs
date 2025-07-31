import mongoose, { Document, Model } from 'mongoose';

interface ITag {
  id?: string;
  name?: string;
  color?: string;
}

interface IBlogPost extends Document {
  title: string;
  content: string;
  excerpt?: string;
  date: Date;
  author?: {
    name: string;
    image: string;
  };
  tags: ITag[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Web' | 'Crypto' | 'Forensics' | 'Pwn' | 'Reverse' | 'Misc';
  images: Array<{
    url: string;
    caption: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const tagSchema = new mongoose.Schema({
  id: String,
  name: String,
  color: String
});

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    name: String,
    image: String
  },
  tags: [tagSchema],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  category: {
    type: String,
    enum: ['Web', 'Crypto', 'Forensics', 'Pwn', 'Reverse', 'Misc'],
    required: true
  },
  images: [{
    url: String,
    caption: String
  }]
}, {
  timestamps: true
});

const BlogPost: Model<IBlogPost> = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', blogPostSchema);

export default BlogPost; 