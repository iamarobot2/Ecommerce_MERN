require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.port || 3800
const mongoose = require("mongoose");
const cors = require('cors');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(express.json());

main().then(()=>{console.log("Databse Connected Successfully !")}).catch(err=>console.log(err));
async function main()
{
    const url = process.env.DB_URL
    const password = process.env.DB_PASSWORD
    const connectionString = url.replace('<password>',password)
    await mongoose.connect(connectionString)
}

app.post('/signup',async (req,res)=>
{
    try
    {
    
        const existinguser = await User.find({email:req.body.email}).exec();
        if(existinguser.length==0)
        {
            const hashpswd =await bcrypt.hash(req.body.password, saltRounds)
            const user = new User(
                {
                    name:req.body.name,
                    email:req.body.email,
                    password:hashpswd
                }
            )
            console.log(user)
            await user.save()
            res.status(201).json({newuser:true,user:user}) 
        }
        else
        {
            res.status(200).json({newuser:false});  
        }
    }
    catch(err)
    {
        res.status(500).json(err)
    }
})

app.post('/login',async (req,res)=>{
    try
    {
        const user = await User.findOne({email:req.body.email}).exec();
        if(user)
        {
            const validPassword =bcrypt.compareSync(req.body.password, user.password)
            if(validPassword)
            {
                const token = jwt.sign(
                    {
                        _id:user.id,
                        name:user.name
                    },
                    process.env.TOKEN_SECRET
                )
                return res.status(200).json({userfound:true,validate:true,user:user,token:token})
            }
            else
            {
                return res.status(200).send({userfound:true,validate:false})
            }
        }
        else
        {
            return res.status(401).send({userfound:false})
        }
    }
    catch(err)
    {
        res.status(500).json(err)
    }
});

app.listen(port, () => 
{
    console.log(`App Listening on port ${port}`)
});