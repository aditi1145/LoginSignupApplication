import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        // Here you can clear the authentication tokens and redirect the user to the login page
        localStorage.removeItem('token'); // example of token removal
        navigate('/login'); // redirect to login
    };
    const [message, setMessage] = useState("");
    // Add some simple styles
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            minHeight: '100vh',
            padding: '20px',
        },
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#3E1453',
            padding: '10px 20px',
            color: '#fff',
        },
        navTitle: {
            margin: 0,
            fontSize: '24px',
        },
        signOutButton: {
            backgroundColor: '#fff',
            color: '#3E1453',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '16px',
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginTop: '50px',
            padding: '20px',
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto',
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        axios
            .get('http://localhost:5000/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data.message);

                setMessage(JSON.stringify(response.data.message));
            })
            .catch((err) => {

                setMessage('Error fetching profile');
            });
    }, []);

    return (
        <div className="profile-container">
            {/* <div>
                { message && Object.keys(JSON.parse(message)).map((key) => (
                    <p key={key}>{key} : {JSON.parse(message)[key]}</p>
                ))}
            </div> */}
            <div style={styles.container}>
                <nav style={styles.navbar}>
                    <h1 style={styles.navTitle}>Dashboard</h1>
                    <button style={styles.signOutButton} onClick={handleSignOut}>Sign Out</button>
                </nav>

                <div style={styles.card}>
                    <h2>Welcome, {message && JSON.parse(message)['name']}!</h2>
                    <p><strong>Email:</strong> {message && JSON.parse(message)['email']}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
