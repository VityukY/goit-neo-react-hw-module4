import styles from './ErrorMessage.module.css'
export default function ErrorMessage ({errorMessage}) {
   return <p className={styles.errorMessage}>{errorMessage}</p>
}