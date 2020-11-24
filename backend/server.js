//Entry Point for the server for the back-end
import express from 'express';

const app = express();
const PORT = 5000;

app.listen(PORT, console.log(`Server running on Port ${PORT}`));
