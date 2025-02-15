const express = require("express");

const app = express();
const PORT = 3001;

const products = [
    { id: 1, name: "Mobile", category: "electronics", price: 100000 },
    { id: 2, name: "Sagdi", category: "electronics", price: 20000 },
    { id: 3, name: "Shirt", category: "fashion", price: 3000 },
    { id: 4, name: "Face-wash", category: "bodycare", price: 200 },
    { id: 5, name: "Watch", category: "fashion", price: 15000 }
];

app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

app.get("/products", (req, res) => {
    const category = req.query.category; 

    if (category) {
        const filteredProducts = products.filter(p => p.category.toLowerCase().trim() === category.toLowerCase().trim());
        
        if (filteredProducts.length > 0) {
            res.json(filteredProducts); 
        } else {
            res.status(404).json({ message: "No products found in this category" }); 
        }
    } else {
        res.json(products); 
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
