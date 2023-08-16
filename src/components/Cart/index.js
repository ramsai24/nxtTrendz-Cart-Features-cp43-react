import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import Checkout from '../Checkout'
import './index.css'
import EmptyCartView from '../EmptyCartView'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAll} = value
      const cartEmpty = cartList.length === 0

      return (
        <div className="cart-bg-container">
          <div className="header-cartListView">
            <Header />
            {cartEmpty ? (
              <EmptyCartView />
            ) : (
              <div className="cart-container">
                <div className="cart-content-container">
                  <div className="cart-Title-removeAllBtn">
                    <h1 className="cart-heading">My Cart</h1>
                    <button type="button" onClick={removeAll}>
                      Remove all
                    </button>
                  </div>
                  <CartListView />
                </div>
              </div>
            )}
            {/* {cartEmpty && <EmptyCartView />}(
          <div className="cart-container">
            <div className="cart-content-container">
              <h1 className="cart-heading">My Cart</h1>
              <CartListView /> //no use of this code
            </div>
          </div>
          ) */}
          </div>

          <div className="checkout-container">
            <Checkout />
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
