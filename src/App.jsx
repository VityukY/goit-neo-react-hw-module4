import { useState, useEffect, useRef } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import ImageGallery from './components/ImageGallery/ImageGallery'
import ImageModal from './components/ImageModal/ImageModal'
import Loader from './components/Loader/Loader'
import './App.css'
import getImages from './photo-api'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import toast, { Toaster } from 'react-hot-toast';
import ErrorMessage from './components/ErrorMessage/ErrorMessage'

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [query, queryHandler] = useState('')
  const [images, updateImages] = useState([])
  const [page, setPage] = useState(1)
  const [modalImage, setModalImage] = useState({})
  const [isLoad, setLoad] = useState(false)
  const lastImageRef = useRef(null);
  const [loadButton, setLoadButton] = useState(true)
  const [errorMessage, setError] = useState('')
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function modalImageSetter(imageData) {
    setModalImage(imageData)
    openModal()
  }
  function queryUpdate (query) {
    setError('')
    setPage(1)
    updateImages([])
    setLoadButton(true)
    setLoad(true)
    queryHandler(query)
    setLoad(false)
  }
  function imageHandler(newImages) {
    updateImages((prevImages) => [...prevImages, ...newImages])
  }
  function pageUpdate () {
    setPage(page+1)
  }
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoadButton(true)
        setLoad(true);
        const { data } = await getImages(query, page);

        if(data.total_pages == page) {
          setLoadButton(false)
          setError('During loading mistake occur')
        }
        if (data.results.length==0){
          toast.error('No results');
          setError('No result')
          return
        }
        imageHandler(data.results);
      } catch {
        toast.error('An error occurred while fetching images.');
      } finally {
        setLoad(false);
      }
    };
  
    if (query !== '') {
      fetchImages();
    }
  }, [query, page]);

  useEffect(() => {
    if (lastImageRef.current) {
      lastImageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [images]);


  return (
    <>
      <SearchBar 
      galleryCleaner={()=>{updateImages([])}}
      queryHandler={queryUpdate} errorSetter={(errorMessage)=>{setError(errorMessage)}}/>
      {images.length > 0 && (
        <ImageGallery 
          images={images} 
          modalHandler={modalImageSetter} 
          lastImageRef={lastImageRef} // Pass the ref to the Gallery component
        />
      )}
      {isLoad&&<Loader />}
      {errorMessage!='' && <ErrorMessage errorMessage = {errorMessage} />}
      {loadButton &&
       images.length > 0 &&
       isLoad==false &&
       <LoadMoreBtn pageUpdate={pageUpdate}/>
       }
      {modalIsOpen && <ImageModal 
        modalIsOpen={modalIsOpen} 
        closeHandler={closeModal} 
        fullImage={modalImage.image} 
        imageAlt={modalImage.alt} 
      />}
      <div>
      <Toaster
      position="top-right"
      reverseOrder={true}
      />
    </div>
    </>
  )
}

export default App;
