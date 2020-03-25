const pageGen = require('./plop-templates/page/gen')
module.exports = function(plop) {
  plop.setGenerator('page', pageGen)
}
