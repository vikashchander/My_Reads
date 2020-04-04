import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import EachBookShelf from './EachBookShelf';
import '../../App.css';

function BooksShelf(props) {
    const { shelfData, updateBookShelf } = props;
    const currentlyRead = shelfData.currentlyReading;
    const Read = shelfData.read;
    const wantToRead = shelfData.wantToRead;
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div >
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    currentlyRead === undefined ? <div className='bookshelf-loader'></div> :
                                        currentlyRead.map((data) =>
                                            <EachBookShelf key={data} bookId={data} updateBookShelf={updateBookShelf} />
                                        )
                                }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {
                                    wantToRead === undefined ? <div className='bookshelf-loader'></div> :
                                        wantToRead.map((data) =>
                                            <EachBookShelf key={data} bookId={data} updateBookShelf={updateBookShelf} />
                                        )

                                }
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {Read === undefined ? <div className='bookshelf-loader'></div> :
                                    Read.map((data) => (
                                        Read.length === 0 ? 'No Books' :
                                            <EachBookShelf key={data} bookId={data} updateBookShelf={updateBookShelf} />
                                    )
                                    )
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div >
    )
}

BooksShelf.propTypes = {
    shelfData: PropTypes.object,
    updateBookShelf: PropTypes.func

}
export default BooksShelf;
