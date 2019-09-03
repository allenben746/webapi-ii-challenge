const express = require('express');
const router = express.Router();

const postsRoutes = require('./routes/posts');


const server = express();

console.log("Server recognized.")
server.use('/posts', postsRoutes);

server.listen(8000, () => console.log('API running on port 8000'));

module.exports = router;