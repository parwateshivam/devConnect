import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/profileImg.png";
import { getUsersPosts, uploadProfileImg, } from "../api/api";
import { setUser } from "../redux/slices/userSlice";
import PostCard from "../components/PostCard";

const ProfilePage = () => {
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const resp = await getUsersPosts("get-users-posts", token);
                setPosts(resp.data.posts || []);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPosts();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!image) {
                return toast.error("Please select image");
            }
            const formData = new FormData();
            formData.append("profileImg", image);
            const token = localStorage.getItem("token");
            const res = await uploadProfileImg(
                "upload-profile-img",
                formData,
                token
            );
            toast.success(res.data.message);
            dispatch(setUser(res.data.user));
            setImage(null);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to upload profile image"
            );
        }
    };

    return (
        <div
            className="container-fluid py-4"
        >
            {/* Back Button */}
            <div className="container mb-4">
                <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
            </div>

            <div className="container">

                {/* Profile Card */}
                <div className="card border-0 shadow overflow-hidden mb-4">
                    {/* Cover */}
                    <div
                        style={{
                            height: "200px",
                            background:
                                "linear-gradient(135deg,#0d6efd,#6610f2)"
                        }}
                    ></div>

                    <div className="card-body text-center position-relative">

                        {/* Profile Image */}
                        <img
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : user?.profileImg || profile
                            }
                            alt="profile"
                            className="rounded-circle border border-4 border-white shadow"
                            style={{
                                width: "160px",
                                height: "160px",
                                objectFit: "cover",
                                marginTop: "-100px"
                            }}
                        />

                        <h2 className="fw-bold mt-3">
                            {user?.name}
                        </h2>

                        <p className="text-secondary mb-4">
                            {user?.email}
                        </p>

                        {/* Stats */}
                        <div className="row text-center mb-4">
                            <div className="col">
                                <h4 className="fw-bold">
                                    {posts.length}
                                </h4>
                                <small className="text-muted">
                                    Posts
                                </small>
                            </div>

                            <div className="col">
                                <h4 className="fw-bold">
                                    0
                                </h4>
                                <small className="text-muted">
                                    Followers
                                </small>
                            </div>

                            <div className="col">
                                <h4 className="fw-bold">
                                    0
                                </h4>
                                <small className="text-muted">
                                    Following
                                </small>
                            </div>
                        </div>

                        {/* Create Post */}
                        <Link to="/create-post">
                            <button className="btn btn-primary px-5 rounded-pill">
                                + Create Post
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Upload Image Card */}
                <div className="card border-0 shadow mb-5">
                    <div className="card-body">

                        <h4 className="fw-bold mb-4">
                            Change Profile Picture
                        </h4>

                        <form
                            onSubmit={handleProfileSubmit}
                            className="row g-3"
                        >
                            <div className="col-md-9">
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="col-md-3">
                                <button
                                    className="btn btn-primary w-100"
                                    type="submit"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>

                    </div>
                </div>

                {/* Posts */}
                <div className="mb-4">
                    <h2 className="fw-bold mb-4">
                        My Posts
                    </h2>

                    {
                        posts.length === 0 ? (
                            <div className="card border-0 shadow text-center p-5">
                                <h4 className="text-muted">
                                    No Posts Yet
                                </h4>

                                <Link
                                    to="/create-post"
                                    className="btn btn-primary mt-3"
                                >
                                    Create First Post
                                </Link>
                            </div>
                        ) : (
                            <div className="row">
                                {
                                    posts.map((post) => (
                                        <div
                                            className="col-lg-6 mb-4"
                                            key={post._id}
                                        >
                                            <PostCard post={post} />
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;