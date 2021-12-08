const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const app = require("./app")
dotenv.config({ path: "./config.env"})

app.use(cors({
    credentials: 'include',
    origin: '*'
}));


// Connect with local database
const DB = process.env.DATABASE_LOCAL
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(() => console.log('DB connection successful'))

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`app is running on the port ${port}`);
})
