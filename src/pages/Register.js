import React, {Component} from 'react'
class Register extends Component{
    state={
        name:'',
        email:'',
        password:'',
        text:''
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        
      if (
        this.state.name&&
        this.state.email&&
        this.state.password
      )  {
        this.setState({
            text:'Registered Successfully'
        })
        setTimeout(()=>{
            this.props.changePage('Login')},1000)
      } else{
        this.setState({text:'Please fill all details'})
      }
    }


    render(){
    return(
        <div className='login-container'>
            <div className='card'>
                <h1>Register</h1>

                <form onSubmit={this.handleSubmit}>
                 
                 <input type='email' placeholder='Enter Email' onChange={(event)=>this.setState({email:event.target.value})}/>

                 <input type='password' placeholder='Enter Password'  onChange={(event)=>this.setState({password:event.target.value})}/>

                <input type='text' placeholder='Name' onChange={(event)=>this.setState({name:event.target.value})}/>
<button type='submit'>Login</button>





                </form>
                <p className='error'>{this.state.text}</p>
                <button onClick={()=>this.props.changePage('login')}>Back to Login</button>
            </div>
        </div>
    )
}
}
export default Register
