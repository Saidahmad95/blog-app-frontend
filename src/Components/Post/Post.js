import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";

import { Link } from "react-router-dom";
import axios from "axios";
import { Container } from "@mui/material";
import Comment from "../Comment/Comment";
import { CommentBank, CommentBankOutlined } from "@mui/icons-material";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const { title, text, userId, username, postId, likes } = props;

  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId,setLikeId]=useState(null)
  const isInitialMount = useRef(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComments();
    console.log(commentList);
    console.log("handleExpanClick");
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1);
    }else{
        deleteLike();
        setLikeCount(likeCount-1);

    }
    // saveLike();
  };

  const checkLikes = () => {
    var likeControl = likes.find((like) => like.userId === userId);
    if (likeControl != null) {
    setLikeId(likeControl.id) ;
      setIsLiked(true);
      console.log("LikeId: "+likeId)
    }
  };

  const refreshComments =  () => {
     axios
      .get("/comments/all?postId=" + postId)
      .then((result) => {
        setIsLoaded(true);
        setCommentList(result.data);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
      
  };

  const saveLike = () => {
    const data = JSON.stringify({
      postId: postId,
      userId: userId,
    });

    console.log("DATA: " + data);

    const headers = {
      "Content-type": "application/json",
    };
    axios
      .post("/likes", data, { headers })
      .then((res) => console.log("RES: " + res))
      .catch((err) => console.log("ERROR: " + err));
  };

  const deleteLike = () => {
    const headers = {
      "Content-type": "application/json",
    };
    axios
      .delete("/likes/"+likeId,  { headers })
      .catch((err) => console.log("ERROR: " + err));
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      refreshComments();
    }
  }, []);

  useEffect(() => {
    checkLikes();
  }, []);

  return (
    <div className="postContainer">
      <Card sx={{ width: 800, textAlign: "left", margin: 1 }}>
        <CardHeader
          avatar={
            <Link
              to={{ pathname: "/users/" + userId }}
              style={{ textDecoration: "none" }}
            >
              <Avatar sx={{ bgcolor: "#82b74b" }} aria-label="recipe">
                {username.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleLikeClick} aria-label="add to favorites">
            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
          </IconButton>
          {likeCount}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentBankOutlined />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container fixed>
            {error
              ? "error"
              : isLoaded
              ? commentList.map((comment) => (
                  <Comment
                    userId={1}
                    username={"USER"}
                    text={comment.text}
                    postId={postId}
                  ></Comment>
                ))
              : "Loading ..."}
            <CommentForm
              userId={1}
              postId={postId}
              refreshComments={refreshComments}
            />
          </Container>
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
