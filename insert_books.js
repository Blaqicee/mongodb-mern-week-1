// insert_books.js
const { MongoClient } = require('mongodb');

async function main() {
    const uri = "YOUR_MONGODB_URI"; // replace with your URI
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("plp_bookstore");
        const books = database.collection("books");

        const bookDocs = [
            { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", published_year: 1937, price: 15.99, in_stock: true, pages: 310, publisher: "Allen & Unwin" },
            { title: "1984", author: "George Orwell", genre: "Dystopian", published_year: 1949, price: 12.99, in_stock: true, pages: 328, publisher: "Secker & Warburg" },
            { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", published_year: 1960, price: 10.99, in_stock: true, pages: 281, publisher: "J.B. Lippincott & Co." },
            { title: "A Game of Thrones", author: "George R.R. Martin", genre: "Fantasy", published_year: 1996, price: 20.99, in_stock: false, pages: 694, publisher: "Bantam Spectra" },
            { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", published_year: 1951, price: 9.99, in_stock: true, pages: 234, publisher: "Little, Brown and Company" },
            { title: "Brave New World", author: "Aldous Huxley", genre: "Dystopian", published_year: 1932, price: 11.99, in_stock: false, pages: 268, publisher: "Chatto & Windus" },
            { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", published_year: 1925, price: 8.99, in_stock: true, pages: 180, publisher: "Charles Scribner's Sons" },
            { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", published_year: 1997, price: 18.99, in_stock: true, pages: 309, publisher: "Bloomsbury" },
            { title: "The Da Vinci Code", author: "Dan Brown", genre: "Thriller", published_year: 2003, price: 14.99, in_stock: true, pages: 454, publisher: "Doubleday" },
            { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", published_year: 1988, price: 13.99, in_stock: false, pages: 197, publisher: "HarperTorch" }
        ];

        const result = await books.insertMany(bookDocs);
        console.log(`${result.insertedCount} books inserted.`);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

