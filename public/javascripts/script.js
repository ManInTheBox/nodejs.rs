
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

window.onscroll = function fadeMenu() {
  if ($(this).scrollTop() > 60) {
    $('header').css('opacity', '0.7');
  } else {
    $('header').css('opacity', '1');
  }
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

  $('header').hover(function () {
    if ($(this).css('opacity') < 1)
      $(this).css('opacity', 1);
  }, function () {
    if ($(window).scrollTop() > 60)
      $(this).css('opacity', '0.7');
  });

  $('.anchor').on('click', function () {
    window.location.hash = $(this).attr('id');
  });

});

function browserify(fn) {
  $.ajax({
    url: '/browserify.js',
    dataType: 'text',
    success: function (res) {
      var browserify = document.createElement('script');
      browserify.type = 'text/javascript';
      browserify.id = 'browserify';
      browserify.innerHTML = res;
      if (!$('#browserify').length) {
        document.getElementsByTagName('head')[0].appendChild(browserify);
      }
      fn();
    },
    error: function (xhr) {
      console.log('error', xhr.responseText);
    }
  });
}