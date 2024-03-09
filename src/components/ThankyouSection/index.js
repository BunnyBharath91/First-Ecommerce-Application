import {Link} from 'react-router-dom'
import './index.css'

const ThankyouSection = () => (
  <div className="thankyou-container">
    <img
      alt="order placed img"
      src="https://www.sender.net/wp-content/uploads/2023/02/b079-order-confirmation-email-template-small-1024x658.webp"
      className="order-placed-img"
    />

    <Link to="/products">
      <button type="button" className="shop-now-btn">
        Shop More
      </button>
    </Link>
  </div>
)

export default ThankyouSection
