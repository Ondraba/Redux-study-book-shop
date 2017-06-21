"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Grid, Col, Row, Button} from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component {
  componentDidMount(){
    //dispatch an action
    this.props.getBooks();
  }
  render(){
    console.log('ARE WE ACCESSING?', this.props.books);
    const booksList = this.props.books.map(function(booksArr){
      return(
       <Col xs={12} sm={6} md={4} key={booksArr._id}>
        <BookItem
          _id={booksArr._id}
          title={booksArr.title}
          description={booksArr.description}
          price={booksArr.price}
          trash={booksArr.trash}
        />
       </Col>
      )
    })
    return(
      <Grid>
        <Row>
          <Cart />
        </Row>
         <Row style={{marginTop:'15px'}}>
            <Col cs={12} sm={6}>
              <BooksForm />
            </Col>
          {booksList}
         </Row>
       </Grid>
    )
  }
}

function mapStateToProps(state){
  return{
    books: state.books.books
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getBooks:getBooks
  },dispatch)
}

export  default connect(mapStateToProps, mapDispatchToProps)(BooksList);

//mapStateToProps componenta subsribuje do store
//this.props mohou byt podenene z property komponenty ktera si nekam saha a nebo mohou byt primo z namapovani oznaceny ala this.props.books..
