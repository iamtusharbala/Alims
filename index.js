const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Book = require('./models/books');
const router = require('./routes/bookRoute');
const cors = require('cors');
const path = require('path')
const engine = require('ejs-mate')
const methodOverride = require('method-override');



//Middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.engine('ejs', engine)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//CORS Policy
app.use(cors({
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))


app.get("/", (req, res) => {
    res.status(200).render('home', { 'title': 'Alims - Home' });
})


// app.post("/search", async (req, res) => {
//     try {
//         const { search } = req.body;
//         const fetchBook = await Book.find({ title: / search / });
//         if (fetchBook) {
//             console.log(fetchBook);
//             console.log('working');
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })

app.use('/books', router);

mongoose.connect('mongodb://127.0.0.1:27017/alims').then(() => console.log('DB Connected')).catch((e) => console.log('Some error'));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})