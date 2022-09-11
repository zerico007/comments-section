import { useState } from "react";
import styled from "styled-components";

import { Avatar, AvatarUsername, TextBox, Button } from ".";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addComment } from "../redux/state";

interface AddCommentProps {
  isReply: boolean;
  username: AvatarUsername;
  replyingTo?: AvatarUsername;
}

const Wrapper = styled.div<{ isReply: boolean }>`
  display: flex;
  justify-content: space-evenly;
  width: ${(props) => (props.isReply ? "600px" : "700px")};
  min-height: 180px;
  padding: 20px;
  border-radius: 8px;
  margin-top: ${(props) => (props.isReply ? "10px" : "20px")};
  background-color: var(--white);
`;

export default function AddComment({
  isReply,
  username,
  replyingTo,
}: AddCommentProps) {
  const dispatch = useAppDispatch();
  const lastId = useAppSelector((state) => state.state.lastId);

  const [text, setText] = useState(() => {
    if (isReply) {
      return `@${replyingTo} `;
    }
    return "";
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleAddComment = () => {
    const commentToAdd: CommentType = {
      id: lastId + 1,
      user: {
        username,
      },
      content: text,
      replies: [],
      createdAt: "Just now",
      score: 0,
    };
    dispatch(addComment(commentToAdd));
    setText("");
  };

  return (
    <Wrapper isReply={isReply}>
      <Avatar username={username} />
      <TextBox value={text} onChange={handleChange} />
      <Button
        theme={isReply ? "secondary" : "primary"}
        content={isReply ? "Reply" : "Send"}
        onClick={() => {
          if (isReply) return;
          handleAddComment();
        }}
      />
    </Wrapper>
  );
}
