import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initilizePost } from "../features/api/postSlice";

export default function useLocalCheck() {
  const dispatch = useDispatch();
  const [localChecked, setLocalChecked] = useState(false);

  useEffect(() => {
    const localAuth = localStorage?.getItem("posts");

    if (localAuth) {
      const posts = JSON.parse(localAuth);
      if (posts) {
        dispatch(initilizePost(posts));
      }
    }
    setLocalChecked(true);
  }, [dispatch, setLocalChecked]);

  return localChecked;
}
