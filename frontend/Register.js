import { useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Register(){
    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    function handleSubmit(event){
        event.preventDefault();

        fetch('https://localhost:5000/register', {
            METHOD:'POST',
            hraders:{'Content-type':'application/json'},
            body:JSON.stringify({username,password})
        })
    .then(response=>response.text())
    .then(()=>navigate('/'))
    }
    return(
        <form onSubmit ={handleSubmit} className='form'>
            <h1>Register</h1>
            <input placeholder='USERNAME' onChange={event=>setUserName(event.target.value)}/>
            <input type='password' placeholder='Password' onChange={event=>setPassword(event.target.value)}/>
       
       <button type='submit'>Register</button>
        </form>
    )
}

export default Register