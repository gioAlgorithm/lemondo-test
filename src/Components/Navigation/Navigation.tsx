import styles from './Navigation.module.scss'
import { IconBurger } from "@/icons";

interface Props {
  
}

export default function Navigation(props: Props) {
  return (
    <div className={styles.container}>
      <IconBurger />
      <p>ნავიგაცია</p>
    </div>
  )
}