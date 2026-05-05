import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, []);

    console.log(user);

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.feed}>
                    <h3>Feed</h3>

                    <div style={styles.card}>
                        <p><b>User Name</b></p>
                        <p>This is a sample post...</p>
                    </div>

                </div>

                <div style={styles.sidebar}>
                    <h3>Profile</h3>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email} {user.isVerified && <span style={{ color: "green" }}>(Verified)</span>}</p>
                    <p>Skills</p>
                </div>
            </div>
        </>
    );
};

const styles = {
    container: {
        display: "flex",
        gap: "20px",
        padding: "20px"
    },
    feed: {
        flex: 2
    },
    sidebar: {
        flex: 1,
        borderLeft: "1px solid #ccc",
        paddingLeft: "10px"
    },
    card: {
        border: "1px solid #ddd",
        padding: "10px",
        marginTop: "10px"
    }
};

export default Dashboard;