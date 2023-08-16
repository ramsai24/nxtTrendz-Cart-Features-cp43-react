// import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  // class CartItem extends Component {               //* no use with commented code
  //   constructor(props) {                       //* no use with commented code
  //     super(props)                               //* no use with commented code
  //     const {cartItemDetails} = this.props       //* no use with commented code
  //     const {quantity} = cartItemDetails         //* no use with commented code
  //     this.state = {quantity}                    //* no use with commented code
  //   }

  //   increment = () => {                          //* no use with commented code
  //     this.setState(prev => ({quantity: prev.quantity + 1})) //* no use with commented code
  //   }

  //   onDecrementQuantity = () => {        //* no use with commented code
  //     const {quantity} = this.state  //* no use with commented code
  //     if (quantity > 1) {            //* no use with commented code
  //       this.setState(prevState => ({quantity: prevState.quantity - 1}))  //* no use with commented code
  //     }                              //* no use with commented code
  //   }                                //* no use with commented code

  //   render() {                         //* no use with commented code
  // const {quantity} = this.state    //* no use with commented code
  // console.log(quantity)            //* no use with commented code
  // return (                         //* no use with commented code
  <CartContext.Consumer>
    {value => {
      const {deleteCartItem, incrementQuantity, decrementQuantity} = value
      const {cartItemDetails} = props

      const {id, title, quantity, brand, price, imageUrl} = cartItemDetails

      const incrementItemQuantity = () => {
        incrementQuantity(id)
      }

      const decrementItemQuantity = () => {
        decrementQuantity(id)
      }

      const onDeleteCartItem = () => {
        deleteCartItem(id)
      }

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={title} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={decrementItemQuantity}
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={incrementItemQuantity}
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-delete-container">
              <p className="cart-total-price">Rs {price * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onDeleteCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onDeleteCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)
// )  //* no use with commented code
//   }      //* no use with commented code
// }     //* no use with commented code

export default CartItem
