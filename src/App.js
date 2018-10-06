import React, { Component } from 'react';
import './App.css';
import ProductItem from './ProductItem';
import AddItem from './AddItem';


const products = [
  {
    name: 'Dell Laptop',
    price: 850
  },
  {
    name: 'iPhone',
    price: 600
  },
  {
    name: 'Samsung Galaxy',
    price: 735
  }
]

localStorage.setItem('products', JSON.stringify(products))

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products:  JSON.parse(localStorage.getItem('products'))
    };
    this.onDelete = this.onDelete.bind(this);
    this.onAdd = this.onAdd.bind(this)
    this.onEditSumbmit = this.onEditSubmit.bind(this);
  }
  componentWillMount() {
    const products = this.getProducts();
    this.setState({products});
  }

  //get items
  getProducts() {
    return this.state.products;    
  }
  //adding items
  onAdd(name, price) {
    const products = this.getProducts();
    products.push({
      name,
      price
    });
    this.setState({ products });
    
  }
  //delete items
  onDelete(name) {
    const products = this.getProducts();
    const filteredProducts = products.filter(product => {
      return product.name !== name;
    });
    this.setState({ products: filteredProducts });

  }

  onEditSubmit(name, price, originalName) {
    let products = this.getProducts();
    products = products.map(product => {
      if (product.name === originalName){
        product.name = name;
        product.price = price;
      }
      return product;
    });
    this.setState({ products });

  }
  
  render() {    
    
    return (
      <div className="App">
        <h1>C.r.u.d with React</h1>
          <AddItem 
            onAdd={this.onAdd}
          />
        {
          this.state.products.map(product => {
            return (
              <ProductItem 
                key={product.name}
                {...product}
                onDelete={this.onDelete}
                onEditSubmit={this.onEditSubmit}
              />
            )
          })
        }
        
      </div>
    );
  }
}

export default App;
