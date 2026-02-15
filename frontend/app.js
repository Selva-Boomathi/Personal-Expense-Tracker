import {BrowserRouter,Router,Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/login'


import './App.css'

function App(){
    return (
        <BrowserRouter>
        <Navbar/>
        <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      





        </Routes>
        
        
        
        
        
        </BrowserRouter>
    )
}
export default App



