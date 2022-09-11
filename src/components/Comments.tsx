import { useAppSelector } from "../redux/hooks";
import { Comment } from ".";

export default function Comments() {
  const comments = useAppSelector((state) => state.state.comments);

  return (
    <div className="comments">
      {comments.map((comment: CommentType) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
