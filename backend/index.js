import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const db = mysql.createConnection({
    host: "Localhost",
    user: "root",
    password: "Dev@db@5955",
    database:"test"
})    // connecting node js to mySql

// if there is authentication problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; // in mysql workbench

app.use(express.json());  // express server middlewar this is used beacuse we cannot send any data to express server. So this will alowo to send any json file using client

app.use(cors());

app.get("/", (req,res)=>{
    res.json("Hello this is backend");
})  // api request using express server 

app.get("/books", (req,res)=>{
    const q= "SELECT * FROM books"; //to get all the books 
    db.query(q, (err,data)=>{
        if (err)
        return res.json(err);
        return res.json(data);

    })
})    // client want to get the data from database that is why app.get

app.post("/books", (req, res)=>{
    const q ="INSERT INTO books  ( `title`, `desc`,`price`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,   // body from postman
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data)=>{
        if (err)
        return res.json(err);
        return res.json("Book has been created successfully");
    })
})    // client is send data in the database that is why app.post 

app.delete("/books/:id", (req,res)=>{
    const bookId= req.params.id; // params represent this url
    const q ="DELETE FROM books WHERE id =?";
    db.query(q, [bookId], (err, data)=>{
        if(err)
        return res.json(err);
        return res.json("Book has been deleted successfully.")
    })
})

app.put("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q ="UPDATE books SET `title`=?, `desc`=?, `price`=?, `cover`=? WHERE id=?";
    const values=[
        req.body.title,
        req.body.desc,   // body from postman
        req.body.price,
        req.body.cover,
    ]
    db.query(q, [...values, bookId], (err, data)=>{
        if(err)
        return res.json(err);
        return res.json("The book has been updated sccussfully.")
    })
})

app.listen(8800, ()=>{
    console.log(" Connected to database!")
})