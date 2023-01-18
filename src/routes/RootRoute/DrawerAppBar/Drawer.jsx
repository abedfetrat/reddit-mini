import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  ButtonGroup,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  ListItemIcon,
} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MaterialDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import {
  useFavoriteSubreddits,
  useFavoriteSubredditsDispatch,
} from "../../../providers/FavoriteSubredditsProvider";

function Drawer({ drawerWidth, mobileOpen, onDrawerToggle }) {
  const { subreddit: selectedSubreddit } = useParams();
  const navigate = useNavigate();
  const dispatch = useFavoriteSubredditsDispatch();
  const favoriteSubreddits = useFavoriteSubreddits();
  const [isManage, setIsManage] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [subredditNameText, setSubredditNameText] = useState("");

  const toggleAddForm = () => {
    setShowAddForm((prev) => !prev);
  };

  const handleAddSubreddit = () => {
    if (subredditNameText.length > 0) {
      const subreddit = subredditNameText.toLowerCase().replace(/\s+/g, "");
      dispatch({ type: "added", subreddit });
      setSubredditNameText("");
      toggleAddForm();
      navigate(`r/${subreddit}`);
      if (mobileOpen) {
        onDrawerToggle();
      }
    }
  };

  const handleRemoveSubreddit = (subreddit) => {
    dispatch({ type: "removed", subreddit });
    if (selectedSubreddit === subreddit) {
      navigate("/");
    }
  };

  const handleSelectSubreddit = (subreddit) => {
    navigate(`r/${subreddit}`);
    if (mobileOpen) {
      onDrawerToggle();
    }
  };

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Toolbar>
        <img src={logo} width="40" height="40" />
        <Typography variant="h6" component="h1" marginLeft={2}>
          Reddit Mini
        </Typography>
      </Toolbar>
      <Divider />
      <List
        sx={{
          flex: "1",
        }}
      >
        {favoriteSubreddits.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            secondaryAction={
              isManage && (
                <IconButton
                  edge="end"
                  aria-label="remove"
                  onClick={() => handleRemoveSubreddit(text)}
                >
                  <RemoveIcon />
                </IconButton>
              )
            }
          >
            <ListItemButton
              selected={text === selectedSubreddit}
              onClick={() => handleSelectSubreddit(text)}
            >
              <ListItemText primary={`r/${text}`} />
            </ListItemButton>
          </ListItem>
        ))}
        {!showAddForm && (
          <ListItem disablePadding>
            <ListItemButton onClick={toggleAddForm}>
              <ListItemText primary="add subreddit" />
              <ListItemIcon sx={{ minWidth: 0 }}>
                <AddIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        )}
        {showAddForm && (
          <ListItem sx={{ display: "block" }}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="subreddit-name-input">
                Subreddit name
              </InputLabel>
              <Input
                id="subreddit-name-input"
                startAdornment={
                  <InputAdornment position="start">r/</InputAdornment>
                }
                value={subredditNameText}
                autoFocus
                onChange={({ target }) => setSubredditNameText(target.value)}
                onKeyDown={({ key }) => key === "Enter" && handleAddSubreddit()}
              />
            </FormControl>
            <ButtonGroup
              fullWidth
              variant="text"
              color="inherit"
              sx={{ mt: 1 }}
            >
              <Button color="primary" onClick={handleAddSubreddit}>
                Save
              </Button>
              <Button color="secondary" onClick={toggleAddForm}>
                Cancel
              </Button>
            </ButtonGroup>
          </ListItem>
        )}
      </List>
      <Divider />
      <Toolbar>
        <Button
          color="secondary"
          fullWidth
          startIcon={isManage ? <DoneIcon /> : <EditIcon />}
          onClick={() => setIsManage((prev) => !prev)}
        >
          {isManage ? "Done" : "Manage favorites"}
        </Button>
      </Toolbar>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <MaterialDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </MaterialDrawer>
      <MaterialDrawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </MaterialDrawer>
    </Box>
  );
}

export default Drawer;
