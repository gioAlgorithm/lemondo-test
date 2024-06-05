"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductContainer.module.scss";
import { fetchProducts, Product } from "./fetchProducts";
import ProductCard from "@/Components/ProductCard";

interface Props {
  verticalStyle: boolean;
  sortBy: string | null;
}

const ProductContainer = ({ verticalStyle, sortBy }: Props) => {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  // Fetch products when component mounts or when the page state updates
  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        setLoading(true);
        const initialProducts = await fetchProducts(1);
        setFetchedProducts(initialProducts);
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
        setFetchedProducts((prev) => [...prev, ...newProducts]);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchMoreProducts();
  }, [page]);

  // Sort products based on sortBy state
  useEffect(() => {
    const sortProducts = (products: Product[], sortBy: string | null) => {
      let sortedProducts = [...products];
      switch (sortBy) {
        case "price-asc":
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
      return sortedProducts;
    };

    setSortedProducts(sortProducts(fetchedProducts, sortBy));
  }, [sortBy, fetchedProducts]);

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
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} verticalStyle={verticalStyle} />
          </li>
        ))}
      </ul>
      {sortedProducts.length % 12 === 0 && sortedProducts.length >= 12 && (
        <button className={styles.more} onClick={() => setPage(page + 1)}>
          {loading ? `Loading...` : `ნახე მეტი`}
        </button>
      )}
    </div>
  );
};

export default ProductContainer;