import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Button,
  InputAdornment,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function PostForm(props) {
  const { userId, username, refreshPosts } = props;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handlePostCreate = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPosts();
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  const savePost = () => {
    const data = JSON.stringify({
      title: title,
      userId: userId,
      text: text,
    });

    const headers = {
      "Content-type": "application/json",
    };
    axios
      .post("/posts", data, { headers })
      .then((res) => console.log(res))
      .catch((err) => console.log("ERROR: " + err));
  };

  
  useEffect(() => {
    refreshPosts()
  }, []);

  return (
    <div className="postContainer">
      <Snackbar
        open={isSent}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setIsSent(false)}
        backgroundColor="#e2eafc"
      >
        <Alert severity="success" sx={{ width: "100%" }} variant="filled">
          <h3> Post created successfully</h3>
        </Alert>
      </Snackbar>
      <Card
        sx={{ width: 800, textAlign: "left", margin: 1, bgcolor: "#eaf4f4" }}
      >
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
          title={
            <OutlinedInput
              id=""
              multiline
              placeholder="Title"
              value={title}
              inputProps={{ maxlength: 25 }}
              fullWidth
              onChange={(i) => handleTitle(i.target.value)}
              sx={{ bgcolor: "white" }}
            ></OutlinedInput>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {
              <OutlinedInput
                id=""
                multiline
                placeholder="Text"
                value={text}
                inputProps={{ maxlength: 250 }}
                fullWidth
                onChange={(i) => handleText(i.target.value)}
                sx={{ bgcolor: "white" }}
                endAdornment={
                  <InputAdornment>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={handlePostCreate}
                    >
                      Create
                    </Button>
                  </InputAdornment>
                }
              ></OutlinedInput>
            }
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostForm;
