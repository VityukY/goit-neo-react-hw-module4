import styles from './SearchBar.module.css'
import toast from 'react-hot-toast';

export default function SearchBar({queryHandler, errorSetter, galleryCleaner}){
 
   const searchHandler = (e) => {
      e.preventDefault();
      const form = e.target;
      const query = form.elements.searchBar.value
      if (query !== '') {
        queryHandler(query)
      } else {
        galleryCleaner();
        toast.error('Empty query is not allowed');
        errorSetter('Empty query is not allowed')
      }
   }
   return <header className={styles.header}>
   <form className={styles.form} onSubmit={searchHandler}>
     <input

      name="searchBar"
       type="text"
       autoComplete="off"
       autoFocus
       placeholder="Search images and photos"
     />
     <button type="submit" >Search</button>
   </form>
 </header>
}