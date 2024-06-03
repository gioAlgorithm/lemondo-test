import { IconCart } from '@/icons'
import styles from './Cart.module.scss'

interface Props {
  
}

export default function Cart(props: Props) {
  return (
    <div className={styles.container}>
      <IconCart />
      <h4>კალათა</h4>
    </div>
  )
}