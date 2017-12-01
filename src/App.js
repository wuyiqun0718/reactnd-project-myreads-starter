import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router';
import SearchBooks from './SearchBooks';
import Books from './Books';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({ books });
    })
  }

  onShelfChange(newBook, shelf) {
    const index = this.state.books.findIndex(book => book.id === newBook.id);
    BooksAPI
      .update(newBook, shelf)
      .then( result => {
        this.setState( state => {
          const { books } = state;
          if (index !== -1) books[index].shelf = shelf;
          else books.push(Object.assign({}, newBook, { shelf }));
          return { books };
        })
      })
  }

  render() {
    const booksById = this.state.books.reduce( (accum, book) => {
      accum[book.id] = book;
      return accum;
    }, {})
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Books onShelfChange={this.onShelfChange.bind(this)} books={this.state.books} />
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchBooks onShelfChange={this.onShelfChange.bind(this)} books={this.state.books} booksById={booksById} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
