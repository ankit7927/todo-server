const jwt = require("jsonwebtoken");

module.exports = authMiddlewere = (req, res, next) => {
    const token = req.headers.token || req.headers.Authorization || req.headers.authorization || "";
    if (!token) return res.status(409).json({ message: "no token provided" });

    try {
        req.user = jwt.verify(token, "some secret");
        next();
    } catch (error) {
        res.status(500).json({ message: "failed to decode token" });
    }
}

