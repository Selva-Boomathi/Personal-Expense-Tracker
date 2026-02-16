import React, {Component} from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transaction'

class App extends Component {
  state={
    page:'login'
  }
  changePage=(name)=>{
    this.setState({page:name})
  }
  render(){
    
      if(this.state.page==='login'){

        return <Login changePage={this.changePage}/>
      }
     if(this.state.page==='register'){

        return <Register changePage={this.changePage}/>
      }
     if(this.state.page==='dashboard'){

        return <Dashboard changePage={this.changePage}/>
      }
      if(this.state.page==='transactions'){
        return <Transactions changePage={this.changePage}/>
      }
       return null
  }
}
export default App






