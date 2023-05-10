const express = require('express')
const cors = require('cors')
const products = require('./Product')


const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('welcome to ikxpress')
})

app.get('/products', (req, res) => {
    res.send(products)
})
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const productId = parseInt(id);

    const product = products.find((p) => p.id === productId);
    console.log(product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(product)
    res.status(200).send({product:product});
})
const port = process.env.PORT || 5000;

// Listen on the specified port
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});