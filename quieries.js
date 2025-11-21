// queries.js
const { MongoClient } = require('mongodb');

async function runQueries() {
    const uri = "YOUR_MONGODB_URI"; // replace with your URI
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("plp_bookstore");
        const books = db.collection("books");

        // 1. Find all Fantasy books
        const fantasyBooks = await books.find({ genre: "Fantasy" }).toArray();
        console.log("Fantasy Books:", fantasyBooks);

        // 2. Find books published after 2000
        const recentBooks = await books.find({ published_year: { $gt: 2000 } }).toArray();
        console.log("Recent Books:", recentBooks);

        // 3. Find books by "George Orwell"
        const orwellBooks = await books.find({ author: "George Orwell" }).toArray();
        console.log("George Orwell Books:", orwellBooks);

        // 4. Update price of "1984" to 13.99
        await books.updateOne({ title: "1984" }, { $set: { price: 13.99 } });

        // 5. Delete "The Alchemist"
        await books.deleteOne({ title: "The Alchemist" });

        // 6. Books in stock AND published after 2010, only show title, author, price
        const advancedQuery = await books.find({ in_stock: true, published_year: { $gt: 2010 } }, { projection: { title: 1, author: 1, price: 1 } }).toArray();
        console.log("Advanced Query:", advancedQuery);

        // 7. Average price by genre
        const avgPriceByGenre = await books.aggregate([
            { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
        ]).toArray();
        console.log("Average Price by Genre:", avgPriceByGenre);

        // 8. Indexes
        await books.createIndex({ title: 1 });
        await books.createIndex({ author: 1, published_year: 1 });

    } finally {
        await client.close();
    }
}

runQueries().catch(console.error);

