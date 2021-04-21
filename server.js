const app = require('./app');

const port = 3000;

// 4. STARTING THE SERVER

app.listen(port, () => {
  console.log(`App running on port ${port} ...`);
});
