import axios from '../custom-axios/axios';

const EShopService = {
    fetchBooks: () => {
        return axios.get("/books");
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    fetchCategories: () => {
        return axios.get("/categories");
    },
    addBook: (name, availableCopies, category, author) => {
        console.log(category)
        return axios.post("/books/add", {
            "name" : name,
            "availableCopies" : availableCopies,
            "category" : category,
            "author" : author
        });
    },
    editBook: (id, name, availableCopies, category, author) => {
        return axios.put(`/books/edit/${id}`, {
            "name" : name,
            "availableCopies" : availableCopies,
            "category" : category,
            "author" : author
        });
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    decrementBookValue: (id) => {
        return axios.post(`/books/decrement/${id}`);
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    }
}

export default EShopService;
