'use client'
import { IconApple, IconArrowRight, IconHorizontal, IconVertical } from "@/icons";
import styles from "./page.module.scss";
import SortButton from "@/Components/SortButton";
import { useState } from "react";
import Filter from "@/Components/Filter";
import ProductContainer from "./_components/ProductContainer";
import FilterButton from "@/Components/FilterButton";

export default function Home() {

  //state to change the style of the cards
  const [verticalStyle, setVerticalStyle] = useState<boolean>(true)

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
              <SortButton />
            </div>
            <div className={`${styles.verticalButton} ${verticalStyle ? styles.active : ''}`} onClick={()=> setVerticalStyle(true)}>
              <IconVertical />
            </div>
            <div className={`${styles.horizontalButton} ${!verticalStyle ? styles.active : ''}`} onClick={()=> setVerticalStyle(false)}>
              <IconHorizontal />
            </div>
          </div>
        </div>
        <div className={styles.headerResponsive}>
          <div className={styles.headerResBox}>
            <SortButton />
          </div>
          <div className={styles.headerResBox}>
            <FilterButton />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.filterContainer}>
            <Filter />
          </div>
          <ProductContainer verticalStyle={verticalStyle} />
        </div>
      </div>
    </main>
  );
}
