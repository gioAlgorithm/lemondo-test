import styles from './FooterNav.module.scss'
import FooterNavigators from './FooterNavigators'
import { IconArrowSwap, IconCart, IconHome, IconProfile, IconSearch } from '@/icons'

interface Props {
  
}

export default function FooterNav(props: Props) {
  return (
    <div className={styles.container}>
      <FooterNavigators title='მთავარი' icon={IconHome } />
      <FooterNavigators title='შედარება' icon={IconArrowSwap} />
      <FooterNavigators title='ძიება' icon={IconSearch } />
      <FooterNavigators title='კალათა' icon={IconCart } />
      <FooterNavigators title='პროფილი' icon={IconProfile } />
    </div>
  )
}