import { createContext, useContext, useEffect, useReducer } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

const FavoriteSubredditsContext = createContext(null);
const FavoriteSubredditsDispatchContext = createContext(null);

function FavoriteSubredditsProvider({ children }) {
  const [persistedFavoriteSubreddits, setPersistedFavoriteSubreddits] =
    useLocalStorageState("favoriteSubreddits", ["popular", "pics", "webdev"]);
  const [favoriteSubreddits, dispatch] = useReducer(
    favoriteSubredditsReducer,
    persistedFavoriteSubreddits
  );

  useEffect(() => {
    setPersistedFavoriteSubreddits(favoriteSubreddits);
  }, [favoriteSubreddits]);

  return (
    <FavoriteSubredditsContext.Provider value={favoriteSubreddits}>
      <FavoriteSubredditsDispatchContext.Provider value={dispatch}>
        {children}
      </FavoriteSubredditsDispatchContext.Provider>
    </FavoriteSubredditsContext.Provider>
  );
}

function favoriteSubredditsReducer(favoriteSubreddits, action) {
  switch (action.type) {
    case "added": {
      return [...favoriteSubreddits, action.subreddit];
    }
    case "removed": {
      return favoriteSubreddits.filter((fav) => fav !== action.subreddit);
    }
  }
}

function useFavoriteSubreddits() {
  return useContext(FavoriteSubredditsContext);
}

function useFavoriteSubredditsDispatch() {
  return useContext(FavoriteSubredditsDispatchContext);
}

export {
  FavoriteSubredditsProvider as default,
  useFavoriteSubreddits,
  useFavoriteSubredditsDispatch,
};
