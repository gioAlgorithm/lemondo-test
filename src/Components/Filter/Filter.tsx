"use client";
import {
  IconArrowDown,
  IconCheckSquare,
  IconEmptyCheckSquare,
  IconTrash,
} from "@/icons";
import styles from "./Filter.module.scss";
import { useEffect, useState } from "react";
import type { Filter, FilterSpecification, FilterValue } from "./fetchFilter"; // Importing types
import { fetchFilter } from "./fetchFilter"; // Importing fetchFilter function
import Slider from "@mui/material/Slider";

interface Props {
  selectedSpecifications: number[];
  setSelectedSpecifications: (
    value: number[] | ((prev: number[]) => number[])
  ) => void;
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}

export default function Filter(props: Props) {
  const {
    selectedSpecifications,
    setSelectedSpecifications,
    maxPrice,
    setMaxPrice,
    minPrice,
    setMinPrice,
  } = props;
  const [filterData, setFilterData] = useState<Filter | null>(null);
  const [expandMap, setExpandMap] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    let isMounted = true; // Flag to indicate component is mounted

    const fetchData = async () => {
      try {
        const data = await fetchFilter();
        if (isMounted) {
          setFilterData(data);
          setMinPrice(data.minPrice); // Set minPrice from API data
          setMaxPrice(data.maxPrice); // Set maxPrice from API data
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
  }, [setMaxPrice, setMinPrice]);

  // expnaad card
  const toggleExpand = (specName: string) => {
    setExpandMap((prevExpandMap) => ({
      ...prevExpandMap,
      [specName]: !prevExpandMap[specName],
    }));
  };

  const handleSpecificationToggle = (specificationId: number) => {
    setSelectedSpecifications((prev: number[]) =>
      prev.includes(specificationId)
        ? prev.filter((id) => id !== specificationId)
        : [...prev, specificationId]
    );
  };

  const handleDeselectAll = () => {
    setSelectedSpecifications([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>ფილტრი</h4>
        <div className={styles.trash} onClick={handleDeselectAll}>
          <IconTrash />
          <p>გასუფთავება</p>
        </div>
      </div>
      <div className={styles.content}>
        {/* Render filter data here */}
        {filterData && (
          <>
            {/* Example rendering of filter data */}
            <div className={styles.priceFilter}>
              <div className={styles.sliderBox}>
                <Slider
                  value={[minPrice, maxPrice]}
                  onChange={(_, newValues) => {
                    const [newMinPrice, newMaxPrice] = newValues as [number, number];
                    setMinPrice(newMinPrice);
                    setMaxPrice(newMaxPrice);
                  }}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={filterData.minPrice}
                  max={filterData.maxPrice}
                  sx={{
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#EC5E2A',
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: '#EC5E2A',
                    },
                    '& .MuiSlider-valueLabel': {
                      visibility: 'visible !important', // Make tooltip always visible
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#EC5E2A',
                      border: '1px solid #EC5E2A'
                    },
                  }}
                />
              </div>
              <div className={styles.inputBox}>
                <div className={styles.priceInput}>
                  <label htmlFor="minPrice">Min</label>
                  <input
                    type="text"
                    id="minPrice"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                  />
                  <span>₾</span>
                </div>
                <div className={styles.priceInput}>
                  <label htmlFor="maxPrice">Max</label>
                  <input
                    type="text"
                    id="maxPrice"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                  />
                  <span>₾</span>
                </div>
              </div>
            </div>
            {/* Render specifications */}
            {filterData.specifications.map(
              (specification: FilterSpecification) => (
                <div
                  key={specification.name}
                  className={`${styles.specificationBox} ${
                    expandMap[specification.name] ? styles.active : ""
                  }`}
                >
                  <div
                    className={styles.specificationHead}
                    onClick={() => toggleExpand(specification.name)}
                  >
                    <h5>{specification.name}</h5>
                    <IconArrowDown />
                  </div>
                  <ul>
                    {specification.values.map((value: FilterValue) => (
                      <li
                        key={value.id}
                        className={styles.select}
                        onClick={() => handleSpecificationToggle(value.id)}
                      >
                        <div className={styles.check}>
                          {selectedSpecifications.includes(value.id) ? (
                            <IconCheckSquare />
                          ) : (
                            <IconEmptyCheckSquare />
                          )}
                        </div>
                        <label htmlFor={value.id.toString()}>
                          {value.value}
                        </label>
                      </li>
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
