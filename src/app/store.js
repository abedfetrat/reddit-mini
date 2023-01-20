import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import favoriteSubredditsReducer from "./favoriteSubredditsSlice";
import postsReducer from "./postsSlice";
import searchTermReducer from "./searchTermSlice";

const rootReducer = combineReducers({
    favoriteSubreddits: favoriteSubredditsReducer,
    searchTerm: searchTermReducer,
    posts: postsReducer,
});

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["searchTerm", "posts"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store as default, persistor };

