import { IconSearch } from '@/icons'
import styles from './Search.module.scss'

interface Props {
  
}

export default function Search(props: Props) {
  return (
    <div className={styles.container}>
      <IconSearch />
      <input type='text' placeholder='ძიება' />
    </div>
  )
}