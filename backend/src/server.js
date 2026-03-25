import express from 'express';
import cors from 'cors';
import authRoutes from "../routes/authRoutes.js"
import uploadRoutes from "../routes/uploadRoutes.js"

const app=express();
const port=3000;

app.use(cors());
app.use(express.json());//middleware


app.get('/',(req,res)=>{
    res.send('<h1>hello</h1>');
    });

app.use("/api/auth",authRoutes);//connnect route in server
app.use("/api/upload",uploadRoutes);
app.use("/uploads",express.static("uploads"));//to make it acceesible on web (uploads : the folder name)


app.listen(port, ()=>{
    console.log(`Server is listening at http://localhost:${port}`);
})