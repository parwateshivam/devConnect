import { useState } from "react";
import profileImage from "../assets/profileImg.png";
import { useSelector } from "react-redux";

const Navbar = () => {
    const [profileModal, setProfileModal] = useState(false);

    // correct useSelector usage
    const user = useSelector((state) => state.user.user);

    console.log(user);

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <>
            {/* navbar container */}
            <div style={styles.nav}>

                {/* logo container */}
                <div>
                    <h2>DevConnect</h2>
                </div>

                {/* Profile container */}
                <div className="d-flex justify-content-center align-items-center gap-3">

                    <div
                        onClick={() => setProfileModal(true)}
                        style={styles.profileContainer}
                    >
                        <h6>{user?.name || "-"}</h6>

                        <img
                            style={styles.profileImage}
                            src={profileImage}
                            alt="profile"
                        />
                    </div>

                    <button
                        onClick={handleLogoutClick}
                        className="btn btn-primary"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* profile modal */}
            {profileModal && (
                <>
                    {/* backdrop */}
                    <div className="modal-backdrop fade show"></div>

                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">

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

                                <div className="modal-body">
                                    <p>Name: {user?.name}</p>
                                    <p>Email: {user?.email}</p>
                                </div>

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
            )}
        </>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#222",
        color: "#fff"
    },

    profileContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer"
    },

    profileImage: {
        width: "40px",
        height: "40px",
        borderRadius: "50%"
    }
};

export default Navbar;