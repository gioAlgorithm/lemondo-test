"use client";
import {
  IconApple,
  IconArrowRight,
  IconHorizontal,
  IconVertical,
} from "@/icons";
import styles from "./page.module.scss";
import { useState } from "react";
import Filter from "@/Components/Filter";
import ProductContainer from "./_components/ProductContainer";
import FilterButton from "@/Components/FilterButton";
import SortButton from "@/Components/SortButton";

export default function Home() {
  const [verticalStyle, setVerticalStyle] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [selectedSpecifications, setSelectedSpecifications] = useState<
    number[]
  >([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  console.log(minPrice, maxPrice)

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.leftBox}>
            <IconArrowRight />
            <div className={styles.box}>
              <IconApple />
              <h4>Apple</h4>
            </div>
          </div>
          <div className={styles.rightBox}>
            <div className={styles.btnBox}>
              <SortButton onSortChange={setSortBy} />
            </div>
            <div
              className={`${styles.verticalButton} ${
                verticalStyle ? styles.active : ""
              }`}
              onClick={() => setVerticalStyle(true)}
            >
              <IconVertical />
            </div>
            <div
              className={`${styles.horizontalButton} ${
                !verticalStyle ? styles.active : ""
              }`}
              onClick={() => setVerticalStyle(false)}
            >
              <IconHorizontal />
            </div>
          </div>
        </div>
        <div className={styles.headerResponsive}>
          <div className={styles.headerResBox}>
            <SortButton onSortChange={setSortBy} />
          </div>
          <div className={styles.headerResBox}>
            <FilterButton />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.filterContainer}>
            <Filter
              selectedSpecifications={selectedSpecifications}
              setSelectedSpecifications={setSelectedSpecifications}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </div>
          <ProductContainer
            verticalStyle={verticalStyle}
            sortBy={sortBy}
            selectedSpecifications={selectedSpecifications}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
      </div>
    </main>
  );
}
