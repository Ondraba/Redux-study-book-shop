"user strict"

export function booksReducer(state={
  books:[{
      _id:1,
      title:'this is the book title',
      description: 'this is desc',
      price: 72
    },
    {
      _id:2,
      title:'this is the book title two',
      description: 'this is desc two',
      price: 25
    }]},action){
  switch(action.type){
    // case "INCREMENT":
    // return state + action.payload;
    // break;
    case "GET_BOOKS":
    return {...state, books:[...state.books]}
    break;

    case "POST_BOOK":
    let books = state.books.concat(action.payload);
    return {books};
    //or return {books:[..state.books, ...action.payload]}
    break;

    case "DELETE_BOOK":
    const currentBookToDelete = [...state.books]
    const indexToDelete = currentBookToDelete.findIndex(
      function(book){
        return book._id.toString() == action.payload;
      }
    )
    return {books: [...currentBookToDelete.slice(0, indexToDelete),
    ...currentBookToDelete.slice(indexToDelete +1)]};
    break;

    case "UPDATE_BOOK":
    const currentBookToUpdate= [...state.books]
    const indexToUpdate = currentBookToUpdate.findIndex(
      function(book){
        return book._id === action.payload._id;
      }
    )

    const newBookToUpdate = {
      ...currentBookToUpdate[indexToUpdate],
      title: action.payload.title
    }
    console.log("what is newbookupdate", newBookToUpdate);
    return {books: [...currentBookToUpdate.slice(0, indexToUpdate),
      newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate +1)]};
    break;
  }
  return state
}
