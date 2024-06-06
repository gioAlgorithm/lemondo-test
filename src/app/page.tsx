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
import { useSearchParams } from "next/navigation";
import FilterResponsive from "@/Components/FilterResponsive";

export default function Home() {

  const searchParams = useSearchParams()
  const [verticalStyle, setVerticalStyle] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState<boolean | undefined>(false)
  const specificationIds = searchParams.get('SpecificationIds')?.split(',') || []
  const minPrice = Number(searchParams.get('minPrice')) || undefined
  const maxPrice = Number(searchParams.get('maxPrice')) || undefined
  

  return (
    <main className={styles.main}>
      <FilterResponsive showFilter={showFilter}>
        <Filter 
          specificationIds={specificationIds}
          minPrice={minPrice}
          maxPrice={maxPrice}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />
      </FilterResponsive>
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
            <FilterButton setShowFilter={setShowFilter} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.filterContainer}>
            <Filter
              specificationIds={specificationIds}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setShowFilter={setShowFilter}
            />
          </div>
          <ProductContainer
            verticalStyle={verticalStyle}
            sortBy={sortBy}
            specificationIds={specificationIds}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </div>
      </div>
    </main>
  );
}
