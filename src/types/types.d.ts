interface User {
  username: AvatarUsername;
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
  lastId: number;
  comments: CommentType[];
}
