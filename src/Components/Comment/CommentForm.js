import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function CommentForm(props) {
    
  const { text, userId, username, postId } = props;
  const [commentText, setCommentText] = useState("");
  const commentSyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    bgcolor: "white",
  };

  const handleCommentText = (value) => {
    setCommentText(value);
    console.log("Comment text is: " + commentText);
  };

  const handleCommentCreate = () => {
    saveComment();
    console.log(props)
    props.refreshComments();
    setCommentText("")
  };

  const saveComment = () => {
    const data = JSON.stringify({
      postId: postId,
      userId: userId,
      text:  commentText ,
    });

    console.log("DATA: "+data)

    const headers = {
      "Content-type": "application/json",
    };
    axios
      .post("/comments", data, { headers })
      .then((res) => console.log("RES: "+res))
      .catch((err) => console.log("ERROR: " + err));
  };

  return (
    <CardContent style={commentSyle}>
      <OutlinedInput
        onChange={(i) => handleCommentText(i.target.value)}
        value={commentText}
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxlength: 250 }}
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <Link
              to={{ pathname: "/users/" + userId }}
              style={{ textDecoration: "none" }}
            >
              <Avatar sx={{ bgcolor: "#82b74b" }} aria-label="recipe">
                {username}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleCommentCreate}
            >
              Add Comment
            </Button>
          </InputAdornment>
        }
        sx={{ color: "black", bgcolor: "#e2eafc" }}
      ></OutlinedInput>
    </CardContent>
  );
}
export default CommentForm;
