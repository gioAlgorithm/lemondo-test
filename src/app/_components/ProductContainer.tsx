'use client'
import React, { useEffect, useState } from 'react';
import styles from './ProductContainer.module.scss';
import { fetchProducts, Product } from './fetchProducts';
import ProductCard from '@/Components/ProductCard';

interface Props{
  verticalStyle: boolean
}

const ProductContainer = (props: Props) => {
  const {verticalStyle} = props

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul className={`${verticalStyle ? styles.productListVertical : styles.productListHorizontal}`}>
      {products.map(product => (
        <li key={product.id}>
          <ProductCard product={product} verticalStyle={verticalStyle} />
        </li>
      ))}
    </ul>
  );
};

export default ProductContainer;