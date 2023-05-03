import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    similarProductDetails: [],
    count: 1,
    status: '',
    loader: false,
  }

  componentDidMount() {
    const {history} = this.props
    const path = history.location
    const pathName = path.pathname
    this.getProductsDetails(pathName)
  }

  getProductsDetails = async pathName => {
    const jwtToken = Cookie.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in${pathName}`
    const response = await fetch(url, options)
    const jsonData = await response.json()

    if (response.ok === true) {
      const productData = {
        availability: jsonData.availability,
        brand: jsonData.brand,
        description: jsonData.description,
        id: jsonData.id,
        imageUrl: jsonData.image_url,
        price: jsonData.price,
        rating: jsonData.rating,
        title: jsonData.title,
        totalReviews: jsonData.total_reviews,
      }

      const similarData = jsonData.similar_products.map(each => ({
        availability: each.availability,
        brand: each.brand,
        description: each.description,
        id: each.id,
        imageUrl: each.image_url,
        price: each.price,
        rating: each.rating,
        title: each.title,
        totalReviews: each.total_reviews,
      }))

      this.setState({
        productDetails: productData,
        similarProductDetails: similarData,
        loader: true,
      })
    } else {
      this.setState({status: false})
    }
  }

  minusButton = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  addButton = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  noProductFound = () => (
    <>
      <Header />
      <div className="no-product-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
          className="error-view"
        />
        <h1 className="no-product-head">Product Not Found</h1>
        <Link to="/products">
          <button type="button" className="continue-shopping">
            Continue Shopping
          </button>
        </Link>
      </div>
    </>
  )

  render() {
    const {
      productDetails,
      similarProductDetails,
      count,
      loader,
      status,
    } = this.state
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      title,
      totalReviews,
    } = productDetails

    if (status === false) {
      return this.noProductFound()
    }
    return (
      <>
        <Header />
        {loader === true ? (
          <>
            <div className="product-container">
              <img src={imageUrl} alt="product" className="product-img" />
              <div className="card-details">
                <h1 className="product-heading">{title}</h1>
                <p className="price">Rs {price}/-</p>
                <div className="rate-tab">
                  <div className="rating-container">
                    <p className="rating-para">{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="rating-star"
                    />
                  </div>
                  <p className="total-reviews">{totalReviews} Reviews</p>
                </div>
                <p className="description">{description}</p>
                <p className="availability">
                  <span className="element">Available: </span>
                  {availability}
                </p>
                <p className="brand">
                  {' '}
                  <span className="element">Brand: </span> {brand}
                </p>
                <hr className="separator" />
                <div className="cart-items-container">
                  <button
                    type="button"
                    className="count-button right"
                    onClick={this.minusButton}
                    data-testid="minus"
                  >
                    <BsDashSquare />
                  </button>
                  <p className="count">{count}</p>
                  <button
                    type="button"
                    className="count-button left"
                    onClick={this.addButton}
                    data-testid="plus"
                  >
                    <BsPlusSquare />
                  </button>
                </div>
                <button type="button" className="add-cart-button">
                  ADD TO CART
                </button>
              </div>
            </div>

            <h1 className="Similar-heading">Similar Products</h1>
            <ul className="similar-product-list">
              {similarProductDetails.map(each => (
                <SimilarProductItem each={each} key={each.id} />
              ))}
            </ul>
          </>
        ) : (
          <div data-testid="loader" className="Loader-details">
            <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
          </div>
        )}
      </>
    )
  }
}

export default ProductItemDetails
