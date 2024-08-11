import { useState, useEffect, useRef } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import Gallery from './components/Gallery/Gallery'
import ImageModal from './components/ImageModal/ImageModal'
import Loader from './components/Loader/Loader'
import './App.css'
import getImages from './photo-api'

import toast, { Toaster } from 'react-hot-toast';


function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [query, queryHandler] = useState('')
  const [images, updateImages] = useState([])
  const [page, setPage] = useState(1)
  const [modalImage, setModalImage] = useState({})
  const [isLoad, setLoad] = useState(false)
  const lastImageRef = useRef(null);
  const [loadButton, setLoadButton] = useState(true)
  
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
    const fetchImages = async () => {
      try {
        setLoad(true);
        const { data } = await getImages(query, page);
        console.log('data :>> ', data);
        console.log('data.results :>> ', data.results);
        if(data.total_pages == page) {
          setLoadButton(false)
        }
        if (data.results.length==0){
          toast.error('No results');
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
      <SearchBar queryHandler={queryUpdate} />
      {images.length > 0 && (
        <Gallery 
          images={images} 
          modalHandler={modalImageSetter} 
          lastImageRef={lastImageRef} // Pass the ref to the Gallery component
        />
      )}
      {isLoad&&<Loader />}
      {loadButton && images.length > 0 && isLoad==false && <button onClick={() => setPage(page + 1)}>Load More</button>}
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
