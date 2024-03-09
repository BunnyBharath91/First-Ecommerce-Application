import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import ThankyouSection from './components/ThankyouSection'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const isPresent = cartList.some(eachItem => eachItem.id === product.id)

    if (isPresent) {
      const newList = cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          return {
            ...eachItem,
            quantity: eachItem.quantity + product.quantity,
          }
        }
        return eachItem
      })

      this.setState({
        cartList: newList,
      })
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({
      cartList: newList,
    })
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {
          ...eachItem,
          quantity: eachItem.quantity + 1,
        }
      }
      return eachItem
    })
    this.setState({
      cartList: newList,
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const selectedItem = cartList.filter(eachItem => eachItem.id === id)[0]
    if (selectedItem.quantity > 1) {
      const newList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {
            ...eachItem,
            quantity: eachItem.quantity - 1,
          }
        }
        return eachItem
      })
      this.setState({
        cartList: newList,
      })
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
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
          <ProtectedRoute exact path="/thankyou" component={ThankyouSection} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
