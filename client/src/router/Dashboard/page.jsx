import "./style.css";
import PostCard from "../../components/postCard/page";
import { useLoaderData, Await } from "react-router-dom";
import AddPost from "../../components/Addpost/page";
import { useEffect } from "react";
import { Suspense } from "react";
import Chat from "../../components/Chat/page";

const Dashboard = () => {
  const data = useLoaderData();
  return (
    <div className="DashBoard">
      <div className="postContainer">
        <div className="addPost">
          <AddPost />
        </div>
        <div className="posts">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <PostCard posts={data.postResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
