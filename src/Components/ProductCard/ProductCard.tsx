import { Product } from '@/app/_components/fetchProducts';
import styles from './ProductCard.module.scss';
import Image from 'next/image';
import { IconArrowSwap, IconCart } from '@/icons';

interface Props{
  verticalStyle: boolean;
  product: Product;
}

// function to truncate the text
const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const ProductCard = (props: Props) => {
  const {verticalStyle, product} = props

  // calculate loan on 18 month
  const monthlyInstallment = Math.floor(product.price / 18);

  // Truncate product name to a maximum of 45 characters
  const truncatedName = truncateText(product.name, 45);

  return (
    <div className={`${verticalStyle ? styles.verticalCard : styles.horizontalCard}`}>
      <Image alt='' width={160} height={160} src={product.imageUrl}/>
      <div className={styles.box}>
        <div className={styles.innerBox}>
          <p><strong>{product.price}</strong> ₾</p>
          <span>თვეში: <strong>{monthlyInstallment}₾</strong> -დან</span>
          <h2>{truncatedName}</h2>
          <div className={styles.btnBox}>
            <div className={styles.compareBtn}>
              <IconArrowSwap />
            </div>
            <div className={styles.cartBtn}>
              <IconCart />
              <p>დამატება</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;