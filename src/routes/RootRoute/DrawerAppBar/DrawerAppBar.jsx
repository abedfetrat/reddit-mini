import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import Drawer from "./Drawer";
import Search from "./Search";

export const drawerWidth = 240;

function DrawerAppBar({
  favoriteSubreddits,
  setSearchTerm,
  onAddSubreddit,
  onRemoveSubreddit,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Search setSearchTerm={setSearchTerm} />
        </Toolbar>
      </AppBar>
      <Drawer
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
        favoriteSubreddits={favoriteSubreddits}
        onAddSubreddit={onAddSubreddit}
        onRemoveSubreddit={onRemoveSubreddit}
      />
    </>
  );
}

export default DrawerAppBar;
