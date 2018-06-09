const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, err => {
  err
    ? console.error(err)
    : console.log(
        `Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
      );
});
