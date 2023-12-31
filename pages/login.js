
import React, { useState } from 'react'
import LoginForm from '../components/LoginForm';
import styles from '../styles/Index.module.css';

export default function Login() {
    //login teste, precisa linkar com o banco de dados

    const [user, setUser] = useState({ name: "", email: "" })
    const [erro, setError] = useState("");

    const Login = details => {
        console.log(details);
    }

    const Logout = () => {
        console.log("Logout");
    }

    return (
        <div className={styles.index}>
            {(user.email != "") ? (<div className="welcome">
                <h2>Welcome, <span>{user.name}</span></h2>
                <button>Logout</button>
            </div>
            ) : (

                <LoginForm />
            )}
        </div>
    )

}
