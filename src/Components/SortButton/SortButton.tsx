'use client'
import { IconArrowDown } from '@/icons'
import styles from './SortButton.module.scss'
import { useState } from 'react'

interface Props {
  
}

export default function SortButton(props: Props) {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className={styles.container}>
      <div className={`${styles.button} ${showMenu ? styles.active : ''}`} onClick={()=> setShowMenu(!showMenu)}>
        <h4>დალაგება</h4>
        <IconArrowDown />
      </div>
      <div className={`${styles.menu} ${showMenu ? styles.active : ''}`}>
        <li>ფასი კლებადობით</li>
        <li>ფასი ზრდადობით</li>
        <li>დასახელება: A-Z</li>
        <li>დასახელება: Z-A</li>
      </div>
    </div>
  )
}