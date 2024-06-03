import { IconProfile } from '@/icons'
import styles from './Profile.module.scss'

interface Props {
  
}

export default function Profile(props: Props) {
  return (
    <div className={styles.container}>
      <IconProfile />
      <h4>პროფილი</h4>
    </div>
  )
}