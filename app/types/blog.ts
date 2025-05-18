export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Author {
  name: string;
  image: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  category: 'Web' | 'Crypto' | 'Forensics' | 'Pwn' | 'Reverse' | 'Misc';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags?: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    image?: string;
  };
  images?: Array<{
    url: string;
    caption?: string;
  }>;
} 