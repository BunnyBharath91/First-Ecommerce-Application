import {withRouter} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalValue = cartList.reduce(
        (accumulator, eachItem) =>
          accumulator + eachItem.quantity * eachItem.price,
        0,
      )

      const onCheckout = () => {
        const {history} = props
        history.replace('/thankyou')
      }

      return (
        <div className="cart-summary-container">
          <h1 className="cart-summary-heading">
            Order Total: <span className="total-value">Rs {totalValue}/-</span>
          </h1>
          <p className="cart-summary-description">
            {cartList.length} items in cart
          </p>
          <button
            type="button"
            className="checkout-button"
            onClick={onCheckout}
          >
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(CartSummary)
