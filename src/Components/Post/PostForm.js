import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";

function PostForm(props) {
  const { userId, username } = props;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handlePostCreate = () => {

  };

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
          title={
            <OutlinedInput
              id=""
              multiline
              placeholder="Title"
              inputProps={{ maxlength: 25 }}
              fullWidth
             
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
                inputProps={{ maxlength: 250 }}
                fullWidth
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
