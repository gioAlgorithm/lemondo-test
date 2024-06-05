'use client'
import { IconArrowDown } from '@/icons'
import styles from './SortButton.module.scss'
import { useState } from 'react'

interface Props {
  onSortChange: (sortBy: string) => void;
}

export default function SortButton(props: Props) {
  const { onSortChange } = props
  const [showMenu, setShowMenu] = useState(false)
  const [currentSort, setCurrentSort] = useState<string | null>(null)

  const handleSortChange = (sortBy: string) => {
    setCurrentSort(sortBy);
    onSortChange(sortBy);
    setShowMenu(false);
  };

  const getSortLabel = () => {
    switch (currentSort) {
      case 'price-desc':
        return 'ფასი კლებადობით';
      case 'price-asc':
        return 'ფასი ზრდადობით';
      case 'name-asc':
        return 'დასახელება: A-Z';
      case 'name-desc':
        return 'დასახელება: Z-A';
      default:
        return 'დალაგება';
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.button} ${showMenu ? styles.active : ''}`} onClick={() => setShowMenu(!showMenu)}>
        <h4>{getSortLabel()}</h4>
        <IconArrowDown />
      </div>
      <div className={`${styles.menu} ${showMenu ? styles.active : ''}`}>
        <li onClick={() => handleSortChange('price-desc')}>ფასი კლებადობით</li>
        <li onClick={() => handleSortChange('price-asc')}>ფასი ზრდადობით</li>
        <li onClick={() => handleSortChange('name-asc')}>დასახელება: A-Z</li>
        <li onClick={() => handleSortChange('name-desc')}>დასახელება: Z-A</li>
      </div>
    </div>
  )
}