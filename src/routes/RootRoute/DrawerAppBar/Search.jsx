import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const StyledSearch = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ClearButtonWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));

function Search({ setSearchTerm }) {
  const { subreddit } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const timeoutRef = useRef();
  const [text, setText] = useState("");

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSearchTerm(text);
    }, 500);
  }, [text]);

  const handleChange = ({ target }) => {
    setText(target.value);
    // If currently not in subreddit route, then route to it. 
    if (subreddit && location.pathname !== `/r/${subreddit}`) {
      navigate(`r/${subreddit}`);
    }
  };

  return (
    <StyledSearch>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search for posts…"
        inputProps={{ "aria-label": "search for posts" }}
        value={text}
        onChange={handleChange}
        onKeyDown={({ key }) => key === "Escape" && setText("")}
      />
      {text.length > 0 && (
        <ClearButtonWrapper>
          <IconButton size="small" onClick={() => setText("")}>
            <ClearIcon htmlColor="white" />
          </IconButton>
        </ClearButtonWrapper>
      )}
    </StyledSearch>
  );
}

export default Search;
