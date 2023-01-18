import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FavoriteSubredditsProvider from "./providers/FavoriteSubredditsProvider";
import SearchTermProvider from "./providers/SearchTermProvider";
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootRoute />,
      children: [
        {
          index: true,
          element: <NoSelection />,
        },
        {
          path: "r/:subreddit",
          element: <SubredditRoute />,
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
        <FavoriteSubredditsProvider>
          <SearchTermProvider>
            <RouterProvider router={router} />
          </SearchTermProvider>
        </FavoriteSubredditsProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
