import { useState, useEffect, useRef } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import Gallery from './components/Gallery/Gallery'
import ImageModal from './components/ImageModal/ImageModal'
import Loader from './components/Loader/Loader'
import './App.css'
import getImages from './photo-api'


function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [query, queryHandler] = useState('')
  const [images, updateImages] = useState([])
  const [page, setPage] = useState(1)
  const [modalImage, setModalImage] = useState({})
  const [isLoad, setLoad] = useState(false)

  const lastImageRef = useRef(null);
  

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
    updateImages([])
    setLoad(true)
    queryHandler(query)
    setLoad(false)
  }
  function imageHandler(newImages) {
    updateImages((prevImages) => [...prevImages, ...newImages])
  }

  useEffect(() => {
    if (query !== '') {
      setLoad(true)
      getImages(query, page).then(({ data }) => {
        console.log('data :>> ', data);
        imageHandler(data.results);
        setLoad(false)
      });
      
    }
  }, [query, page]);

  useEffect(() => {
    if (lastImageRef.current) {
      lastImageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [images]);

  return (
    <>
      <SearchBar queryHandler={queryUpdate} />
      {images.length > 0 && (
        <Gallery 
          images={images} 
          modalHandler={modalImageSetter} 
          lastImageRef={lastImageRef} // Pass the ref to the Gallery component
        />
      )}
      {isLoad&&<Loader />}
      {images.length > 0 && <button onClick={() => setPage(page + 1)}>Load More</button>}
      {modalIsOpen && <ImageModal 
        modalIsOpen={modalIsOpen} 
        closeHandler={closeModal} 
        fullImage={modalImage.image} 
        imageAlt={modalImage.alt} 
      />}
    </>
  )
}

export default App;
