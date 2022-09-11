import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialState";

const initialAppState = sessionStorage.commentState
  ? JSON.parse(sessionStorage.commentState)
  : initialState;

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
        (comment: Comment) => comment.id !== action.payload
      );
    },
    editCommment: (
      state,
      action: PayloadAction<{ id: Number; content: string }>
    ) => {
      const comment = state.comments.find(
        (comment: Comment) => comment.id === action.payload.id
      );
      comment.content = action.payload.content;
    },
    addReply: (
      state,
      action: PayloadAction<{ comment: Comment; id: number }>
    ) => {
      const comment = state.comments.find(
        (comment: Comment) => comment.id === action.payload.comment.id
      );
      comment.replies.push(action.payload.comment);
    },
    incrementScore: (state, action: PayloadAction<number>) => {
      const comment = state.comments.find(
        (comment: Comment) => comment.id === action.payload
      );
      comment.score++;
    },
    decrementScore: (state, action: PayloadAction<number>) => {
      const comment = state.comments.find(
        (comment: Comment) => comment.id === action.payload
      );
      comment.score--;
    },
  },
});

export const {
  setCurrentUser,
  addComment,
  deleteComment,
  editCommment,
  addReply,
} = slice.actions;
export const stateReducer = slice.reducer;
