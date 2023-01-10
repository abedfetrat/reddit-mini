import {
    Box,
    CircularProgress, List,
    ListItem, Typography
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { Post, PostSkeleton } from "../../components/Post";

function Posts({ posts = [], hasMore, isLoading, onLoadMore }) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <List disablePadding>
        {Array(10)
          .fill()
          .map((item, index) => (
            <ListItem key={index} disableGutters>
              <PostSkeleton />
            </ListItem>
          ))}
      </List>
    );
  }
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={onLoadMore}
      hasMore={hasMore}
      loader={
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      }
      endMessage={
        <Typography
          fontSize={16}
          fontWeight={500}
          textAlign="center"
          color="grey"
        >
          No more posts to show
        </Typography>
      }
      style={{ overflow: "visible", paddingBottom: "32px" }}
    >
      <List disablePadding sx={{ mb: 4 }}>
        {posts.map((post, index) => (
          <ListItem key={post.id + index} disableGutters>
            <Post post={post} onClick={() => navigate(`comments/${post.id}`)} />
          </ListItem>
        ))}
      </List>
    </InfiniteScroll>
  );
}

export default Posts;
