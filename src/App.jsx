import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootRoute from "./routes/RootRoute/RootRout";

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
  const [favoriteSubreddits, setFavoriteSubreddits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      children: [], // TODO add nested routes
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
