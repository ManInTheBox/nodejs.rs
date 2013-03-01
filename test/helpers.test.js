var helpers = require('../helpers'),
    fs = require('fs')
  , fixtures = __dirname + '/fixtures';

describe('helpers', function () {

    describe('#markdown()', function () {
        var text = fs.readFileSync(fixtures + '/markdown', 'utf8');
        var r = helpers.markdown(text);

        it('should parse markdown', function () {
            r.should.eql("<pre><code class=\"javascript\">alert(&#39;ovo je javascript&#39;);</code></pre>\n");
        });

    });

});