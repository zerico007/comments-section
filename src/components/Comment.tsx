import styled from "styled-components";

import { ScoreTicker, Avatar, ReplyButton, AvatarUsername } from ".";

interface CommentProps {
  comment: CommentType;
  isReply?: boolean;
}

const CommentWrapper = styled.div<{ isReply: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: var(--white);
  width: ${(props) => (props.isReply ? "500px" : "600px")};
  height: 180px;

  .username {
    color: var(--dark-blue);
    font-weight: 500;
    margin-right: 10px;
    margin-left: 10px;
  }

  .createdAt,
  .content {
    color: var(--grayish-blue);
    font-weight: 400;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    justify-content: space-between;
    width: 100%;

    button {
      margin-left: auto;
    }
  }

  .body {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-left: 30px;
  }

  .replyingTo {
    color: var(--moderate-blue);
    font-weight: 500;
    margin-right: 5px;
  }
`;

export default function Comment({ comment, isReply = false }: CommentProps) {
  return (
    <>
      <CommentWrapper isReply={isReply}>
        <ScoreTicker commentId={comment.id} />
        <div className="body">
          <div className="header">
            <Avatar username={comment.user.username as AvatarUsername} small />
            <div className="username">{comment.user.username}</div>
            <div className="createdAt">{comment.createdAt}</div>
            <ReplyButton />
          </div>
          <div className="content">
            {comment.replyingTo && (
              <span className="replyingTo">{`@${comment.replyingTo}`}</span>
            )}
            {comment.content}
          </div>
        </div>
      </CommentWrapper>
      {comment.replies?.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </>
  );
}
