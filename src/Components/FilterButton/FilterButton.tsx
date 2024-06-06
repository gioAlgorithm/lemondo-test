import { IconFilter } from '@/icons'
import styles from './FilterButton.module.scss'

interface Props {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export default function FilterButton(props: Props) {
  const {setShowFilter} = props

  return (
    <div className={styles.container} onClick={()=> setShowFilter(true)}>
      <IconFilter />
      <h4>ფილტრი</h4>
    </div>
  )
}