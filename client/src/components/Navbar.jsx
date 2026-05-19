import profile from "../assets/profileImg.png";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        dispatch(clearUser());
        toast.success("Logout successful");
        window.location.href = "/";
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
                    <Link
                        to="/profile"
                        style={{ textDecoration: "none" }}
                    >
                        <div style={styles.profileContainer}>

                            <img
                                style={styles.profileImage}
                                src={user?.profileImg || profile}
                                alt="profile"
                            />

                        </div>
                    </Link>

                    {/* logout button */}
                    <button
                        onClick={handleLogoutClick}
                        className="btn btn-primary"
                    >
                        Logout
                    </button>

                </div>

            </div>
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
    }
};

export default Navbar;