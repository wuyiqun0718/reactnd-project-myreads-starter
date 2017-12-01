import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import Book from './Book';

class Books extends Component {
	static propTypes = {
	    books: PropTypes.array.isRequired,
	    onShelfChange: PropTypes.func.isRequired
	}
	onShelfChange(book, shelf) {
		this.props.onShelfChange(...arguments);
	}
	render() {
		const books = this.props.books;
		const shelfs = {
			'currentlyReading': { title: 'Currently Reading', books: [] } ,
			'read': { title: 'Read', books: [] },
			'wantToRead': { title: 'Want to Read', books: [] }
		}
		books.sort(sortBy('title'));
		books.forEach(book => {
			const { shelf } = book;
			shelfs[shelf].books.push(book);
		})
		return (
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              	{Object.keys(shelfs).map(shelf => 
              		<div key={shelf} className="bookshelf">
			          <h2 className="bookshelf-title">{shelfs[shelf].title}</h2>
			          <div className="bookshelf-books">
			            <ol className="books-grid">
			            	{shelfs[shelf].books.map(book => 
			            		<li key={book.id}>
									<Book 
										book={book}
										onShelfChange={this.onShelfChange.bind(this, book)}
									/>
								</li>
			            	)}
			            </ol>
			          </div>
			        </div>
              	)}
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )
	}
}
export default Books