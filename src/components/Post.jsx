import ArrowDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowUpIcon from "@mui/icons-material/ArrowCircleUp";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Link,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { getCompactNumber, getTimeAgo } from "../utils/utils";

const Image = styled("img")(() => ({
  display: "block",
  width: "100%",
  maxHeight: "400px",
  marginInline: "auto",
  marginBottom: "8px",
  objectFit: "contain",
}));

const TextWrapper = styled("div")(() => ({
  display: "-webkit-box",
  WebkitLineClamp: "4",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

export function Post({ post, onClick, detailed }) {
  const renderPostContent = () => {
    if (post.type === "text") {
      return detailed ? (
        <Typography paragraph>{post.text}</Typography>
      ) : (
        <TextWrapper>
          <Typography paragraph>{post.text}</Typography>
        </TextWrapper>
      );
    } else if (post.type === "image") {
      return <Image src={post.url} />;
    } else {
      return detailed ? (
        <Link href={post.url} target="_blank" color="secondary">
          {post.url}
        </Link>
      ) : (
        <Typography
          color="secondary"
          paragraph
          sx={{ textDecoration: "underline" }}
        >
          {post.url}
        </Typography>
      );
    }
  };

  const renderCardContent = () => (
    <>
      <CardContent sx={{ display: "flex", columnGap: 3 }}>
        <Box minWidth="fit-content">
          <IconButton size="small">
            <ArrowUpIcon color={post.userVote === 1 ? "primary" : "action"} />
          </IconButton>
          <Typography variant="body1" textAlign="center">
            {getCompactNumber(post.upvotes)}
          </Typography>
          <IconButton size="small">
            <ArrowDownIcon
              color={post.userVote === -1 ? "secondary" : "action"}
            />
          </IconButton>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h5" marginBottom={2}>
            {post.title}
          </Typography>
          {renderPostContent()}
        </Box>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          paddingInline: 2,
          paddingBottom: 1,
        }}
      >
        <Typography variant="body2">u/{post.author}</Typography>
        <Typography variant="body2">{getTimeAgo(post.createdAt)}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: "4px" }}>
          <CommentIcon fontSize="small" />
          <Typography variant="body2">
            {getCompactNumber(post.numComments)} comments
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <Card
      sx={{ width: "100%", whiteSpace: "pre-wrap", wordBreak: "break-word" }}
    >
      {detailed ? (
        renderCardContent()
      ) : (
        <CardActionArea component="a" onClick={onClick}>
          {renderCardContent()}
        </CardActionArea>
      )}
    </Card>
  );
}

export function PostSkeleton() {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent sx={{ display: "flex", columnGap: 3 }}>
        <Skeleton variant="rounded" width={34} height={80} />
        <Box sx={{ width: "100%" }}>
          <Skeleton width="100%" sx={{ fontSize: "24px" }} />
          <Skeleton width="100%" />
          <Skeleton width="80%" />
          <Skeleton width="50%" />
          <Skeleton width="20%" />
        </Box>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          paddingInline: 2,
          paddingBottom: 1,
        }}
      >
        <Skeleton width={100} />
        <Skeleton width={100} />
        <Skeleton width={100} />
      </Box>
    </Card>
  );
}
