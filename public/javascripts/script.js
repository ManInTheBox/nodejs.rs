
/**
 * Adds event handler for `ESC` keystroke.
 *
 * Same as:
 * `$.fn.extend({ method: function () {} });`
 */

jQuery.prototype.closeOnEscape = function (speed) {
  var self = this;
  speed = speed || 200;

  $(document).on('keyup', function (e) {
    if (e.keyCode === 27)
      self.hide(speed);
  });

  return self;
};

$(function() {
  $("a.back-to-top").click(function() {
    $("html, body").animate({
      scrollTop: $($(this).attr("href")).offset().top + "px"
    }, {
      duration: 400,
      easing: "swing"
    });
    return false;
  });
});