import React from 'react';

class CartItem extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "mobile",
            price: "9999",
            Qty: "1"
        }
        this.increaseHandleOld=this.increaseHandleOld.bind(this); //used arrow function instead
            
        }
        decreaseQty = () => {
            console.log(this.state,'dec')
        }
    
    increaseHandleOld() {
        console.log(this.state);
        {// this used when caller have used with bind ,as withou bind this is not paased// we can bind from caller or from constructor// if dont wat paasing use arrow fun which inherits this
        }
    }
    render() {
        const { title, price, Qty } = this.state;
        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image} />
                </div>
                <div className="right-block">
                    <div style={{ fontSize: 25 }}>{title}</div>
                    <div style={{ color: '#777' }}>Rs {price}</div>
                    <div style={{ color: '#777' }}>Qty: {Qty}</div>
                    <div className="cart-item-actions">
                        {/* Buttons */}
                  <img alt="increase" className="action-icons" src="https://cdn-icons-png.flaticon.com/512/992/992651.png" onClick={this.increaseHandleOld} />
      <img alt="decrease" className="action-icons" src="https://cdn-icons-png.flaticon.com/512/992/992683.png" onClick={this.decreaseQty}/>
                  <img className="action-icons" alt="delete" src="https://cdn-icons-png.flaticon.com/512/3439/3439691.png" onMouseOver={()=>console.log('sdfds')}/>

                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc'
    }
}

export default CartItem;