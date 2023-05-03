import './index.css'

const SimilarProductItem = props => {
  const {each} = props
  const {title, brand, imageUrl, rating, price} = each
  return (
    <li className="Similar-product-item">
      <img src={imageUrl} alt="similar product" className="Similar-thumbnail" />
      <h1 className="Similar-title">{title}</h1>
      <p className="Similar-brand">by {brand}</p>
      <div className="Similar-product-details">
        <p className="Similar-price">Rs {price}/-</p>
        <div className="Similar-rating-container">
          <p className="Similar-rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="Similar-star"
          />
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
