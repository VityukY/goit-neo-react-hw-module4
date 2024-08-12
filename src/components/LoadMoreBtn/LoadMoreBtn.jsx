import styles from './LoadMoreBtn.module.css'

export default function LoadMoreBtn ({pageUpdate}) {
   return <button 
   className={styles.moreBtn}
   onClick={pageUpdate}>
    Load More</button>
}