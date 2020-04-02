import React from 'react';
import * as BooksAPI from '../../BooksAPI';
import EachBookShelf from '../BooksShelf/EachBookShelf';
import { Link } from "react-router-dom";


class BooksSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],

        }
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(e) {
        this.setState({ query: e.target.value.trim() });
        if (e.target.value.trim()) {
            BooksAPI.search(e.target.value.trim(), 20).then((results) => {
                if (results.length > 0)
                    this.setState({ results })
            }
            );
        }
    }

    render() {
        const { results } = this.state;
        const { updateBookShelf } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            value={this.state.query}
                            placeholder="Search by title or author"
                            onChange={this.handleChange}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            results === undefined ? 'not found' : results.map((data, index) => (
                                <EachBookShelf bookId={data.id} key={index} updateBookShelf={updateBookShelf} />
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BooksSearch;
