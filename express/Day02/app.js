
const express = require('express');
const { parse } = require('path');
const app = express()


const port = 4000

const bookstore = [
    { id: 1, bookName: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, bookName: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, bookName: "1984", author: "George Orwell" },
    { id: 4, bookName: "Moby-Dick", author: "Herman Melville" },
    { id: 5, bookName: "Pride and Prejudice", author: "Jane Austen" },
    { id: 6, bookName: "War and Peace", author: "Leo Tolstoy" },
    { id: 7, bookName: "The Catcher in the Rye", author: "J.D. Salinger" },
    { id: 8, bookName: "The Hobbit", author: "J.R.R. Tolkien" },
    { id: 9, bookName: "The Alchemist", author: "Paulo Coelho" }
]
// middleware help to change json --> js object...
app.use(express.json())



app.get("/book" , (req,res)=>{
    res.send(bookstore);
})

app.get("/book/:id" , (req,res)=>{
    // console.log(req.params);
    // res.send("gya?")               // to check

    const id = parseInt(req.params.id);
    const book = bookstore.find(item=>item.id===id)

    if (book !== -1){
        res.send({message:"hear is your book" , book})
    }
 else {
    res.status(404).send({ error: "Book not found" });
  }
    
})

app.post("/book" , (req ,res)=>{

    console.log(req.body);
    bookstore.push(req.body);
    res.send({message:"data saved..!.." , bookstore});
})


app.delete("/book/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = bookstore.findIndex(item => item.id === id);
  
    if (bookIndex !== -1) {
      bookstore.splice(bookIndex, 1);
      res.send({ message: "Book deleted successfully", bookstore });
    } else {
      res.status(404).send({ error: "Book not found" });
    }
  });
  




//   


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});