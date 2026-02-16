import React, {Component} from 'react'
class Login extends Component {
    state={
        email:'',
        password:'',
        text:''
    };
    handleSubmit=(event)=>{
        event.preventDefault();
    
    if (
        this.state.email==='admin@gmail.com' && this.state.password==='12345'
    ){
    
        this.props.changePage('dashboard')
    }else{
        this.setState({text:'Invalid Email or Password'})
    }
}
render(){
    return(
        <div className='login-container'>
            <div className='card'>
                <h1>Personal Expense Tracker</h1>

                <form onSubmit={this.handleSubmit}>
                 
                 <input type='email' placeholder='Enter Email' value={this.state.email} onChange={(event)=>this.setState({email:event.target.value})}/>

                 <input type='password' placeholder='Enter Password' value={this.state.password} onChange={(event)=>this.setState({password:event.target.value})}/>


<button type='submit'>Login</button>

   


                </form>
                <p className='error'>{this.state.text}</p>
                  <button onClick={()=>this.props.changePage('register')}>Don't have account? Register!</button>  
            </div>
            
        </div>
    )
}
}
export default Login