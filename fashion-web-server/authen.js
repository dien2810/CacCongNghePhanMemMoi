const ACCESS_TOKEN_SECRET = "awfsdcxzvv";
export function authenToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader.split(" ")[1];
  if (!token) res.sendStatus(401); // Unauthorize

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      return res.status(403).send(err); // Forbidden
    }
    next();
  });
}
