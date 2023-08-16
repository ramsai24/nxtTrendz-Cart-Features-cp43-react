import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state

    const check = cartList.every(each => each.id !== product.id)
    // console.log(check)

    const updateQuantityOfItemInCartList = cartList.map(each => {
      if (each.id === product.id) {
        return {...each, quantity: each.quantity + product.quantity}
      }
      return each
    })

    if (check) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState({cartList: updateQuantityOfItemInCartList})
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updateQuantityOfItemInCartList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    // console.log(updateQuantityOfItemInCartList)
    this.setState({cartList: updateQuantityOfItemInCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const returnDecreaseQuantity = quantity => {
      if (quantity === 0) {
        return 0
      }
      return quantity - 1
    }

    const updateQuantityOfItemInCartList = cartList.map(each => {
      const isZero = returnDecreaseQuantity(each.quantity) === 0
      console.log(isZero)
      if (each.id === id) {
        if (!isZero) {
          return {...each, quantity: returnDecreaseQuantity(each.quantity)}
        }
        return 0
      }
      return each
    })
    // if (!cartList.includes(0)) { //wrong statement shouldn't use carList revise below and replace it with
    if (!updateQuantityOfItemInCartList.includes(0)) {
      this.setState({cartList: updateQuantityOfItemInCartList})
    } else {
      this.setState({cartList: []})
    }
    console.log(updateQuantityOfItemInCartList)
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const filteredList = cartList.filter(remove => remove.id !== id)
    this.setState({cartList: filteredList})
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </>
    )
  }
}

export default App
