var helpers = require('../helpers'),
  fs = require('fs');

describe('#markdown()', function () {
  var text = fs.readFileSync(dirname + '/fixtures/markdown');
  var r = helpers.markdown(text);
  it('should parse markdown', function () {
    r.should.eql('<pre><code class="javasript">ovo')
  });
});