import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";
import ErrorElement from "./routes/ErrorElement";
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
  const router = createHashRouter([
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
      errorElement: <ErrorElement />
    },
  ]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
