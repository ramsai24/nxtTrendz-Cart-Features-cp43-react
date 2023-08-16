import CartContext from '../../context/CartContext'
import './index.css'

const Checkout = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const orderTotal = () => {
        const costList = cartList.map(each => each.price * each.quantity)

        const costOfTotalItems = costList.reduce((each, accum) => each + accum)

        return costOfTotalItems
      }

      return (
        (cartList.length > 0 || cartList.includes(null)) && (
          <div className="total-cartLen-checkoutBtn-container">
            <h1>Order Total :{orderTotal()}/-</h1>
            <p>{cartList.length} Items in Cart</p>
            <button type="button">CheckOut</button>
          </div>
        )
      )
    }}
  </CartContext.Consumer>
)
export default Checkout
