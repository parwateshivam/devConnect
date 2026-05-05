import { Link } from "react-router-dom";

const Navbar = () => {
    const handleClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };
    return (
        <div style={styles.nav}>
            <h2>DevConnect</h2>
            <div>
                <button onClick={() => handleClick()} className="btn btn-primary">
                    Logout
                </button>
            </div>
        </div>
    );
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#222",
        color: "#fff"
    }
};

export default Navbar;