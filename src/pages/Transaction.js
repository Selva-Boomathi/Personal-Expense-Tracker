import React, {Component} from 'react'
class Transactions extends Component{
    state={
        title:'',
        amount:'',
        category:'',
        date:'',
        type:'',
        transactions:[]
    }
    add =()=>{
        if(!this.state.title || !this.state.amount || !this.state.category || !this.state.date || !this.state.type ){
            alert('Please Enter a title and amount')
            return
        }
        const newTrans={
            title:this.state.title,
            amount:this.state.amount,
            category:this.state.category,
            type:'Expense',
            date:this.state.date,
            id:Date.now()
        }
        this.setState({transactions:[...this.state.transactions, newTrans],title:'',amount:'',category:'',date:'',type:'Expense'})
    }

    delete=(id)=>{
        const update=this.state.transactions.filter((t)=>t.id !== id)
        this.setState({transactions:update})
    }
    calculateTotals =()=>{
        let income=0;
        let expense=0;
        this.state.transactions.forEach((t)=>{
            if(t.type==='Income'){
                income+=t.amount
            }else{
                expense+=t.amount
            }
        })
        return {
            income,
            expense,
            balance:income-expense
        }
    }
    render(){
        const totals=this.calculateTotals()
        return(
            <div className='container'>
                <div className='summaryConatiner'>
                    <div className='style-card'>
                        <h1>Total Amount</h1>
                        <p>${totals.income}</p>
                    </div>
                    <div className='style-card'>
                        <h1>Total Expense</h1>
                        <p>${totals.expense}</p>
                    </div>
                    <div className='style-card'>
                        <h1>Balance</h1>
                        <p>${totals.balance}</p>
                    </div>
                </div>
                <h1>Transaction</h1>
                <input type='text' placeholder='Title' value={this.state.title} onChange={(event)=>this.setState({title:event.target.value})}/>
           
           <input type='number' placeholder='Amount' value={this.state.amount} onChange={(event)=>this.setState({amount:event.target.value})}/>
           <input type='text' placeholder='Category' value={this.state.category} onChange={(event)=>this.setState({category:event.target.value})}/>
          <input type='date' placeholder='Date' value={this.state.date} onChange={(event)=>this.setState({date:event.target.value})}/>
           <select value={this.state.type} onChange={(event)=>this.setState({type:event.target.value})}><option>Expense</option> <option>Income</option></select>
           
           <button onClick={this.add}>Add</button>
           
    </div>)
    }

}
export default Transactions