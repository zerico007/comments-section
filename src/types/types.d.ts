interface User {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo?: string;
  user: User;
  replies: Comment[];
}

interface State {
  currentUser: User;
  comments: Comment[];
}
