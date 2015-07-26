/*
 * FullWidthHeadline.js v1.0.1
 * Copyright (c) 2015, Fritz Lekschas http://f.lekschas.de
 *
 * FullWidthHeadline.js is licensed under the MIT License.
 */

(function($) {
  'use strict';

  $.fn.fullWidthHeadline = function(options) {

    var $container,
        fontWidth = 0,
        numChars = 0,
        settings = $.extend({
          delay: 250,
          maxFontSize: 3,
          whitespaceWidth: 1,
        }, options);

    function debounce (fn, delay) {
      var timer = null;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }

    function getFontWidth (string) {
      // Create a temporarly element to assess font width.
      var element = $('<div>' + string + '</div>')
            .css({
              'position': 'absolute',
              'float': 'left',
              'white-space': 'nowrap',
              'visibility': 'hidden',
              'font': '16px '+ settings.font,
              'text-transform': 'uppercase'
            })
            .appendTo($('body'));

      // Store font width globally
      fontWidth = element.width();

      // Clean DOM
      element.remove();
    }

    function init ($el) {
      var text = $el.text(),
          words = text.split(' '),
          inject = '<span class="container">';

      numChars = text.length;

      if (words.length) {
        for (var i = 0, len = words.length; i < len; i++) {
          inject += '<span class="word-'+ (i + 1) +'">'+ words[i] +'</span> ';
        }

        // Remove last white space and close container
        $container = $($.parseHTML(inject.slice(0, -1) + '</span>'));

        $el
          .empty()
          .append($container);

        // Set default font to the elements font family
        settings.font = settings.font || $el.css('font-family');

        getFontWidth(text);
        updateFontSize($el);
      }
    }

    function updateFontSize ($el) {
      var elw = $el.width(),
          elFontSize = parseFloat($el.css('font-size')),
          fontSize = parseFloat(((elw / fontWidth) * 16 * 0.999).toFixed(3)),
          maxFontSize = elFontSize * settings.maxFontSize,
          css = {
            fontSize: null
          };

      if (fontSize < maxFontSize) {
        // Set ideal font size.
        css.fontSize = fontSize + 'px';
      } else {
        // Use max font size.
        css.fontSize = settings.maxFontSize + 'em';
        // Adjust letter spacing.
        css.letterSpacing = ((elw - (fontWidth * maxFontSize / 16)) / maxFontSize) / numChars + 'em';
      }

      $container.css(css);
    }

    return this.each(function () {
      var $this = $(this);

      $(window).on('resize orientationchange', debounce(function () {
        updateFontSize($this);
      }, settings.delay));

      init($this);
    });
  };
}(jQuery));
