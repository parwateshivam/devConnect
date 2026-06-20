import profile from "../assets/profileImg.png";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "lucide-react";

const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const { theme, setTheme } = useContext(ThemeContext);

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        dispatch(clearUser());
        toast.success("Logout successful");
        window.location.href = "/";
    };

    return (
        <nav className="navbar navbar-expand-lg shadow-sm px-4 py-3">
            <div className="container-fluid">
                {/* Logo */}
                <Link
                    to="/"
                    className="navbar-brand fw-bold fs-3 text-primary"
                >
                    DevConnect
                </Link>

                {/* Right Section */}
                <div className="d-flex align-items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        className="btn btn-outline-primary rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: "45px", height: "45px" }}
                        onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                        }
                    >
                        {theme === "light" ? (
                            <SunIcon size={20} />
                        ) : (
                            <MoonIcon size={20} />
                        )}
                    </button>

                    {/* Profile Image */}
                    <Link to="/profile" className="text-decoration-none">
                        <img
                            src={user?.profileImg || profile}
                            alt="profile"
                            className="rounded-circle border border-2 border-primary shadow-sm"
                            style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                cursor: "pointer"
                            }}
                        />
                    </Link>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogoutClick}
                        className="btn btn-danger px-4 fw-semibold"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;