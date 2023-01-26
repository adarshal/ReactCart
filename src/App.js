import React from 'react';

import Cart from './Cart';
import Navbar from './Navbar';
// import Test from './Test';
// import * as firebase from 'firebase/compat/app';
import firebase from 'firebase/compat/app'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc,query,where } from "firebase/firestore";
import { db } from "./firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }
  }
 
  componentDidMount() {
    this.handleGetProducts()
  }


  //     }

  handleGetProducts = () => {
    // const productionCollection = collection(db, 'products'); //without query
     const productionCollection = query(collection(db, 'products'), where("price", ">", 99));
     //for query docs https://firebase.google.com/docs/firestore/query-data/queries

    //&&&&
    // getDocs(productionCollection).then(res => {
    //   // console.log(res.docs)
    //   const products = res.docs.map((doc) => {
    //     const data = doc.data();
    //     data['id'] = doc.id;
    //     return data;
    //   })

    //   this.setState({
    //     products //smae meaning as products:products,used when same names
    //     ,
    //     loading: false
    //   })
    // })
    //   .catch(err => console.log(err.message))
    //&&&&
    onSnapshot(productionCollection, (snapshot) => {
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data['id'] = doc.id;
        return data;
      })

      this.setState({
        products //smae meaning as products:products,used when same names
        ,
        loading: false
      })
    })

  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    // products[index].Qty += 1;
    // this.setState({
    //   products: products
    // })
    const docref=doc(db,'products',products[index].id)
    updateDoc(docref,{
      Qty:products[index].Qty+1
    })
    .then(()=>{
      console.log('doc updated succesfully');
    })
    .catch(err => console.log(err.message))
  }

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    const num = products[index].Qty;
    if (num === 0) {
      return;
    } else {
      // products[index].Qty -= 1;
      const docref=doc(db,'products',products[index].id)
    updateDoc(docref,{
      Qty:products[index].Qty-1
    })
    .then(()=>{
      console.log('doc updated succesfully');
    })
    .catch(err => console.log(err.message))
    }
    this.setState({
      products: products
    })
  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;
    // const items = products.filter((item) => item.id !== id)
    const docref=doc(db,'products',id);
    deleteDoc(docref)
    .then(()=>{
      console.log('doc deleted succesfully');
    })
    .catch(err => console.log(err.message))
    
    // this.setState({
    //   products: items
    // })

  }
  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.Qty;
    })

    return count;
  }
  getCartTotal = () => {
    const { products } = this.state;
    let total = 0;
    products.forEach((product) => {
      total += product.Qty * product.price;
    })

    return total;
  }
  addProduct = () => {
    const productionCollection = collection(db, 'products'); //it document refeffrence actually
    addDoc(productionCollection, {
      Qty: 31,
      img: '',
      title: 'gadget',
      price: 524
    })
      .then((docref)=>{
        console.log(docref)
      }) .catch(err => console.log(err.message))
  }



  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">

        <Navbar count={this.getCartCount()} />
        <button onClick={this.addProduct}> Add product</button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}

        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;