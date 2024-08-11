
export default function SearchBar({queryHandler}){
 
   const searchHandler = (e) => {
      e.preventDefault();
      const form = e.target;
      const query = form.elements.searchBar.value
      if (query !== '') {
        queryHandler(query)
      } else {
        console.log('empty query');
      }
   }
   return <header>
   <form onSubmit={searchHandler}>
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