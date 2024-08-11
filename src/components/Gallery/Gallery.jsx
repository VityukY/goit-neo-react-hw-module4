import Image from "../Image/Image" 
export default function Gallery ({images, modalHandler , lastImageRef }) {

   return <>
      <ul >
        {images.map((image, index) => {
             return  <li 
             key={image.id}
             ref={index === images.length - 8 ? lastImageRef : null}
             >
               <Image 
               modalHandler={()=>{modalHandler({image:image.urls.regular, alt:image.alt_description})}}
               previewImage={image.urls.small} 
               alt={image.alt_description}/>
               </li>

         } )}
      </ul>
   </>
}