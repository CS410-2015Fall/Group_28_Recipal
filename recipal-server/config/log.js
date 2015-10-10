var logging = {
  development: {
    debug: console.log,
    print: console.log,
    error: console.log
  },
  production: {
    debug: console.log,
    print: console.log,
    error: console.log
  }
}

module.exports = function() {
  if (!process.ENV) return logging.development;
  return logging[process.ENV];
}
