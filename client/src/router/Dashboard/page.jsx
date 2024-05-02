import "./style.css";
import PostCard from "../../components/postCard/page";
import { useLoaderData, Await } from "react-router-dom";
import AddPost from "../../components/Addpost/page";
import { useEffect } from "react";
import { Suspense } from "react";
import Chat from "../../components/Chat/page";

const Dashboard = () => {
  const data = useLoaderData();
  console.log(data.chatResponse);
  return (
    <div className="DashBoard">
      <div className="postContainer">
        <div className="addPost">
          <AddPost />
        </div>
        <div className="posts">
          <PostCard posts={data.postResponse.data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
