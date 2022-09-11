import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialState";

const initialAppState = sessionStorage.commentState
  ? JSON.parse(sessionStorage.commentState)
  : initialState;

export function getComment(
  comments: CommentType[],
  commentId: number
): CommentType | null {
  for (const comment of comments) {
    if (comment.id === commentId) {
      return comment;
    }
    if (comment.replies.length > 0) {
      const innerComment = getComment(comment.replies, commentId);
      if (innerComment) {
        return innerComment;
      }
    }
  }
  return null;
}

const slice = createSlice({
  name: "comments",
  initialState: initialAppState,
  reducers: {
    setCurrentUser: (state: State, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    addComment: (state: State, action: PayloadAction<CommentType>) => {
      state.comments.push(action.payload);
      state.lastId = action.payload.id;
    },
    deleteComment: (
      state: State,
      action: PayloadAction<{ isReply: boolean; id: number; parentId?: number }>
    ) => {
      if (action.payload.isReply) {
        const comment = getComment(
          state.comments,
          action.payload.parentId as number
        );
        if (comment) {
          comment.replies = comment.replies.filter(
            (reply) => reply.id !== action.payload.id
          );
        }
      } else {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload.id
        );
      }
    },
    editCommment: (
      state: State,
      action: PayloadAction<{ id: number; content: string }>
    ) => {
      const comment = getComment(state.comments, action.payload.id);
      if (comment) comment.content = action.payload.content;
    },
    addReply: (
      state: State,
      action: PayloadAction<{ commentToAdd: CommentType; id: number }>
    ) => {
      const comment = getComment(state.comments, action.payload.id);
      if (comment) {
        comment.replies.push(action.payload.commentToAdd);
        state.lastId = action.payload.commentToAdd.id;
      }
    },
    incrementScore: (state: State, action: PayloadAction<number>) => {
      const comment = getComment(state.comments, action.payload);
      if (comment) comment.score++;
    },
    decrementScore: (state: State, action: PayloadAction<number>) => {
      const comment = getComment(state.comments, action.payload);
      if (comment && comment.score !== 0) comment.score--;
    },
  },
});

export const {
  setCurrentUser,
  addComment,
  deleteComment,
  editCommment,
  addReply,
  incrementScore,
  decrementScore,
} = slice.actions;
export const stateReducer = slice.reducer;
