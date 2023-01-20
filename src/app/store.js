import { configureStore } from "@reduxjs/toolkit";
import favoriteSubredditsReducer from "./favoriteSubredditsSlice";
import searchTermReducer from "./searchTermSlice";

const store = configureStore({
    reducer: {
        favoriteSubreddits: favoriteSubredditsReducer,
        searchTerm: searchTermReducer,
    }
});

export default store;