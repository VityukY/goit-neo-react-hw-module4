import { BallTriangle } from 'react-loader-spinner'
import styles from './Loader.module.css'
export default function Loader () {
   return <div className={styles.loader}>
<BallTriangle 
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
   </div>
}