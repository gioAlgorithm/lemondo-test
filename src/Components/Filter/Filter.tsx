"use client";
import { IconArrowDown, IconCheckSquare, IconTrash } from "@/icons";
import styles from "./Filter.module.scss";
import { useEffect, useState } from "react";
import type { Filter, FilterSpecification, FilterValue } from "./fetchFilter"; // Importing types
import { fetchFilter } from "./fetchFilter"; // Importing fetchFilter function

interface Props {}

export default function Filter(props: Props) {
  const [filterData, setFilterData] = useState<Filter | null>(null);
  const [expandMap, setExpandMap] = useState<{ [key: string]: boolean }>({});


  useEffect(() => {
    let isMounted = true; // Flag to indicate component is mounted

    const fetchData = async () => {
      try {
        const data = await fetchFilter();
        if (isMounted) {
          setFilterData(data);
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchData();

    // Clean-up function
    return () => {
      isMounted = false; // Component is unmounted, so set flag to false
    };
  }, []);

  // expnaad card 
  const toggleExpand = (specName: string) => {
    setExpandMap((prevExpandMap) => ({
      ...prevExpandMap,
      [specName]: !prevExpandMap[specName],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>ფილტრი</h4>
        <div className={styles.trash}>
          <IconTrash />
          <p>გასუფთავება</p>
        </div>
      </div>
      <div className={styles.content}>
        {/* Render filter data here */}
        {filterData && (
          <>
            {/* Example rendering of filter data */}
            <p>Min Price: {filterData.minPrice}</p>
            <p>Max Price: {filterData.maxPrice}</p>
            {/* Render specifications */}
            {filterData.specifications.map(
              (specification: FilterSpecification) => (
                <div
                  key={specification.name}
                  className={`${styles.specificationBox} ${
                    expandMap[specification.name] ? styles.active : ""
                  }`}
                >
                  <div className={styles.specificationHead} onClick={() => toggleExpand(specification.name)}>
                    <h5>{specification.name}</h5>
                    <IconArrowDown />
                  </div>
                  <ul>
                    {specification.values.map((value: FilterValue) => (
                      <div key={value.id} className={styles.select}>
                        <div className={styles.check}>
                          <IconCheckSquare />
                        </div>
                        <li>{value.value}</li>
                      </div>
                    ))}
                  </ul>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}
