import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useLocalStorageState from "./hooks/useLocalStorageState";
import PostRoute from "./routes/PostRoute/PostRoute";
import NoSelection from "./routes/RootRoute/NoSelection";
import RootRoute from "./routes/RootRoute/RootRout";
import SubredditRoute from "./routes/SubredditRoute/SubredditRoute";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff4500",
    },
    secondary: {
      main: "#448aff",
    },
  },
});

function App() {
  const [favoriteSubreddits, setFavoriteSubreddits] = useLocalStorageState(
    "favoriteSubreddits",
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [prevSearchTerm, setPrevSearchTerm] = useState("");

  useEffect(() => {
    setPrevSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleAddSubreddit = (subreddit) => {
    setFavoriteSubreddits((prev) => [...prev, subreddit]);
  };

  const handleRemoveSubreddit = (subreddit) => {
    setFavoriteSubreddits((prev) => prev.filter((r) => r !== subreddit));
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootRoute
          favoriteSubreddits={favoriteSubreddits}
          setSearchTerm={setSearchTerm}
          onAddSubreddit={handleAddSubreddit}
          onRemoveSubreddit={handleRemoveSubreddit}
        />
      ),
      children: [
        {
          index: true,
          element: <NoSelection />,
        },
        {
          path: "r/:subreddit",
          element: (
            <SubredditRoute
              searchTerm={searchTerm}
              prevSearchTerm={prevSearchTerm}
            />
          ),
        },
        {
          path: "r/:subreddit/comments/:commentId",
          element: <PostRoute />,
        },
      ],
    },
  ]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
