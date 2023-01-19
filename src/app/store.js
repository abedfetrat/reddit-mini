import favoriteSubredditsReducer from "./favoriteSubredditsSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        favoriteSubreddits: favoriteSubredditsReducer
    }
});

export default store;