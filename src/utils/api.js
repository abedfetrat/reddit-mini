const apiBaseUrl = "https://www.reddit.com";

const getCleanReplies = (replies) => {
    if (!replies) return [];
    replies = replies.data.children;
    const cleanReplies = [];
    replies.forEach(reply => {
        if (reply.kind === "more") return;
        cleanReplies.push({
            id: reply.data.id,
            text: reply.data.body,
            author: reply.data.author,
            createdAt: reply.data.created_utc,
            upvotes: reply.data.ups,
            replies: getCleanReplies(reply.data.replies)
        });
    });
    return cleanReplies;
};

const fetchPostComments = async (postId) => {
    const urlToFetch = `${apiBaseUrl}/comments/${postId}.json`;
    const response = await fetch(urlToFetch);
    if (!response.ok) {
        throw { message: response.statusText, statusCode: response.status };
    }
    const data = await response.json();
    const comments = data[1].data.children;
    const cleanComments = [];
    comments.forEach(comment => {
        // More is an item in the array that can be used to 
        // fetch the api for the rest of the comments
        if (comment.kind === "more") return;
        const cleanReplies = getCleanReplies(comment.data.replies);
        cleanComments.push({
            id: comment.data.id,
            text: comment.data.body,
            author: comment.data.author,
            createdAt: comment.data.created_utc,
            upvotes: comment.data.ups,
            replies: cleanReplies
        });
    });
    return cleanComments;
};

const getPostType = (post) => {
    if (post.data.selftext) {
        return "text";
    } else if (post.data.post_hint === "image") {
        return "image";
    } else {
        return "url";
    }
};

const getFetchUrl = (subreddit, query, nextPostsId) => {
    if (query && query.length > 0) {
        let params = `?q=${query}&restrict_sr=1&sr_nsfw=0&sort=relevance&t=all`;
        if (nextPostsId) {
            params += `&after=${nextPostsId}`;
        }
        return `${apiBaseUrl}/r/${subreddit}/search.json${params}`;
    } else {
        const params = nextPostsId ? `?after=${nextPostsId}` : "";
        return `${apiBaseUrl}/r/${subreddit}.json${params}`;
    }
};

const fetchSubredditPosts = async (subreddit, query, nextPostsId) => {
    const urlToFetch = getFetchUrl(subreddit, query, nextPostsId);
    const response = await fetch(urlToFetch);
    if (!response.ok) {
        throw { message: response.statusText, statusCode: response.status };
    }
    const data = await response.json();
    const posts = data.data.children;
    const cleanPosts = [];
    posts.forEach(post => {
        cleanPosts.push({
            id: post.data.id,
            type: getPostType(post),
            title: post.data.title,
            text: post.data.selftext,
            author: post.data.author,
            upvotes: post.data.ups,
            numComments: post.data.num_comments,
            url: post.data.url,
            createdAt: post.data.created_utc,
        });
    });
    return {
        posts: cleanPosts,
        nextPostsId: data.data.after
    };
};

const fetchPostById = async (postId) => {
    const urlToFetch = `${apiBaseUrl}/comments/${postId}.json`;
    const response = await fetch(urlToFetch);
    if (!response.ok) {
        throw { message: response.statusText, statusCode: response.status };
    }
    const data = await response.json();
    const post = data[0].data.children[0];
    const cleanPost = {
        id: post.data.id,
        type: getPostType(post),
        title: post.data.title,
        text: post.data.selftext,
        author: post.data.author,
        upvotes: post.data.ups,
        numComments: post.data.num_comments,
        url: post.data.url,
        createdAt: post.data.created_utc,
    };
    return cleanPost;
};

export { fetchSubredditPosts, fetchPostComments, fetchPostById };