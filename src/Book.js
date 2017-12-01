import React from 'react';
import PropTypes from 'prop-types';

export default class Book extends React.Component {
	static propTypes = {
	    book: PropTypes.object.isRequired,
	    onShelfChange: PropTypes.func.isRequired
	}
	moveBook = (shelf, e) => {
		const selectedShelf = e.target.value;
		if (selectedShelf === shelf) return;
		this.props.onShelfChange(selectedShelf);
	}
	render() {
		const { book } = this.props;
		const { title, imageLinks = {}, authors = [], shelf = 'none' } = book;
		return (
			<div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
                <div className="book-shelf-changer">
                  <select value={shelf} onChange={this.moveBook.bind(null, shelf)}>
                    <option value="moveTo" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{title}</div>
              <div className="book-authors">{authors[0]}</div>
            </div>)
	}
}