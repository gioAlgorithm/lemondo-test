import { IconArrowDown } from '@/icons'
import styles from './SortButton.module.scss'

interface Props {
  
}

export default function SortButton(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <h4>დალაგება</h4>
        <IconArrowDown />
      </div>
    </div>
  )
}