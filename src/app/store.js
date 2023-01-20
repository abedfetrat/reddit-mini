import { configureStore } from "@reduxjs/toolkit";
import favoriteSubredditsReducer from "./favoriteSubredditsSlice";
import searchTermReducer from "./searchTermSlice";
import postsReducer from "./postsSlice";

const store = configureStore({
    reducer: {
        favoriteSubreddits: favoriteSubredditsReducer,
        searchTerm: searchTermReducer,
        posts: postsReducer,
    }
});

export default store;