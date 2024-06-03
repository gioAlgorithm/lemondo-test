import Image from "next/image";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Navigation from "../Navigation";
import Search from "../Search";
import Cart from "../Cart";
import Profile from "../Profile";
import { IconCart, IconMenu, IconSearch } from "@/icons";

interface Props {}

export default function Navbar(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.logoHolder}>
          <div className={styles.menuHolder}>
            <IconMenu />
          </div>
          <Link href="#">
            <Image src="/logo1.png" width={152} height={40} alt="#" />
          </Link>
        </div>
        <div className={styles.rightHolder}>
          <Navigation />
          <Search />
          <Cart />
          <Profile />

          <div className={styles.search}>
            <IconSearch />
          </div>
          <div className={styles.cart}>
            <IconCart />
          </div>
        </div>
      </div>
    </div>
  );
}
