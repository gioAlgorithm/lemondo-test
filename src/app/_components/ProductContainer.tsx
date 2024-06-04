"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductContainer.module.scss";
import { fetchProducts, Product } from "./fetchProducts";
import ProductCard from "@/Components/ProductCard";

interface Props {
  verticalStyle: boolean;
}

const ProductContainer = (props: Props) => {
  const { verticalStyle } = props;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  // Fetch the first page of products on initial load
  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        setLoading(true);
        const initialProducts = await fetchProducts(1);
        setProducts(initialProducts);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchInitialProducts();
  }, []);

  // Fetch more products when the page state updates
  useEffect(() => {
    if (page === 1) return; // Skip initial fetch as it's already handled
    const fetchMoreProducts = async () => {
      try {
        setLoading(true);
        const newProducts = await fetchProducts(page);
        setProducts((prev) => [...prev, ...newProducts]);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchMoreProducts();
  }, [page]);

  if (loading && page === 1) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <ul
        className={`${
          verticalStyle
            ? styles.productListVertical
            : styles.productListHorizontal
        }`}
      >
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} verticalStyle={verticalStyle} />
          </li>
        ))}
      </ul>
      {products.length % 12 === 0 &&
        products.length >= 12 && ( // Check if a full page of products is fetched
          <button className={styles.more} onClick={() => setPage(page + 1)}>
            {loading ? `Loading...` : `ნახე მეტი`}
          </button>
        )}
    </div>
  );
};

export default ProductContainer;
