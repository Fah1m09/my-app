import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPosts } from "../../features/api/postSlice";
import Post from "../posts/Post";
import Loader from "../ui/Loader";

export default function Posts() {
  const dispatch = useDispatch();
  //const { data: posts, isLoading, isError } = useGetPostsQuery();
  const { posts, isLoading, isError } = useSelector((state) => state.posts);
  const search = useSelector((state) => state.posts.search);
  const [data, setData] = useState([]);
  
  useEffect(() => {
      dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    setData(posts);
  }, [posts]);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <Loader />
      </>
    );
  }

  if (!isLoading && isError)
    content = <div className="col-span-12">Error</div>;

  if (!isError && !isLoading && data?.length === 0) {
    content = <div className="col-span-12">No posts found!</div>;
  }

  if(!isError && !isLoading && data?.length > 0){
    content = data
    .filter((post) =>
      search !== ""
        ? post.title.toLowerCase().includes(search.toLowerCase())
        : post
    )
    .map((post) => <Post key={post.id} post={post} />);
  }

  return (
    <Grid container spacing={2}>
      {content}
    </Grid>
  );
}
