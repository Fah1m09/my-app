import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsers, updatePost } from "../../features/api/postSlice";

export default function Edit() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.posts.users);
  const { post, isLoading, isSuccess } = useSelector((state) => state.posts);

  const [value, setValue] = useState({
    title: "",
    body: "",
    userId: "",
  });

  useEffect(() => {
    if (post && users) {
      setValue({
        title: post?.title,
        body: post?.body,
        userId: post?.userId,
      });
    }
  }, [post, users]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const handleForm = (e) => {
    e.preventDefault();
    let data = {
      id: parseInt(postId),
      title: value.title,
      body: value.body,
      userId: value.userId,
    };
    dispatch(updatePost(data));
    navigate("/");
  };

  return (
    <div className="container">
      <h3>Update Post</h3>
      <form id onSubmit={(e) => handleForm(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              label="Title"
              name="title"
              variant="outlined"
              value={value.title}
              onChange={handleChange("title")}
              disabled={isLoading}
            />
          </Grid>
       
          <Grid item xs={12} md={6}>
            {users && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">User</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value.userId}
                  label="User"
                  onChange={handleChange("userId")}
                  disabled={isLoading}
                >
                  {users?.map((user) => (
                    <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>

          <Grid item xs={12} >
            <TextField
              fullWidth
              multiline
              rows={4}
              required
              id="filled-basic"
              label="Body"
              variant="outlined"
              name="body"
              value={value.body}
              onChange={handleChange("body")}
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="outlined">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
