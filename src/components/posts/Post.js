import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activePost, deletePost } from "../../features/api/postSlice";

export default function Post({ post }) {
  const { id, title, body } = post;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deletePost(id));
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
    dispatch(activePost(post));
  };

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader
          action={
            <CardActions disableSpacing>
              <IconButton color="error">
                <DeleteIcon onClick={() => handleDelete()} />
              </IconButton>
              <IconButton color="primary">
                <EditIcon onClick={() => handleEdit()} />
              </IconButton>
            </CardActions>
          }
          title={title.slice(0, 50)}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {body.slice(0, 100)} ...
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
