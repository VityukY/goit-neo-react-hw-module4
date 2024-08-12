import styles from './ImageGallery.module.css'
import ImageCard from "../ImageCard/ImageCard" 
export default function ImageGallery ({images, modalHandler , lastImageRef }) {

   return <>
      <ul className={styles.gallery}>
        {images.map((image, index) => {
             return  <li 
             className={styles.galleryItem}
             key={image.id}
             ref={index === images.length - 8 ? lastImageRef : null}
             >
               <ImageCard 
               modalHandler={()=>{modalHandler({image:image.urls.regular, alt:image.alt_description})}}
               previewImage={image.urls.small} 
               alt={image.alt_description}/>
               </li>

         } )}
      </ul>
   </>
}