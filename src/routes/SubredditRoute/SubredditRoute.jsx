import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Center from "../../components/Center";
import Error from "../../components/Error";
import useSessionStorageState from "../../hooks/useSessionStorageState";
import { fetchSubredditPosts } from "../../utils/api";
import Posts from "./Posts";

function SubredditRoute({ searchTerm, prevSearchTerm }) {
  const { subreddit } = useParams();
  const [posts, setPosts] = useSessionStorageState("posts", []);
  const [nextPostsId, setNextPostsId] = useSessionStorageState(
    "nextPostsId",
    null
  );
  const [prevSubreddit, setPrevSubreddit] = useSessionStorageState(
    "subreddit",
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSubredditPosts(subreddit, searchTerm, null);
      setPosts(result.posts);
      setNextPostsId(result.nextPostsId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const fetchMorePosts = async () => {
    try {
      const result = await fetchSubredditPosts(
        subreddit,
        searchTerm,
        nextPostsId
      );
      setPosts((prev) => [...prev, ...result.posts]);
      setNextPostsId(result.nextPostsId);
    } catch (error) {
      // TODO: handle error
    }
  };

  useEffect(() => {
    if (subreddit !== prevSubreddit || searchTerm !== prevSearchTerm) {
      fetchPosts();
    }
    setPrevSubreddit(subreddit);
  }, [subreddit, searchTerm]);

  if (error) {
    return (
      <Center>
        <Error
          text={`Could not load posts for subreddit ${subreddit}`}
          retry={fetchPosts}
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
        onLoadMore={fetchMorePosts}
      />
    </Container>
  );
}

export default SubredditRoute;
