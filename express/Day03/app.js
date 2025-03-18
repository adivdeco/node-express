
const { log } = require('console');
const express =  require ('express');
const send = require('send');
const app = express();

const foodItems = [
    { id: 1, food: 'Pizza', category: 'Italian', price: 999 },
    { id: 2, food: 'Sushi', category: 'Japanese', price: 1299 },
    { id: 3, food: 'Burger', category: 'American', price: 599 },
    { id: 4, food: 'Tacos', category: 'Mexican', price: 749 },
    { id: 5, food: 'Pasta', category: 'Italian', price: 899 },
    { id: 6, food: 'Ramen', category: 'Japanese', price: 1049 },
    { id: 7, food: 'Steak', category: 'American', price: 1599 },
    { id: 8, food: 'Burrito', category: 'Mexican', price: 699 },
    { id: 9, food: 'Sushi Rolls', category: 'Japanese', price: 1499 },
    { id: 10, food: 'Lasagna', category: 'Italian', price: 1149 },
    { id: 11, food: 'Fried Chicken', category: 'American', price: 849 },
    { id: 12, food: 'Quesadilla', category: 'Mexican', price: 579 },
    { id: 13, food: 'Spaghetti', category: 'Italian', price: 799 },
    { id: 14, food: 'Tempura', category: 'Japanese', price: 1399 },
    { id: 15, food: 'Hot Dog', category: 'American', price: 399 }
  ];
  
//   console.log(foodItems);
  

app.use(express.json());

app.get("/rest" , (req,res)=>{
    res.send(foodItems);
})

app.get("/rest/:id" , (req, res) => {
    const id = parseInt(req.params.id);
    const searchfood =foodItems.find(item=>item.id===id) 
    if (searchfood) {
        res.send({message:"food found", food:searchfood})
    }
    else{
        res.send({message:"no food of that id found..."})
    }
});

app.post("/rest" , (req,res)=>{
    foodItems.push(req.body);
    res.send({message:"food is added" , foodItems})
})

// app.post("/rest", (req, res) => {
//     const { food, category, price } = req.body;
    
//     if (!food || !category || !price) {
//         return res.status(400).send({ message: "All fields (food, category, price) are required" });
//     }

//     const newId = foodItems.length > 0 ? Math.max(...foodItems.map(item => item.id)) + 1 : 1;
//     const newFoodItem = { id: newId, food, category, price };
//     foodItems.push(newFoodItem);

//     res.status(201).send({ message: "Food added successfully", foodItems });
// });



app.delete("/rest/:id" , (req , res)=>{
    const id = parseInt(req.params.id);
    const searchfood =foodItems.findIndex(item=>item.id===id) 
     
    if (searchfood!==-1) {
        foodItems.splice(searchfood,1)
        res.send({message:"food id deleat sucessfully" , foodItems })
    }
    else{
        res.status(404).send({ error: "food of that id not found" });
    }
    
})











app.listen(3000, () => {
    console.log("localhost 3000");
});