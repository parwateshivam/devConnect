import { useEffect, useState } from "react";
import { getAllPosts } from "../api/api";
import Navbar from "../components/Navbar";

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

            <div style={styles.container}>
                <div style={styles.feed}>
                    <h2 style={styles.heading}>Posts Feed</h2>

                    {[...posts].reverse().map((post) => (
                        <div key={post._id} style={styles.postCard}>
                            <div style={styles.userSection}>
                                <img
                                    src={
                                        post?.createdBy?.profileImg ||
                                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    }
                                    alt="profile"
                                    style={styles.profileImg}
                                />

                                <div>
                                    <h4 style={styles.userName}>
                                        {post?.createdBy?.name}
                                    </h4>

                                    <p style={styles.date}>
                                        {new Date(
                                            post.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div style={styles.postContent}>
                                <h3 style={styles.postTitle}>
                                    {post.title}
                                </h3>

                                <p style={styles.postDescription}>
                                    {post.description}
                                </p>

                                {post.postImg && (
                                    <img
                                        src={post.postImg}
                                        alt="post"
                                        style={styles.postImage}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const styles = {
    container: {
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        padding: "30px 20px",
    },

    feed: {
        width: "100%",
        maxWidth: "700px",
    },

    heading: {
        marginBottom: "20px",
        color: "#222",
    },

    postCard: {
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "18px",
        marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        border: "1px solid #e5e5e5",
    },

    userSection: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "15px",
    },

    profileImg: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        objectFit: "cover",
    },

    userName: {
        margin: 0,
        fontSize: "16px",
        color: "#222",
    },

    date: {
        margin: 0,
        fontSize: "12px",
        color: "#777",
    },

    postContent: {
        marginTop: "10px",
    },

    postTitle: {
        marginBottom: "10px",
        color: "#111",
    },

    postDescription: {
        fontSize: "15px",
        lineHeight: "1.6",
        color: "#444",
    },

    postImage: {
        width: "100%",
        marginTop: "15px",
        borderRadius: "10px",
        objectFit: "cover",
        maxHeight: "400px",
    },
};

export default Dashboard;