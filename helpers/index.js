
/**
 * Module dependencies.
 */

var crypto = require('crypto'),
  _marked = require('marked').setOptions({
    breaks: true,
    sanitize: true,
    langPrefix: '',
    highlight: function (code, lang) {
      var raw = /\[raw=.*\]/.exec(code);
      if (raw) {
        code = code.replace(raw[0], '').trim();
        // need to encode b/c marked will just skip encoding
        code = encode(code);
        raw = raw[0]
                .replace('[raw=', '')
                .replace(']', '')
                .trim();
        raw = encode(raw);

        return !!raw.length
          ? [
              '<a class="raw-file" href="#@{raw}">@{raw}</a>',
              '<input type="hidden" value="[raw=@{raw}]" />',
              code,
              '<input type="hidden" value="[/raw=@{raw}]" />'
            ].join('').replace(/@{raw}/g, raw)
          : code;
      }
    }
  });

/**
 * Workaround to provide customized headings.
 *
 * @param {String} Markdown text
 * @return {String} HTML content
 */

var marked = function (text) {
  var tokens = _marked.lexer(text);
  text = _marked.parser(tokens);
  text = text.replace(/<h(\d+)>(.*)<\/h(\d+)>/ig, function (match, $1, $2) {
    return '<h'+$1+' id="'+slugify($2)+'" class="anchor">'+$2+'</h'+$1+'>';
  });

  return text;
};

/**
 * Method to upper-case first character in string.
 *
 * @param {String} value
 */

exports.toUpperCaseFirst = function (v) {
  return v.charAt(0).toUpperCase() + v.slice(1);
};

/**
 * Generates hash string.
 *
 * @return {String} hash string
 */

exports.generateHash = function() {
  return crypto.createHmac('md5', Date()).digest('hex');
};

/**
 * Checks if given email address is valid.
 *
 * @param {String} email address
 * @return {Boolean} Whether email address is valid or not.
 */

exports.EmailValidator = function (v) {
  var regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
  return v ? regex.test(v) : true;
};

/**
 * Checks if given URL is valid.
 *
 * @param {String} URL
 * @return {Boolean} Whether URL is valid or not.
 */

exports.UrlValidator = function (v) {
  var regex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
  return v ? regex.test(v) : true;
};

/**
 * Method will format date for output.
 *
 * @param {Date} date to string
 * @return {String} formatted date output
 */

exports.formatDate = function (date) {
  var month = date.getMonth();
  month = month < 10 ? '0' + month : month;

  return date.getDate() + '.' + month + '.' + date.getFullYear();
};

/**
 * Method will format date with more information.
 *
 * @param {Date} date to format
 * @return {String} date to string
 */

exports.formatDateFine = function (date) {
  var months = [
    'januar',
    'februar',
    'mart',
    'april',
    'maj',
    'jun',
    'jul',
    'avgust',
    'septembar',
    'oktobar',
    'novembar',
    'decembar'
  ];

  var hours = date.getHours(),
    minutes = date.getMinutes();

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return date.getDate() + '. ' + months[date.getMonth()] + ' ' + date.getFullYear() + ' ' + hours + ':' + minutes;
};

/**
 * Method will convert markdown content to HTML.
 *
 * Second argument `shouldDecode` means you still want HTML special characters
 * in generated HMLT content.
 *
 * @param {String} markdown content
 * @param {Boolean} should (HTML) decode markdown content
 * @return {String} HTML content
 */

exports.markdown = function (content, shouldDecode) {
  content = postProcessMarkdown(marked(content));
  return !shouldDecode
    ? content
    : decode(content);
};

/**
 * Method will cut string to desired length.
 *
 * @param {String} string value
 * @param {Number} desired length
 * @return {String} formatted string
 */

exports.substring = function (string, length) {
  length = length || 27;
  return string.length > length ? string.substring(0, length) + '...' : string;
};

/**
 * Parse mini markdown implementation.
 * The following conversions are supported,
 * primarily for the "flash" middleware:
 *
 *    _foo_ or *foo* become <em>foo</em>
 *    __foo__ or **foo** become <strong>foo</strong>
 *    [A](B) becomes <a href="B">A</a>
 *
 * @param {String} str
 * @return {String}
 * @api private
 * @author TJ Holowaychuk (extracted from express.utils)
 */

exports.miniMarkdown = function(str){
  return String(str)
    .replace(/(__|\*\*)(.*?)\1/g, '<strong>$2</strong>')
    .replace(/(_|\*)(.*?)\1/g, '<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
};

/**
 * Method will HTML encode given content.
 *
 * @param {String} HTML content to encode
 * @return {String} encoded HTML content
 */

exports.encode = encode = function (html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Method will HTML decode given content.
 *
 * @param {String} HTML content to decode
 * @return {String} decoded HTML content
 */

exports.decode = decode = function (html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};

/**
 * Method will strip HTML tags from given string.
 *
 * @param {String} HTML content
 * @return {String} content without HTML tags
 */

exports.stripTags = function (html) {
  return html.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '');
};

/**
 * Method to slugify given value.
 *
 * @return {String} slugified value
 */

exports.slugify = slugify = function (v) {
  return v
          .toLowerCase()
          .replace(/а/g, 'a')
          .replace(/б/g, 'b')
          .replace(/в/g, 'v')
          .replace(/г/g, 'g')
          .replace(/д/g, 'd')
          .replace(/ђ/g, 'đ')
          .replace(/е/g, 'e')
          .replace(/ж/g, 'ž')
          .replace(/з/g, 'z')
          .replace(/и/g, 'i')
          .replace(/ј/g, 'j')
          .replace(/к/g, 'k')
          .replace(/л/g, 'l')
          .replace(/љ/g, 'lj')
          .replace(/м/g, 'm')
          .replace(/н/g, 'n')
          .replace(/њ/g, 'nj')
          .replace(/о/g, 'o')
          .replace(/п/g, 'p')
          .replace(/р/g, 'r')
          .replace(/с/g, 's')
          .replace(/т/g, 't')
          .replace(/ћ/g, 'ć')
          .replace(/у/g, 'u')
          .replace(/ф/g, 'f')
          .replace(/х/g, 'h')
          .replace(/ц/g, 'c')
          .replace(/ч/g, 'č')
          .replace(/џ/g, 'dž')
          .replace(/ш/g, 'š')
          .replace(/č/g, 'c')
          .replace(/ć/g, 'c')
          .replace(/š/g, 's')
          .replace(/đ/g, 'dj')
          .replace(/ž/g, 'z')
          .replace(/(\s)+/g, '-')
          .replace(/[^a-zA-Z0-9-]/g, '')
          .replace(/-{2,}/g, '-')
          .replace(/^-/, '')
          .replace(/-$/, '');
};

/**
 * Method will post-process given markdown content.
 *
 * @param {String} markdown content
 * @return {String} post-processed markdown content
 * @api private
 */

function postProcessMarkdown(markdown) {
  var cutHere = /\[cutHere\]/.exec(markdown);
  if (cutHere) {
    markdown = markdown.replace(cutHere[0], '<input type="hidden" value="cutHere" />').trim();
  }
  return markdown;
}