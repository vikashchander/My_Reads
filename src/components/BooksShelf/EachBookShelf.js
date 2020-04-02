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
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        BooksAPI.get(this.props.bookId).then(data => {
            this.setState({ ...data })
        })
    }

    handleChange(e) {
        let newShelf = e.target.value;
        let previousShelf = this.state.shelf;
        this.setState({ shelf: newShelf })
        BooksAPI
            .update({ 'id': this.state.id }, newShelf)
            .then((shelvesObject) => this.props.updateBookShelf({ shelvesObject }))
            .catch(() => (this.setState({ shelf: previousShelf })))
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