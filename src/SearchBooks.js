import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import Book from './Book';

class SearchBooks extends Component {
  static propTypes = {
      books: PropTypes.array.isRequired,
      onShelfChange: PropTypes.func.isRequired,
      booksById: PropTypes.object.isRequired
  }
  state = {
    searchValue: "",
    books: []
  }
  searchThrottle = null;

  searchBook = e => {
    if (this.searchThrottle) clearTimeout(this.searchThrottle);
    const searchValue = e.target.value.trim();
    this.searchThrottle = setTimeout( () => {
      if (searchValue.length === 0) this.setState({ books: [], searchValue })
      else {
        BooksAPI
        .search(searchValue, 3)
        .then(books => {
          books = books instanceof Array ? books : [];
          this.setState({ books, searchValue })
        })
        .catch(err => console.err(err))
      }
    }, 200)
  }
  onShelfChange(book, shelf) {
    this.props.onShelfChange(...arguments);
  }
  render() {
    const { booksById } = this.props;
    const books = this.state.books.map(book => {
      if (booksById[book.id]) book.shelf = booksById[book.id].shelf;
      return <li key={book.id}>
        <Book 
          onShelfChange={this.onShelfChange.bind(this, book)}
          book={book}
        />
      </li>
    })
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input value={this.searchValue} onChange={this.searchBook} type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{books}</ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks