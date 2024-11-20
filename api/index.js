import dbConnect from '../config/database.js';  // This is correct for default export


import express from 'express';
import router from '../routes/PracticalRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount API routes
app.use("/api/v1", router);

dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
