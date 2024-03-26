import React, { useState, useEffect } from 'react';
import Axios from "axios";

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3006/user")  
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
            });
    }, []);

    return (
        <>
            {users.map(user => (
                <div key={user._id}> {/* Assurez-vous d'utiliser une clé unique pour chaque élément */}
                    <ul>
                        <li>{user.id}</li>
                        <li>{user.description}</li>
                    </ul>
                </div>
            ))}
        </>
    );
}

export default App;
