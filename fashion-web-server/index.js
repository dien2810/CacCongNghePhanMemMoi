import app from "./app.js";
const PROTOCOL = "http";
const HOST = "localhost";
const PORT = 3000;
try {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PROTOCOL}://${HOST}:${PORT}`);
  });
} catch (err) {
  console.log("err", err);
}
