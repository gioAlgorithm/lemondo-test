'use client'
import { IconPhone } from '@/icons'
import styles from './InfoNavbar.module.scss'

interface Props {
  
}

export default function InfoNavbar(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.phoneHolder}>
          <IconPhone />
          <p>*7007 / +995 (32) 2 60 30 60</p>
        </div>
        <div className={styles.navigation}>
          
          <a href='#'>ონლაინ განვადება</a>
          <a href='#'>ფილიალები</a>
          <a href='#'>ყველა აქცია</a>
          
        </div>
      </div>
    </div>
  )
}