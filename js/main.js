/* Collapsible panels */
$(document).ready(function() {
   var collapsibles = $('.collapsible');
   collapsibles.each(function() {
    var header = $(this).find('.header');
    header.addClass('expandedHeader');
    var body = $(this).find('.body');
    header.click(function () {
       body.slideToggle('medium');
       header.toggleClass('collapsedHeader');
       header.toggleClass('expandedHeader');
    });
    header.click();
    $('a[rel^="lightbox"]').lightBox();
   });
});

/* Blanks */
$(document).ready(function() {
	var blanks = $('.blank');
  blanks.each(function(index, value) {
		initializeBlank(value);
		$(value).css('font-weight', 'normal');
		$(value).click();
	});
});

function vocabToBlanks(ul) {
	$.each($(ul).find("li"), function(index, value) {
		var word = extractTranslatedWord(value);
		var li = $(value);
		$(li).html('<span class=\'deutsch\'>'+li.find('.deutsch').html()+'</span>: <span class=\'blank\'>'+ word.en+'</span>');
		$.each(li.find('.blank'), function(index, value) {
			initializeBlank(value);
                        $(value).addClass('blankHidden');
                        $(value).removeClass('blankShown');
                        $(value).attr('title', 'Show answer');
		});
	});
}

function reshuffle(ul) {
	var original = new Array();
	var items = $(ul).find('li');
	items.each(function(index, item) {
		original.push($(item));
	});
	$(ul).empty();
	while(original.length > 0)
	{
		var randomIndex = Math.floor(Math.random()* original.length);
		if(original.length == 1) {
			randomIndex = 0;
		}
		$(ul).append(original[randomIndex]);
		original.splice(randomIndex, 1);
	}
	vocabToBlanks(ul);
}

function reshuffleUl(ul) {
	var original = new Array();
	var items = $(ul).find('li');
	items.each(function(index, item) {
		original.push($(item));
	});
	$(ul).empty();
	while(original.length > 0)
	{
		var randomIndex = Math.floor(Math.random()* original.length);
		if(original.length == 1) {
			randomIndex = 0;
		}
		$(ul).append(original[randomIndex]);
		original.splice(randomIndex, 1);
	}
	$.each($(ul).find('.blank'), function(index, value) {
			initializeBlank(value);
            $(value).addClass('blankHidden');
            $(value).removeClass('blankShown');
            $(value).attr('title', 'Show answer');
	});
}

function initializeBlank(value) {
    $(value).click(function() {
		var blank = $(this);

      if(blank.hasClass('blankHidden')) {
        blank.css('padding-left', '');
        blank.removeClass('blankHidden');
			blank.addClass('blankShown');
			blank.attr('title', 'Hide answer');
      } else {
              if(blank.html().length <= 5) {
                    blank.css('padding-left', '25px');
              }
			blank.addClass('blankHidden');
			blank.removeClass('blankShown');
        blank.attr('title', 'Show answer');
      }
    });
 }
	
var vocabulary = new Array();
$(document).ready(function() {
  $.each($(".vocabulary").find(".deutsch"), function(index, value) {
		var word = extractTranslatedWord($(value).parent());
		vocabulary[word.de.toUpperCase()] = word.en.trim();
  });
});

function translatedWord(de, en) {
	this.de = de;
	this.en = en
}

function extractTranslatedWord(li) {
	var spanDE = $(li).find('.deutsch');
  var wordDE = spanDE.html().replace(/der |die |das /, function(thematch){return "";});
  var meaning = $(li).html().replace(/<span(.)*<\/span>:/,   function(thematch){return "";});
	 
	return new translatedWord(wordDE, meaning.trim());
}

function showMeanings(div) {
	var text = $(div).html();
	var translated = new Array();
	$.each(text.split(/\s|\.|,/g), function(index, value) {
		var valueUpperCap = value.toUpperCase();
		if(value != '.' && value != ',' && value != '"' && !translated[valueUpperCap] && vocabulary[valueUpperCap]){
			text = text.replace(new RegExp(value, "g"), function(thematch){
				return '<span class=\'eng-on-hover\' title=\''+vocabulary[valueUpperCap]+'\'>'+thematch+'</span>'; 
			});
			translated[valueUpperCap] = 1;
		}
	});
	$(div).html(text);
}

