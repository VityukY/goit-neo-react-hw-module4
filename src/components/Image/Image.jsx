export default function Image ({previewImage, alt, modalHandler}) {
   return <>
      <img onClick={modalHandler} src={previewImage} alt={alt} />
   </>
}