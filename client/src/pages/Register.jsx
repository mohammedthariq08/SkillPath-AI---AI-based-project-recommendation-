import API from '../API/api.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register(){
    const navigate = useNavigate();
    const [ formdata, setFormdata ] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e)=>{
        setFormdata({...formdata, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        let res = await API.post('/auth/register',formdata);
        navigate('/login');
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type='text' name='name' onChange={handleChange} placeholder='Name'></input>
            <input type='email' name='email' onChange={handleChange} placeholder='Email'></input>
            <input type='password' name='password' onChange={handleChange} placeholder='Password'></input>
            <button type='submit'>Register</button>
        </form>
        </>
    );
}
export default Register;