import styles from './FilterResponsive.module.scss'

interface Props {
  children: React.ReactNode
  showFilter?: boolean
}

export default function FilterResponsive(props: Props) {
  const {children, showFilter} = props
  return (
    <div className={`${styles.container} ${showFilter ? styles.active : ''}`}>
      {children}
    </div>
  )
}