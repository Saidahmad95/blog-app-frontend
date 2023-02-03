import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    InputAdornment,
    OutlinedInput,
  } from "@mui/material";
  import { Link } from "react-router-dom";
  
  function CommentForm(props) {
    const { text, userId, username } = props;
    const commentSyle={
        display: "flex",
        flexWrap: "wrap",
        justifyContent : "flex-start",
        alignItems : "center",
        bgcolor:"white",
    } 
  
    return (
     
        <CardContent style={commentSyle}>
          <OutlinedInput
            id="outlined-adornment-amount"
            multiline
            placeholder="Text"
            inputProps={{ maxlength: 250 }}
            fullWidth
            value={text}
            startAdornment={
              <InputAdornment position="start">
                <Link
                  to={{ pathname: "/users/" + userId }}
                  style={{ textDecoration: "none"}}
                >
                  <Avatar sx={{ bgcolor: "#82b74b" }} aria-label="recipe">
                    {username}
                  </Avatar>
                </Link>
              </InputAdornment>
            } 
            sx={{color:"black",bgcolor:"#e2eafc"}}
          ></OutlinedInput>
        </CardContent>
  
    );
  }
  export default CommentForm;