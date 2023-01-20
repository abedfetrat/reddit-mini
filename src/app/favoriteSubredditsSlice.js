import { createSlice } from "@reduxjs/toolkit";

const favoriteSubredditsSlice = createSlice({
    name: "favoriteSubreddits",
    initialState: ["popular", "pics", "webdev"],
    reducers: {
        addSubreddit: (state, action) => {
            const subreddit = action.payload;
            if (!state.includes(subreddit)) {
                state.push(subreddit);
            }
        },
        removeSubreddit: (state, action) => {
            return state.filter(fav => fav !== action.payload);
        }
    }
})

export const { addSubreddit, removeSubreddit } = favoriteSubredditsSlice.actions;
export default favoriteSubredditsSlice.reducer;