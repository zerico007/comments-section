import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialState";

const initialAppState = sessionStorage.commentState
  ? JSON.parse(sessionStorage.commentState)
  : initialState;

export function getComment(state: State, commentId: number) {
  for (const comment of state.comments) {
    if (comment.id === commentId) {
      return comment;
    }
    if (!!comment.replies.length) {
      for (const reply of comment.replies) {
        if (reply.id === commentId) {
          return reply;
        }
      }
    }
  }
  return null;
}

const slice = createSlice({
  name: "comments",
  initialState: initialAppState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        (comment: CommentType) => comment.id !== action.payload
      );
    },
    editCommment: (
      state,
      action: PayloadAction<{ id: number; content: string }>
    ) => {
      const comment = getComment(state, action.payload.id);
      if (comment) comment.content = action.payload.content;
    },
    addReply: (
      state,
      action: PayloadAction<{ comment: CommentType; id: number }>
    ) => {
      const comment = getComment(state, action.payload.comment.id);
      if (comment) comment.replies.push(action.payload.comment);
    },
    incrementScore: (state, action: PayloadAction<number>) => {
      const comment = getComment(state, action.payload);
      if (comment) comment.score++;
    },
    decrementScore: (state, action: PayloadAction<number>) => {
      const comment = getComment(state, action.payload);
      if (comment) comment.score--;
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
