import { useState } from "react";
import profile from "../assets/profileImg.png";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../redux/slices/userSlice";
import { uploadProfileImg } from "../api/api";
import { toast } from "react-toastify";

const Navbar = () => {
    const [profileModal, setProfileModal] = useState(false);
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        dispatch(clearUser());
        toast.success("Logout successful");
        window.location.href = "/";
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
            setProfileModal(false);
            setImage(null);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to upload profile image"
            );
        }
    };

    return (
        <>
            {/* navbar */}
            <div style={styles.nav}>

                {/* logo */}
                <div>
                    <h2>DevConnect</h2>
                </div>

                {/* right section */}
                <div className="d-flex align-items-center gap-3">
                    {/* profile image */}
                    <div
                        onClick={() => setProfileModal(true)}
                        style={styles.profileContainer}
                    >

                        <img
                            style={styles.profileImage}
                            src={user?.profileImg || profile}
                            alt="profile"
                        />

                    </div>

                    {/* logout button */}
                    <button
                        onClick={handleLogoutClick}
                        className="btn btn-primary"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* modal */}
            {
                profileModal && (
                    <>
                        {/* backdrop */}
                        <div className="modal-backdrop fade show"></div>

                        <div
                            className="modal fade show d-block"
                            tabIndex="-1"
                        >

                            <div className="modal-dialog modal-dialog-centered">

                                <div
                                    className="modal-content"
                                    style={styles.modalContent}
                                >

                                    {/* modal header */}
                                    <div className="modal-header">

                                        <h5 className="modal-title">
                                            Profile
                                        </h5>

                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setProfileModal(false)}
                                        ></button>

                                    </div>

                                    {/* modal body */}
                                    <div className="modal-body">

                                        <div style={styles.profileSection}>

                                            {/* upload box */}
                                            <div style={styles.uploadProfileImageBox}>

                                                <form
                                                    className="d-flex flex-column gap-3 align-items-center"
                                                    onSubmit={handleProfileSubmit}
                                                >

                                                    {/* preview image */}
                                                    <img
                                                        src={
                                                            image
                                                                ? URL.createObjectURL(image)
                                                                : user?.profileImg || profile
                                                        }
                                                        alt="profile"
                                                        style={styles.largeProfileImage}
                                                    />

                                                    {/* file input */}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        style={styles.fileInput}
                                                    />

                                                    {/* upload button */}
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        Upload
                                                    </button>

                                                </form>

                                            </div>

                                            {/* user info */}
                                            <div style={styles.userInfo}>

                                                <p>
                                                    <strong>Name:</strong> {user?.name}
                                                </p>

                                                <p>
                                                    <strong>Email:</strong> {user?.email}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    {/* modal footer */}
                                    <div className="modal-footer">

                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setProfileModal(false)}
                                        >
                                            Close
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </>
                )
            }
        </>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: "#222",
        color: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
    },

    profileContainer: {
        cursor: "pointer",
        background: "#00ff00",
        padding: "2px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    profileImage: {
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        objectFit: "cover"
    },

    largeProfileImage: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "4px solid #0d6efd"
    },

    profileSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px 10px"
    },

    userInfo: {
        width: "100%",
        textAlign: "left",
        background: "#f8f9fa",
        padding: "15px",
        borderRadius: "10px"
    },

    uploadProfileImageBox: {
        width: "250px",
        minHeight: "250px",
        border: "3px dashed #ccc",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "#f8f9fa"
    },

    fileInput: {
        width: "200px",
        fontSize: "14px"
    },

    modalContent: {
        borderRadius: "15px",
        overflow: "hidden"
    }
};

export default Navbar;