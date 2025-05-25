export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "User not authenticated" });
}

export function ensureAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user && req.user.role === 'admin') {
      return next();
    } else {
      // User is authenticated but not an admin
      res.status(403).json({ error: "User not authorized for this resource" });
    }
  } else {
    // User is not authenticated at all
    res.status(401).json({ error: "User not authenticated" });
  }
}
