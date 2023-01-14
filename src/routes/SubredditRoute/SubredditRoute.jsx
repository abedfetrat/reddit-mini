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
  const [allPosts, setAllPosts] = useSessionStorageState("posts", {});
  const [nextPosts, setNextPosts] = useSessionStorageState("nextPosts", {});
  const posts = allPosts[subreddit];
  const nextPostsId = nextPosts[subreddit];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchSubredditPosts(subreddit, searchTerm, null);
      setAllPosts((prev) => {
        return {
          ...prev,
          [subreddit]: result.posts,
        };
      });
      setNextPosts((prev) => {
        return {
          ...prev,
          [subreddit]: result.nextPostsId,
        };
      });
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
      setAllPosts((prev) => {
        return {
          ...prev,
          [subreddit]: [...prev[subreddit], ...result.posts],
        };
      });
      setNextPosts((prev) => {
        return {
          ...prev,
          [subreddit]: result.nextPostsId,
        };
      });
    } catch (error) {
      // TODO: handle error
    }
  };

  useEffect(() => {
    // Fetch posts when user has typed in new search term
    // or if it's first load and there are no persisted posts.
    if (searchTerm !== prevSearchTerm || !posts) {
      fetchPosts();
    }
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
