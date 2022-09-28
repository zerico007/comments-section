import { useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { ScoreTicker, Avatar, ReplyButton, AvatarUsername } from ".";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { deleteComment } from "../redux/state";
import { useMobile } from "../context";
import {
  DeleteButton,
  EditButton,
  AddComment,
  DeleteCommentModal,
  openModal,
} from ".";

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
  min-height: 180px;

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

  .buttons {
    margin-left: auto;
    display: flex;
    align-items: center;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    justify-content: space-between;
    width: 100%;
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

  @media (max-width: 475px) {
    width: 90%;
    flex-direction: column;
    padding: 10px;

    .header {
      justify-content: flex-start;
    }

    .body {
      margin-left: 0;
    }

    .content {
      margin-bottom: 10px;
    }

    .username,
    .createdAt,
    .content,
    .you-tag {
      font-size: 13px;
    }

    .buttons {
      width: 100%;
      justify-content: space-between;
    }
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
  const { isMobile } = useMobile();

  const [openReply, setOpenReply] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const deleteModalRef = useRef<HTMLDialogElement>(null);

  const isCurrentUser = useMemo(
    (): boolean => currentUsername === comment.user.username,
    [currentUsername, comment.user.username]
  );

  const handleDelete = (isReply: boolean) => {
    dispatch(deleteComment({ isReply, id: comment.id, parentId }));
  };

  const openDeleteModal = () => openModal(deleteModalRef);

  return (
    <>
      {isCurrentUser && (
        <DeleteCommentModal
          reference={deleteModalRef}
          handleConfirm={() => handleDelete(isReply)}
        />
      )}
      <CommentWrapper isReply={isReply}>
        {!isMobile && (
          <ScoreTicker commentId={comment.id} score={comment.score} />
        )}
        <div className="body">
          <div className="header">
            <Avatar username={comment.user.username as AvatarUsername} small />
            <div className="username">{comment.user.username}</div>
            {isCurrentUser && <div className="you-tag">you</div>}
            <div className="createdAt">{comment.createdAt}</div>
            {!isMobile && (
              <div className="buttons">
                {isCurrentUser ? (
                  <>
                    <DeleteButton onClick={() => openDeleteModal()} />
                    <EditButton onClick={() => setOpenEdit(!openEdit)} />
                  </>
                ) : (
                  <ReplyButton onClick={() => setOpenReply(!openReply)} />
                )}
              </div>
            )}
          </div>
          <div className="content">
            {openEdit ? (
              <AddComment
                isEdit
                username={currentUsername}
                parentId={comment.id}
                handleClose={() => setOpenEdit(false)}
                commentContent={comment.content}
              />
            ) : (
              <>
                {comment.replyingTo && (
                  <span className="replyingTo">{`@${comment.replyingTo}`}</span>
                )}
                {comment.content}
              </>
            )}
          </div>
          {isMobile && (
            <div className="buttons">
              <ScoreTicker commentId={comment.id} score={comment.score} />
              {isCurrentUser ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginLeft: "auto",
                  }}
                >
                  <DeleteButton onClick={() => openDeleteModal()} />
                  <EditButton onClick={() => setOpenEdit(!openEdit)} />
                </div>
              ) : (
                <ReplyButton onClick={() => setOpenReply(!openReply)} />
              )}
            </div>
          )}
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
