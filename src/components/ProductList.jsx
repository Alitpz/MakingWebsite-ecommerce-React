import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import Product from './Product'
import Loading from './Loading'
import '../css/ProductList.css'

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store.product);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <Loading
        message="Ürünler yükleniyor..."
        size="medium"
        fullScreen={false}
      />
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
