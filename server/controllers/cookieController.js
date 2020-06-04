const cookieController = {
  /**
   * Set session cookies once user logs in or registers
   */
  setSSIDCookie(req, res, next) {
    const ssid = res.locals.userID
    res.cookie('ssid', ssid, { httpOnly: true })
    res.locals.cookieID = ssid
    return next()
  }
}

module.exports = cookieController;