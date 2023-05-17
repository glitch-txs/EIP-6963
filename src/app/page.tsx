import Image from 'next/image'
import styles from './page.module.css'
import EIP6963 from '../../components/EIP6963'

export default function Home() {
  return (
    <main className={styles.main}>
      <a href="https://eips.ethereum.org/EIPS/eip-6963" rel='no-referrer' target="_blank"><h1>EIP-6963</h1></a>
      <EIP6963/>
    </main>
  )
}
