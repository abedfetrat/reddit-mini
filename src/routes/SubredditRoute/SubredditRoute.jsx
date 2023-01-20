import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchMorePosts,
  fetchPosts,
  updateSubreddit
} from "../../app/postsSlice";
import { updatePrevTerm } from "../../app/searchTermSlice";
import Center from "../../components/Center";
import Error from "../../components/Error";
import Posts from "./Posts";

function SubredditRoute() {
  const { subreddit } = useParams();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm.current);
  const prevSearchTerm = useSelector((state) => state.searchTerm.previous);
  const posts = useSelector((state) => state.posts.posts);
  const nextPostsId = useSelector((state) => state.posts.nextPostsId);
  const prevSubreddit = useSelector((state) => state.posts.subreddit);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (subreddit !== prevSubreddit || searchTerm !== prevSearchTerm) {
      dispatch(fetchPosts({ subreddit, searchTerm }));
      dispatch(updatePrevTerm());
      dispatch(updateSubreddit(subreddit));
    }
  }, [subreddit, searchTerm]);

  if (error) {
    return (
      <Center>
        <Error
          text={`Could not load posts for subreddit ${subreddit}`}
          retry={() => dispatch(fetchPosts({ subreddit, searchTerm }))}
        />
      </Center>
    );
  }

  return (
    <Container maxWidth="md" disableGutters sx={{ height: 1 }}>
      <Posts
        posts={posts}
        hasMore={nextPostsId !== null}
        isLoading={loading}
        onLoadMore={() => dispatch(fetchMorePosts())}
      />
    </Container>
  );
}

export default SubredditRoute;
