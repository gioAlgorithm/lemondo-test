import { IconFilter } from '@/icons'
import styles from './FilterButton.module.scss'

interface Props {
  
}

export default function FilterButton(props: Props) {
  return (
    <div className={styles.container}>
      <IconFilter />
      <h4>ფილტრი</h4>
    </div>
  )
}