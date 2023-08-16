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

  removeAll = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state

    const check = cartList.every(each => each.id !== product.id)
    console.log(check)

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

  incrementQuantity = id => {
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

  decrementQuantity = id => {
    const {cartList} = this.state

    const returnDecreaseQuantity = quantity => {
      if (quantity > 1) {
        return quantity - 1
      }

      return quantity
    }

    const updateQuantityOfItemInCartList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: returnDecreaseQuantity(each.quantity)}
      }
      return each
    })

    this.setState({cartList: updateQuantityOfItemInCartList})
  }

  deleteCartItem = id => {
    const {cartList} = this.state

    const filteredList = cartList.filter(remove => remove.id !== id)
    this.setState({cartList: filteredList})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            incrementQuantity: this.incrementQuantity,
            decrementQuantity: this.decrementQuantity,
            removeAll: this.removeAll,
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
      </BrowserRouter>
    )
  }
}

export default App
