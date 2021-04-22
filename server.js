/* eslint-disable no-console */
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connections);
    console.log('DB Connection successful');
  });

// console.log(process.env);

const port = process.env.PORT || 3000;

// 4. STARTING THE SERVER

app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
