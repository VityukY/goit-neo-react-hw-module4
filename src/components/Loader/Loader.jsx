import { CirclesWithBar } from 'react-loader-spinner'
import styles from './Loader.module.css'
export default function Loader () {
   return <div className={styles.loader}>

<CirclesWithBar
  height="100"
  width="100"
  color="#4fa94d"
  outerCircleColor="#4fa94d"
  innerCircleColor="#4fa94d"
  barColor="#4fa94d"
  ariaLabel="circles-with-bar-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />

   </div>
}