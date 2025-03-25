
const express =  require ('express');
const { Auth } = require('./middleware/auth');
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
  const foodcart = [

  ];


app.use(express.json());

app.use(("/rest" , (req,res)=>{

  const token = "123456";
   const acess = token ==="123456"? 1:0;

  if(!acces){
     res.send({message:"unauthorized"})
  }
  next();

}))

app.use(("/rest" , Auth))


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

// app.post("/rest" , (req,res)=>{
//     console.log(req.body);
//     foodItems.push(req.body);
//     res.send({message:"food is added" , foodItems})
    
// })

//                console.log(Math.max(...foodItems.map(item => item.id)));

// advance method by this it attomatic takes an id..
app.post("/rest", (req, res) => {
    const { food, category, price } = req.body;
    
    if (!food || !category || !price ) {
        return res.status(400).send({ message: "All fields (food, category, price) are required" });
    }
// advance code no need to add id , or by this no-repative id creates..
    const newId = foodItems.length > 0 ? Math.max(...foodItems.map(item => item.id)) + 1 : 1;
    const newFoodItem = { id:newId, food:food, category:category, price:price };
    foodItems.push(newFoodItem);
    res.status(201).send({ message: "Food added successfully", foodItems });
});

app.delete("/rest/:id" , (req , res)=>{
    const id = parseInt(req.params.id);
    const searchfood =foodItems.findIndex(item=>item.id===id) 
    console.log("id", id);
    
     
    if (searchfood!==-1) {
        foodItems.splice(searchfood,1)
        res.send({message:"food id deleat sucessfully" , foodItems })
    }
    else{
        res.status(404).send({ error: "food of that id not found" });
    }
    
})

app.patch("/rest/:id", (req, res) => {
    const { food, category, price } = req.body;
    const newid = parseInt(req.params.id);
    const foodIndex = foodItems.findIndex(item => item.id === newid);

    if (foodIndex !== -1) {
        if (food) foodItems[foodIndex].food = food;
        if (category) foodItems[foodIndex].category = category;
        if (price) foodItems[foodIndex].price = price;

        res.status(200).send({ message: "Food data updated successfully", foodItems });
    } else {
        res.status(404).send({ error: "Food item with the given ID not found" });
    }
});
// patch for some change

app.put("/rest/:id" , (req,res)=>{
    const {food , category , price} = req.body;
    const newid = parseInt(req.params.id);
    const foodindex = foodItems.findIndex(item=>item.id===newid);
    
if (foodindex!==-1) {
    foodItems[foodindex]= {id : newid ,food:food,category:category,price:price}
    res.status(201).send({message:"food data change sucessfily" , foodItems})
}
 else{
        res.status(404).send({ error: "Food item with the given ID not found" });
 }  
})
// full data change...if use half data rest data deleat or only update data shown..







// cart system

app.get("/cart" , (req,res)=>{
    res.send({message:"hello" ,foodcart})
})


app.post("/cart/:id" , (req , res)=>{
    const id = parseInt(req.params.id)
    const index = foodItems.find(item=>item.id === id);

    if(index!==-1){
        const newId = foodcart.length > 0 ? Math.max(...foodcart.map(item => item.id)) + 1 : 1;
        const newFood = { id: newId, food: index.food, category: index.category, price: index.price };
        foodcart.push(newFood);
       res.send({message:"food add in cart" , foodcart})
    }
    else {
    
        res.send({ message: "Food added to cart", foodcart });
    }


})

app.delete("/cart/:id" , (req , res)=>{

    const id = parseInt(req.params.id)
    const index = foodcart.findIndex(item=>item.id===id);

    if(index!== -1){
        foodcart.splice(index,1);
        res.send({message:"food deleat from cart" , foodcart})
    }
    else{
        res.send({message:"nothin found of that id in cart"})
    }

})










app.listen(3000, () => {
    console.log("localhost 3000");
});