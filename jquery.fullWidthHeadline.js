/*
 * FullWidthHeadline.js v1.0.0
 * Copyright (c) 2015, Fritz Lekschas http://f.lekschas.de
 *
 * FullWidthHeadline.js is licensed under the MIT License.
 */

(function($) {
  'use strict';

  $.fn.fullWidthHeadline = function(options) {

    var fontWidth = 0,
        settings = $.extend({
          // MSEC
          delay: 250,
          // EM
          maxFontSize: 3,
          // EM
          maxLetterSpacing: 0.5,
          // EM
          wordSpacing: 0.125,
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

      var width = element.width();

      // Clean DOM
      element.remove();

      return width;
    }

    function init (el) {
      var $container,
          $el = $(el),
          text = $el.text(),
          words = text.split(' '),
          inject = '<span class="container">';

      el.numChars = text.length;
      el.numWords = words.length;

      if (el.numWords) {
        for (var i = 0, len = words.length; i < len; i++) {
          inject += '<span class="word-'+ (i + 1) +'">'+ words[i] +'</span> ';
        }

        // Remove last white space and close container
        $container = $($.parseHTML(inject.slice(0, -1) + '</span>'));
        el.$container = $container;

        if (words.length < 3) {
          $container.addClass('centered-words');
        }

        $el
          .empty()
          .append($container);

        // Set default font to the elements font family
        var styles;

        if (!settings.font && window.getComputedStyle) {
          styles = window.getComputedStyle(el, null);
        }
        if (!settings.font && !styles && el.currentStyle) {
          styles = el.currentStyle;
        }
        if (!settings.font && !styles && el.style) {
          styles = el.style;
        }
        if (styles) {
          try {
            settings.font = styles.getPropertyValue('fontFamily');
          } catch (e) {}
        }
        settings.font = settings.font || $el.css('font-family');

        el.fontWidth = getFontWidth(text);
        updateFontSize(el);
      }
    }

    function updateFontSize (el) {
      var $el = $(el),
          elw = $el.width(),
          elFontSize = parseFloat($el.css('font-size')),
          fontSize = parseFloat(((elw / el.fontWidth) * 16 * 0.999).toFixed(3)),
          maxFontSize = elFontSize * settings.maxFontSize,
          css = {
            fontSize: '',
            letterSpacing: ''
          };

      if (fontSize < maxFontSize) {
        // Set ideal font size.
        css.fontSize = fontSize + 'px';
      } else {
        // Use max font size.
        css.fontSize = settings.maxFontSize + 'em';
        // Adjust letter spacing.
        css.letterSpacing = Math.min(
          settings.maxLetterSpacing,
          ((elw - (el.fontWidth * maxFontSize / 16)) / maxFontSize) / el.numChars
        ) + 'em';
      }

      el.$container.css(css);
    }

    var that = this;
    $(window).on('resize orientationchange', debounce(function () {
      that.each(function () {
        updateFontSize(this);
      });
    }, settings.delay));

    return this.each(function () {
      init(this);
    });
  };
}(jQuery));
