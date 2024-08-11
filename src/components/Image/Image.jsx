import styles from './Image.module.css'
export default function Image ({previewImage, alt, modalHandler}) {
   return <>
      <img className={styles.image} onClick={modalHandler} src={previewImage} alt={alt} />
   </>
}