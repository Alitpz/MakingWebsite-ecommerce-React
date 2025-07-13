import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import Product from './Product'
import '../css/ProductList.css'

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.product);
  console.log(products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Ürünler yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {
        products && products.map((product) => (
          <Product key={product.id} product={product} />
        ))
      }
    </div>
  )
}

export default ProductList
