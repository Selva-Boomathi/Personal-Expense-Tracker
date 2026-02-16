import React, {Component} from 'react'

class Dashboard extends Component{
    render(){
        return(
        <div className='container'>
            <h1>Dashboard</h1>
         <div className='summary'>
            <h2>Total Expense:$ 2500</h2>
         </div>
         <button onClick={()=>this.props.changePage('transactions')}>View Transactions</button>
        <button onClick={()=>this.props.changePage('login')}>Log Out</button>
        
        </div>
    )}
}
export default Dashboard