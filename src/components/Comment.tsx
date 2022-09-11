import { useMemo, useState } from "react";
import styled from "styled-components";

import { ScoreTicker, Avatar, ReplyButton, AvatarUsername } from ".";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { deleteComment } from "../redux/state";
import { DeleteButton, EditButton, AddComment } from ".";

interface CommentProps {
  comment: CommentType;
  isReply?: boolean;
  parentId?: number;
}

const CommentWrapper = styled.div<{ isReply: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: var(--white);
  width: ${(props) => (props.isReply ? "600px" : "700px")};
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

    .buttons {
      margin-left: auto;
      display: flex;
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

  .you-tag {
    background-color: var(--moderate-blue);
    color: var(--white);
    height: 20px;
    width: 40px;
    border-radius: 3px;
    padding: 0 8px;
    margin-right: 10px;
    font-size: 14px;
  }
`;

export default function Comment({
  comment,
  isReply = false,
  parentId,
}: CommentProps) {
  const { username: currentUsername } = useAppSelector(
    (state) => state.state.currentUser
  );
  const dispatch = useAppDispatch();

  const [openReply, setOpenReply] = useState(false);

  const isCurrentUser = useMemo(
    (): boolean => currentUsername === comment.user.username,
    [currentUsername, comment.user.username]
  );

  const handleDelete = (isReply: boolean) => {
    dispatch(deleteComment({ isReply, id: comment.id, parentId }));
  };

  return (
    <>
      <CommentWrapper isReply={isReply}>
        <ScoreTicker commentId={comment.id} score={comment.score} />
        <div className="body">
          <div className="header">
            <Avatar username={comment.user.username as AvatarUsername} small />
            <div className="username">{comment.user.username}</div>
            {isCurrentUser && <div className="you-tag">you</div>}
            <div className="createdAt">{comment.createdAt}</div>
            <div className="buttons">
              {isCurrentUser ? (
                <>
                  <DeleteButton onClick={() => handleDelete(isReply)} />
                  <EditButton />
                </>
              ) : (
                <ReplyButton onClick={() => setOpenReply(!openReply)} />
              )}
            </div>
          </div>
          <div className="content">
            {comment.replyingTo && (
              <span className="replyingTo">{`@${comment.replyingTo}`}</span>
            )}
            {comment.content}
          </div>
        </div>
      </CommentWrapper>
      {openReply && (
        <AddComment
          isReply
          replyingTo={comment.user.username}
          username={currentUsername}
          parentId={comment.id}
          handleClose={() => setOpenReply(false)}
        />
      )}
      {comment.replies?.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              parentId={comment.id}
              comment={reply}
              isReply
            />
          ))}
        </div>
      )}
    </>
  );
}
