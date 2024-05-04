import { defer } from "react-router-dom";
import axios from "axios";
import apiRequest from "./apiRequest.js";
import { Navigate, Outlet } from "react-router-dom";

export const postLoader = async ({ request, params }) => {
  try {
    const postPromise = await apiRequest.get("/post");
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    console.log(error);
    return error.response.status;
  }
};
