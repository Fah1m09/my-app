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
import { useNavigate } from "react-router-dom";
import { createPost, fetchUsers } from "../../features/api/postSlice";

export default function AddEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    title: "",
    body: "",
    userId: "",
  });

  const { users, isLoading, isError } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const resetData = () => {
    setValue({
      title: "",
      body: "",
      userId: "",
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    let data = {
      title: value.title,
      body: value.body,
      userId: value.userId,
    };
    dispatch(createPost(data));
    navigate("/");
    resetData();
  };

  return (
    <div className="container">
      <h3>Add</h3>
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

          {!isError && (
            <Grid item xs={12} md={6}>
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
                    <MenuItem value={user.id}>{user.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12}>
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
              disabled={isLoading}
              onChange={handleChange("body")}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button type="submit" variant="outlined">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
