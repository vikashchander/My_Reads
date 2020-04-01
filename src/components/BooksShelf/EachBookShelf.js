import React from 'react';
import * as BooksAPI from '../../BooksAPI';


class EachBookShelf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookId: this.props.bookId,
            title: '',
            authors: [''],
            description: '',
            subtitle: '',
            categories: [''],
            imageLinks: { thumbnail: '' },
            shelf: 'none',

        }
        console.log('state run');
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        BooksAPI.get(this.props.bookId).then(data => {
            this.setState({ ...data })
        })
        console.log(`component didmount run`)
    }

    handleChange(e) {
        let newShelf = e.target.value;
        let previousShelf = this.state.shelf;  // so we can rollback the change later if API call fails
        this.setState({ shelf: newShelf })   // hoping API call won't fail
        BooksAPI
            .update({ 'id': this.state.id }, newShelf)   // API call
            .then((shelvesObject) => this.props.updateBookShelf({ shelvesObject }))
            // NB this updates the currentlyReading, read and wantToRead shelves, but not the searchResults shelf.
            // This is why we had to do this.setState({shelf: newShelf}) a few lines earlier to manually upate the shelf state of this book
            // so that the book status is shown correctly in the searchResults shelf
            .catch(() => (this.setState({ shelf: previousShelf })))        // rollback if API call failed
    }


    render() {
        const { title, authors, imageLinks } = this.state;
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={this.state.shelf} onChange={this.handleChange}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors}</div>
                </div>

            </li>
        )
    }
}

export default EachBookShelf;