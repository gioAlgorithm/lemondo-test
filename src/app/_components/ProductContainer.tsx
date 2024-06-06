"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductContainer.module.scss";
import { fetchProducts, Product } from "./fetchProducts";
import ProductCard from "@/Components/ProductCard";

interface Props {
  verticalStyle: boolean;
  sortBy: string | null;
  selectedSpecifications: number[];
  minPrice: number;
  maxPrice: number;
}

const ProductContainer = ({
  verticalStyle,
  sortBy,
  selectedSpecifications,
  minPrice, 
  maxPrice
}: Props) => {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const resetState = () => {
    setFetchedProducts([]);
    setSortedProducts([]);
    setPage(1);
  };
  const ifSelect = selectedSpecifications.length > 0 ? 999 : 12

  // Fetch products when component mounts or when the page state updates
  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        setLoading(true);
        const initialProducts = await fetchProducts(1, ifSelect, sortBy, selectedSpecifications, minPrice, maxPrice);
        setFetchedProducts(initialProducts);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    resetState(); // Reset the state before fetching new initial products
    fetchInitialProducts();
  }, [sortBy, selectedSpecifications, minPrice, maxPrice, ifSelect]); // Added minPrice and maxPrice to dependency array

  // Fetch more products when the page state updates
  useEffect(() => {
    if (selectedSpecifications.length > 0 || page === 1) return; // Skip if filters are applied or initial fetch is done

    const fetchMoreProducts = async () => {
      try {
        setLoading(true);
        const newProducts = await fetchProducts(page, ifSelect, sortBy, selectedSpecifications, minPrice, maxPrice);
        setFetchedProducts((prev) => [...prev, ...newProducts]);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchMoreProducts();
  }, [page, sortBy, selectedSpecifications, minPrice, maxPrice, ifSelect]); // Added minPrice and maxPrice to dependency array

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
      {selectedSpecifications.length === 0 && sortedProducts.length % 12 === 0 && sortedProducts.length >= 12 && (
        <button className={styles.more} onClick={() => setPage(page + 1)}>
          {loading ? `Loading...` : `ნახე მეტი`}
        </button>
      )}
    </div>
  );
};

export default ProductContainer;