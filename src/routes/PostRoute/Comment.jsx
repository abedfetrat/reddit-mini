import { useTheme } from "@emotion/react";
import ArrowDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowUpIcon from "@mui/icons-material/ArrowCircleUp";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import {
  Avatar,
  Box,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { getCompactNumber, getTimeAgo } from "../../utils/utils";

function Comment({ comment, isReply, nestLevel = 0 }) {
  const theme = useTheme();
  const isTabletUp = useMediaQuery(theme.breakpoints.up("md"));

  const renderReplies = () => {
    const max = isTabletUp ? 3 : 2;
    if (nestLevel < max) {
      return (
        <List>
          {comment.replies.map((reply) => (
            <ListItem
              key={reply.id}
              disableGutters
              disablePadding
              sx={{ pt: 2 }}
            >
              <Comment comment={reply} isReply nestLevel={nestLevel + 1} />
            </ListItem>
          ))}
        </List>
      );
    } else if (comment.replies.length > 0) {
      return (
        <Typography variant="subtitle2" color="secondary" mt={2} ml={6}>
          {comment.replies.length} more replies...
        </Typography>
      );
    }
  };

  return (
    <Box width={1} sx={{ ml: isReply ? 6 : 0 }}>
      <Box
        width={1}
        sx={{
          pb: 1,
          borderBottom: `1px solid ${grey[300]}`,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
          <Avatar sx={{ width: 32, height: 32 }} />
          <Typography variant="body2">{comment.author}</Typography>
        </Box>
        <Stack sx={{ pl: 6 }}>
          <Typography paragraph> {comment.text}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <ArrowUpIcon fontSize="small" />
              <Typography variant="body2">
                {comment.upvotes.toLocaleString()}
              </Typography>
              <ArrowDownIcon fontSize="small" />
            </Box>
            <Typography variant="body2">
              {getTimeAgo(comment.createdAt)}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", columnGap: "4px" }}
            >
              <CommentIcon fontSize="small" />
              <Typography variant="body2">
                {getCompactNumber(comment.replies.length)} replies
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
      {comment.replies && renderReplies()}
    </Box>
  );
}

export function CommentSkeleton() {
  return (
    <Box width={1}>
      <Box
        width={1}
        sx={{
          pb: 1,
          borderBottom: `1px solid ${grey[300]}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton width="30%" />
        </Box>
        <Stack sx={{ pl: 6 }}>
          <Skeleton width="100%" />
          <Skeleton width="60%" />
          <Skeleton width="20%" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Skeleton width={100} />
            <Skeleton width={100} />
            <Skeleton width={100} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Comment;
