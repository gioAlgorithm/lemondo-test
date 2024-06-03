import styles from './FooterNavigators.module.scss'

interface Props {
  title: string;
  icon: React.ComponentType
}

export default function FooterNavigators(props: Props) {
  const {title, icon: Icon} = props

  return (
    <div className={styles.container}>
      {Icon && <Icon />}
      <h4>{title}</h4>
    </div>
  )
}