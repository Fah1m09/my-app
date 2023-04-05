import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  search: "",
  posts: [],
  users: [],
  post: {},
  isLoading: false,
  isError: false,
};

export const getPosts = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get("/users");
  return response.data;
};

export const fetchPosts = createAsyncThunk("job/fetchPosts", async () => {
  const dt = localStorage.getItem("posts");
  const Posts = JSON.parse(dt);
  if (Posts) {
    return Posts;
  } else {
    const Posts = await getPosts();
    localStorage.setItem("posts", JSON.stringify(Posts));
    return Posts;
  }
});

export const fetchUsers = createAsyncThunk("job/fetchUsers", async () => {
  const Users = await getUsers();
  return Users;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    searchPost: (state, action) => {
      state.search = action.payload;
    },
    initilizePost: (state, action) => {
      state.posts = action.payload;
    },
    createPost: (state, action) => {
      state.posts = [...state.posts, action.payload];
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    updatePost: (state, action) => {
      const indexToUpdate = state.posts.findIndex(
        (t) => t.id === action.payload.id
      );

      state.posts[indexToUpdate] = action.payload;
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      localStorage.setItem("posts", JSON.stringify(state.posts));
    },
    activePost: (state, action) => {
      state.post = action.payload;
    },
    inactivePost: (state) => {
      state.post = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.posts = [];
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.users = [];
      });
  },
});

export default postSlice.reducer;
export const {
  searchPost,
  initilizePost,
  createPost,
  updatePost,
  deletePost,
  activePost,
  inactivePost,
  getDataStart,
  getDataSuccess,
  getDataFailure,
} = postSlice.actions;
