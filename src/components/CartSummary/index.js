import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalValue = cartList.reduce(
        (accumulator, eachItem) =>
          accumulator + eachItem.quantity * eachItem.price,
        0,
      )

      return (
        <div className="cart-summary-container">
          <h1 className="cart-summary-heading">
            Order Total: <span className="total-value">Rs {totalValue}/-</span>
          </h1>
          <p className="cart-summary-description">
            {cartList.length} items in cart
          </p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
