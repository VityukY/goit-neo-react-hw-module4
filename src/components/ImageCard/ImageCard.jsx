import styles from './ImageCard.module.css'
export default function ImageCard ({previewImage, alt, modalHandler}) {
   return <>
      <img className={styles.image} onClick={modalHandler} src={previewImage} alt={alt} />
   </>
}