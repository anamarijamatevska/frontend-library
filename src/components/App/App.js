import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Categories from '../Categories/categories';
import Books from '../Books/BookList/books';
import Header from '../Header/header';
import BookAdd from '../Books/BookAdd/bookAdd';
import BookEdit from "../Books/BookEdit/bookEdit";
import EShopService from "../../repository/eshopRepository";
import {CATEGORIES, COUNTRY, AUTHOR, DEFAULT_BOOK} from "../../constants";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      books: [],
      authors: [],
      selectedBook: {}
    }
  }

  render() {
    return (
        <Router>
          <Header/>
          <main>
            <div className="container">
              <Route path={"/categories"} exact render={() =>
                  <Categories categories={this.state.categories}/>}/>
              <Route path={"/books/add"} exact render={() =>
                  <BookAdd categories={this.state.categories}
                              authors={this.state.authors}
                              country={COUNTRY}
                              author={AUTHOR}
                              onAddBook={this.addBook}
                  />}
              />
              <Route path={"/books/edit/:id"} exact render={() =>
                  <BookEdit categories={this.state.categories}
                               book={this.state.selectedBook}
                               authors={this.state.authors}
                               country={COUNTRY}
                               author={AUTHOR}
                               onEditBook={this.editBook}
                  />}
              />
              <Route path={"/books"} exact render={() =>
                  <Books books={this.state.books}
                            onDelete={this.deleteBook}
                            onDecrement={this.decrementBookValue}
                            onEdit={this.getBook}
                  />}
              />
                <Route path={"/"} exact render ={() =>
                    <Books books={this.state.books}
                              onDelete={this.deleteBook}
                              onDecrement={this.decrementBookValue}
                              onEdit={this.getBook}
                    />
                } />
            </div>
          </main>
        </Router>
    );
  }

  componentDidMount() {
    this.loadCategories();
    this.loadBooks();
    this.loadAuthors();
  }

    loadAuthors = () => {
        EShopService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    loadBooks = () => {
      EShopService.fetchBooks()
          .then((data) => {
              data?.data?.push(DEFAULT_BOOK);
              this.setState({
                  books: data.data.sort((a,b) => {
                      return a.name - b.name;
                  })
              })
            });
    }

  loadCategories = () => {
      this.setState({
            categories: CATEGORIES
      })
  }

    deleteBook = (id) => {
        EShopService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }

    addBook = (name, availableCopies, category, authorId) => {
        EShopService.addBook(name, availableCopies, category, authorId)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (id) => {
        EShopService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

  editBook = (id, name, availableCopies, category, authorId) => {
    EShopService.editBook(id, name, availableCopies, category, authorId)
        .then(() => {
          this.loadBooks();
        });
  }

  decrementBookValue = (id) => {
      EShopService.decrementBookValue(id)
          .then(() => {
              this.loadBooks();
          });
  }
}

export default App;
