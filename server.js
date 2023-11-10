const app = require('./src/app');
const seed = require('./src/db/seed');

const port = 3000;

seed();

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
})