import { Box, Toolbar } from "@mui/material";
import { Outlet, ScrollRestoration } from "react-router-dom";
import DrawerAppBar, { drawerWidth } from "./DrawerAppBar/DrawerAppBar";
import ScrollTop from "./ScrollTop";

function RootRoute({
  favoriteSubreddits,
  searchTerm,
  setSearchTerm,
  onAddSubreddit,
  onRemoveSubreddit,
}) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DrawerAppBar
          favoriteSubreddits={favoriteSubreddits}
          setSearchTerm={setSearchTerm}
          onAddSubreddit={onAddSubreddit}
          onRemoveSubreddit={onRemoveSubreddit}
        />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: "100vh",
          }}
        >
          <Toolbar id="back-to-top-anchor" />
          <Outlet />
        </Box>
      </Box>
      <ScrollTop />
      <ScrollRestoration />
    </>
  );
}

export default RootRoute;
