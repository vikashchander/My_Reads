import React from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../../BooksAPI';
import EachBookShelf from '../BooksShelf/EachBookShelf';
import { Link } from "react-router-dom";


class BooksSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
            searchErr: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const query = e.target.value;
        this.setState({ query });
        if (query) {
            BooksAPI.search(query.trim(), 20).then((results) => {
                results.length > 0
                    ? this.setState({ results, searchErr: false })
                    : this.setState({ results: [], searchErr: true })
            });
        } else {
            this.setState({ results: [], searchErr: false })
        }
    }

    render() {
        const { results, query, searchErr } = this.state;
        const { updateBookShelf } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            value={query}
                            placeholder="Search by title or author"
                            onChange={this.handleChange}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    {results.length > 0 && (
                        <div>
                            <h3>Search {results.length} books</h3>
                            <ol className="books-grid">
                                {results.map(data => (
                                    <EachBookShelf bookId={data.id} key={data.id} updateBookShelf={updateBookShelf} />
                                ))}
                            </ol>
                        </div>
                    )}
                    {searchErr && (
                        <h3>Search did not return any books. Please try again!</h3>
                    )}
                </div>
            </div >
        )
    }
}
BooksSearch.propTypes = {
    updateBookShelf: PropTypes.func,
}
export default BooksSearch;
