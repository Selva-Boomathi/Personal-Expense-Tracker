const express= require('express')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
const db=require('./database')
const cors=require('cors')

const app=express()
app.use(express.json())
app.use(cors())

app.get('/', (request,response)=>{
    response.send('Running Successfully')
})

const SECERT='secretKey'
function authenticationToken (request,response,next){
    const header=request.headers.authorization;
    if(!header) {
        return response.status(401).send('Access Denied');}

      const token= header.split(' ')[1] 
      
      try {

    
    const decode= jwt.verify(token, SECERT);
    request.userID= decode.id;
    next();
      }
      catch(error){
        response.status(400).send('Invalid Token')
      }

    
}

//Register

app.post("/register", async (request, response) => {
  const {  name, password, email } = request.body;
  const hashedPassword = await bcrypt.hash(password,10);
  const query= `
      INSERT INTO 
        users ( name, password, email) 
      VALUES ('${name}', '${email}', '${hashedPassword}')`;
      db.run(query,
    function (error){
            if (error) {
                return response.status(400).json({error:'User Exists'})
                
            }
            else{
                response.json({message:'Registered Successfully'})
            }
        }
  
)
});

//Login 

app.post('/login', async(request,response)=>{
    const {email,password} = request.body;
    const query=`SELECT * FROM users WHERE email='${email}'`

    db.get(query,async(error,user)=>{
        if(!user){
            return response.status(400).send('Invalid Email')
            
        }
        const valid=await bcrypt.compare(password,user.password);
        if(!valid){
            return response.status(400).send('Incorrect Password')
        }
        const token= jwt.sign({id:user.id},
            SECERT
        );
        response.send({message:'Login Successful', token:token})
    })
})
// ADD 

app.post('/transactions', authenticationToken,(request,response)=>{
    const {title,amount,type,date,category}= request.body
    const query=`INSERT INTO transaction (userId,titlt,amount,category,date) VALUES ('${request.user.id}','${title}', ${amount}, '${category}','${date}')`;
    db.run(query,function(error){
        if(error){
            return response.status(400).send('Failed to Add')
        }
        else {
            response.send('Added Successfully')
        }
    })
})

//EDIT 

app.put('/transactions/:id', authenticationToken,(request,response)=>{
    const {title,amount,category,date} = request.body;
    const query=`UPDATE transactions SET title='${title},
    amount=${amount},
    category='${category}',
    date='${date}',
    WHERE id=${request.params.id} AND userId=${request.userId}`
    db.run(query,function(error){
        response.send('Updated Successfully')
    })
})

//Get Transaction 

app.get('/transactions', authenticationToken, (request,response)=>{
    const query=`SELECT * FROM transactions WHERE userId=${request.user.id}`;

    db.all(query, (error,message)=>{
        if(error){
            return response.status(400).send('Fecth Failed')
        }
        else{
            return response.send (message)
        }
    })
})
// DELETE 

app.delete('/transcations/:id', authenticationToken,(request,response)=>{
    const uniqueId=request.params.id;
    const query=`DELETE FROM transactions WHERE id ='${uniqueId}`;
    db.run(query, function(error){
        if(error){
            return response.status(400).send('Failed To Delete')
        }
        else{
            response.send('Deleted Succesfully')
        }
    })
})

//Dashbord
app.get('/dashboard',authenticationToken,(request,rsponse)=>{
    const query=`SELECT SUM(amount) as total FROM transcattions WHERE userId=${request.userId}`;
    db.get(query,(error,total)=>{
        db.all(`SELECT category, SUM(amount) as total FROM transactions WHERE userId=${request.userId}
            GROUP BY category`), (error,breakdown)=>{
                db.all(`SELECT * FROM transactions WHERE userId=${request.userId} ORDER BY date DESC LIMIT 5`, (error,recent)=>{
                    response.send({total:total.total || 0,
                        breakdown,
                        recent
                    })
                })
            }

    })
})

app.listen(5000,()=>
console.log('Server running on https://localhost:5000/'))