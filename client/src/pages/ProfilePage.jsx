import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profileImg.png";
import { uploadProfileImg } from "../api/api";
import { setUser } from "../redux/slices/userSlice";

const ProfilePage = () => {
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

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
        <div style={styles.container}>

            {/* top navbar */}
            <div style={styles.topBar}>
                <button
                    className="btn btn-dark"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>

                <h2 style={{ margin: 0 }}>
                    My Profile
                </h2>
            </div>

            {/* profile section */}
            <div style={styles.profileSection}>
                {/* left side */}
                <div style={styles.leftSection}>
                    <img
                        src={
                            image
                                ? URL.createObjectURL(image)
                                : user?.profileImg || profile
                        }
                        alt="profile"
                        style={styles.profileImage}
                    />

                    <form
                        onSubmit={handleProfileSubmit}
                        style={styles.form}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="form-control"
                        />

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Upload Image
                        </button>
                    </form>
                </div>

                {/* right side */}
                <div style={styles.rightSection}>
                    <h3>User Details</h3>
                    <div style={styles.infoBox}>
                        <p>
                            <strong>Name :</strong> {user?.name}
                        </p>

                        <p>
                            <strong>Email :</strong> {user?.email}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "40px"
    },

    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "40px"
    },

    profileSection: {
        display: "flex",
        gap: "40px",
        flexWrap: "wrap",
        alignItems: "flex-start"
    },

    leftSection: {
        flex: "1",
        minWidth: "300px",
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },

    rightSection: {
        flex: "1",
        minWidth: "300px",
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },

    profileImage: {
        width: "180px",
        height: "180px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "5px solid #0d6efd"
    },

    form: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
    },

    infoBox: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        fontSize: "18px"
    }
};

export default ProfilePage;