"use strict"
import {createStore} from 'redux';

//step1: create store
//step2 create and dispatch actions
//step3 reducers

const reducer = function(state={books:[]},action){
  switch(action.type){
    // case "INCREMENT":
    // return state + action.payload;
    // break;
    case "POST_BOOK":
    let books = state.books.concat(action.payload);
    return {books};
    //or return {books:[..state.books, ...action.payload]}
    break;

    case "DELETE_BOOK":
    const currentBookToDelete = [...state.books]
    const indexToDelete = currentBookToDelete.findIndex(
      function(book){
        return book.id === action.payload.id;
      }
    )
    return {books: [...currentBookToDelete.slice(0, indexToDelete),
    ...currentBookToDelete.slice(indexToDelete +1)]};
    break;

    case "UPDATE_BOOK":
    const currentBookToUpdate= [...state.books]
    const indexToUpdate = currentBookToUpdate.findIndex(
      function(book){
        return book.id === action.payload.id;
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

const store = createStore(reducer);
store.subscribe(function(){

    console.log('current state is ', store.getState());
})

// store.dispatch({type:"INCREMENT", payload:1})


store.dispatch({
  type: "POST_BOOK",
  payload: [{
    id:1,
    title:'this is the book title',
    description: 'this is desc',
    price: 22
  },
  {
    id:2,
    title:'this is the book title two',
    description: 'this is desc two',
    price: 55
  }]
})


store.dispatch({
  type: "POST_BOOK",
  payload: [{
    id:3,
    title:'this is the book title 3',
    description: 'this is desc 3',
    price: 99
  }]
})


store.dispatch({
  type: "DELETE_BOOK",
  payload: {
    id:1
  }
})

store.dispatch({
  type: "UPDATE_BOOK",
  payload: {
    id:2,
    title:'Learn React'
  }
})
