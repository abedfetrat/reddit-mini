import { List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchPostComments } from "../../utils/api";
import Error from "../../components/Error";
import Comment, { CommentSkeleton } from "./Comment";

function Comments({ postId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    setIsLoading(true);
    const result = await fetchPostComments(postId);
    if (result) {
      setIsLoading(false);
      setComments(result);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const renderLoadingState = () => (
    <List disablePadding>
      {Array(5)
        .fill()
        .map((item, index) => (
          <ListItem key={index} disableGutters>
            <CommentSkeleton />
          </ListItem>
        ))}
    </List>
  );

  return (
    <>
      <Typography variant="h6" component="h2" sx={{ mt: 6, mb: 1 }}>
        Comments
      </Typography>
      {isLoading && renderLoadingState()}
      {hasError && <Error text="Could not load comments" />}
      {comments && (
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id} disableGutters>
              <Comment comment={comment} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

export default Comments;
