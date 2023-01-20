import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSubredditPosts } from "../utils/api";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", ({ subreddit, searchTerm }, thunkAPI) => {
    return fetchSubredditPosts(subreddit, searchTerm, null);
});

export const fetchMorePosts = createAsyncThunk("posts/fetchMorePosts", (arg, thunkAPI) => {
    const subreddit = thunkAPI.getState().posts.subreddit;
    const searchTerm = thunkAPI.getState().searchTerm.current;
    const nextPostsId = thunkAPI.getState().posts.nextPostsId;
    return fetchSubredditPosts(subreddit, searchTerm, nextPostsId);
});

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        loading: false,
        error: null,
        posts: [],
        nextPostsId: null,
        subreddit: null,
    },
    reducers: {
        updateSubreddit: (state, action) => {
            state.subreddit = action.payload;
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.loading = false;
            const result = action.payload;
            state.posts = result.posts;
            state.nextPostsId = result.nextPostsId;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [fetchMorePosts.fulfilled]: (state, action) => {
            const result = action.payload;
            state.posts = [...state.posts, ...result.posts];
            state.nextPostsId = result.nextPostsId;
        }
    }
});

export const { updateSubreddit } = postsSlice.actions;
export default postsSlice.reducer;