const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env);

const port = process.env.PORT || 3000;

// 4. STARTING THE SERVER

app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
