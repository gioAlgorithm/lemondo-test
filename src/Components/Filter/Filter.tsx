"use client";
import {
  IconArrowDown,
  IconCheckSquare,
  IconClose,
  IconEmptyCheckSquare,
  IconTrash,
} from "@/icons";
import styles from "./Filter.module.scss";
import { useEffect, useState } from "react";
import type { Filter, FilterSpecification, FilterValue } from "./fetchFilter"; // Importing types
import { fetchFilter } from "./fetchFilter"; // Importing fetchFilter function
import Slider from "@mui/material/Slider";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface Props {
  minPrice?: number;
  maxPrice?: number;
  specificationIds: string[];
  showFilter?: boolean
  setShowFilter: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

let timeOut: NodeJS.Timeout
let specTimeout: NodeJS.Timeout;

export default function Filter(props: Props) {
  const {
    minPrice,
    maxPrice,
    specificationIds,
    showFilter,
    setShowFilter
  } = props;

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [filterData, setFilterData] = useState<Filter | null>(null);
  const [expandMap, setExpandMap] = useState<{ [key: string]: boolean }>({});
  const [minPriceSlider, setMinPriceSlider] = useState<number | undefined>(minPrice)
  const [maxPriceSlider, setMaxPriceSlider] = useState<number | undefined>(maxPrice)
  const [selectedSpecifications, setSelectedSpecifications] = useState<
    string[] 
  >(specificationIds);

  // update params
  useEffect(()=>{
    timeOut = setTimeout(()=>{
        const params = new URLSearchParams(searchParams.toString())
        if(minPriceSlider !== undefined){
          params.set('minPrice', minPriceSlider.toString())
        }
        if(maxPriceSlider !== undefined){
          params.set('maxPrice', maxPriceSlider.toString())
        }
        router.replace(pathname + '?' + params.toString())
    }, 500)

    return ()=>{
      clearTimeout(timeOut)
    }
  }, [minPriceSlider,maxPriceSlider, pathname, router, searchParams])

  // fetching specifications
  useEffect(()=>{
    let isMounted = true; 
    const fetchData = async ()=> {
      try{
        if (isMounted) {
          const data = await fetchFilter()
          setFilterData(data)
        }
      }catch (error) {
         console.error("Error fetching filter data:", error);
      }
    }

    fetchData()
    // Clean-up function
     return () => {
       isMounted = false; // Component is unmounted, so set flag to false
     };
  }, [])

  // Updating search query for specifications
  useEffect(() => {
    specTimeout = setTimeout(() => {
      if (selectedSpecifications.length !== 0) {
        const params = new URLSearchParams(searchParams.toString());
        const newSpecificationIds = selectedSpecifications.join(',');
        if (params.get('SpecificationIds') !== newSpecificationIds) {
          params.set('SpecificationIds', newSpecificationIds);
          router.replace(pathname + '?' + params.toString());
          console.log("muteli");
        }
      }
    }, 500);

    return () => {
      clearTimeout(specTimeout);
    };
  }, [selectedSpecifications, pathname, router, searchParams]);

  // expnaad card
  const toggleExpand = (specName: string) => {
    setExpandMap((prevExpandMap) => ({
      ...prevExpandMap,
      [specName]: !prevExpandMap[specName],
    }));
  };

  // add specifications
  const handleSpecificationToggle = (specificationId: string) => {
    setSelectedSpecifications((prev: string[]) =>
      prev.includes(specificationId)
        ? prev.filter((id) => id !== specificationId)
        : [...prev, specificationId]
    );
  };

  const handleDeselectAll = () => {
    setSelectedSpecifications([]);

  };

  return (
    <div className={`${styles.container} ${showFilter ? styles.active : ''}`}>
      <div className={styles.header}>
        <div className={styles.closeBox}>
          <span onClick={()=> setShowFilter(false)}>
            <IconClose />
          </span>
          <h4>ფილტრი</h4>
        </div>
        
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
                  value={[minPriceSlider || 0, maxPriceSlider || filterData.maxPrice]}
                  onChange={(_, newValues) => {
                    const [newMinPrice, newMaxPrice] = newValues as [number, number];
                    setMinPriceSlider(newMinPrice);
                    setMaxPriceSlider(newMaxPrice);
                  }}
                  valueLabelDisplay="on"
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
                    value={minPriceSlider || 0}
                    onChange={(e) => setMinPriceSlider(Number(e.target.value))}
                  />
                  <span>₾</span>
                </div>
                <div className={styles.priceInput}>
                  <label htmlFor="maxPrice">Max</label>
                  <input
                    type="text"
                    id="maxPrice"
                    value={maxPriceSlider || filterData.maxPrice}
                    onChange={(e) => setMaxPriceSlider(Number(e.target.value))}
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
                        onClick={() => handleSpecificationToggle(value.id.toString())}
                      >
                        <div className={styles.check}>
                          {selectedSpecifications.includes(value.id.toString()) ? (
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
