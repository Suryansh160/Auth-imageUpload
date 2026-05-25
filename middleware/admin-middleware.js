const isAdminUser = (req, res, next) => {
  if (req.userInfoSSS.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied! Admin rights required.'
    })
  }

  next()
}

module.exports = isAdminUser
