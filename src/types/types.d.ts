interface User {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo?: string;
  user: User;
  replies: CommentType[];
}

interface State {
  currentUser: User;
  comments: CommentType[];
}
