import API from '../API/api.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){
    const navigate = useNavigate();
    const [ formdata, setFormdata ] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e)=>{
        setFormdata({...formdata, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        let res = await API.post('/auth/login', formdata);
        navigate('/dashboard');
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type='email' name='email' onChange={handleChange} placeholder='Email'></input>
            <input type='password' name='password' onChange={handleChange} placeholder='Password'></input>
            <button type='submit'>Login</button>
        </form>
        </>
    );
}

export default Login;