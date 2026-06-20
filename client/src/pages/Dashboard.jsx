import { useEffect, useState } from "react";
import { getAllPosts } from "../api/api";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = localStorage.getItem("token");
            try {
                const resp = await getAllPosts("get-all-posts", token);
                setPosts(resp.data.posts || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container py-4">
                <div
                    className="d-flex flex-column align-items-center gap-4"
                >
                    {posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dashboard;