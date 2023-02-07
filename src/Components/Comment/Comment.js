import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Link } from "react-router-dom";

function Comment(props) {
  const { text, userId, username,postd } = props;
  const commentSyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    bgcolor: "white",
  };

  return (
    <CardContent style={commentSyle}>
      <OutlinedInput
        fullWidth
        readOnly
        id="outlined-adornment-amount"
        multiline
        placeholder="Text"
        inputProps={{ maxlength: 250 }}
        value={text}
        startAdornment={
          <InputAdornment position="start">
            <Link
              to={{ pathname: "/users/" + userId }}
              style={{ textDecoration: "none" }}
            >
              <Avatar sx={{ bgcolor: "#82b74b" }} aria-label="recipe">
                {username.charAt(0)}
              </Avatar>
            </Link>
          </InputAdornment>
        }
        sx={{ color: "black", bgcolor: "#EEEEEE",borderRadius:20}}
      ></OutlinedInput>
    </CardContent>
  );
}
export default Comment;
