import { Button, Container, Toolbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Error from "../../components/Error";
import { Post } from "../../components/Post";
import Center from "../../components/Center";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Comments from "./Comments";

function PostRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const post = (state && state.post) || null;

  const handleNavigateBack = () => {
    // Checks if previous location is within our app
    if (location.key !== "default") {
        console.log(location.key);
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Toolbar disableGutters>
        <Button startIcon={<ArrowBackIcon />} onClick={handleNavigateBack}>
          Back to all posts
        </Button>
      </Toolbar>
      {post ? (
        <Container maxWidth="md" disableGutters sx={{ height: 1 }}>
          <Post post={post} detailed />
          <Comments postId={post.id} />
        </Container>
      ) : (
        <Center>
          <Error text="Could not load post" />
        </Center>
      )}
    </>
  );
}

export default PostRoute;
