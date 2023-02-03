import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

const postStyle = {
  height: 800,
};

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts=()=>{
    axios.get("/posts/all")
    .then((result) => {
      setIsLoaded(true);
      setPostList(result.data);
    })
    .catch((error) => {
      setIsLoaded(true);
      setError(error);
    
    });
  }

  useEffect(() => {
    refreshPosts()
  }, []);

  if (error) {
    return <div>{console.log(error)} Error !</div>;
  } else if (!isLoaded) {
    return <div> Loading ... </div>;
  } else {
    return (
      <Container
        fixed
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "gainsboro",
          height: "100%",
          minWidth: "100%",
        }}
      >
        <PostForm style={postStyle}
        title={'title'}
        text={'text'}
        userId={1}
        username={'username'}
        refreshPosts={refreshPosts}/>
        {postList.map((post) => (
          <Post
            style={postStyle}
            title={post.title}
            postId={post.id}
            text={post.text}
            userId={post.userId}
            username={post.username}
          />
        ))}
      </Container>
    );
  }
}

export default Home;
