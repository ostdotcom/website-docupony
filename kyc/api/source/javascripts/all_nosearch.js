//= require ./lib/_energize
//= require ./app/_toc
//= require ./app/_lang
//= require ./app/_custom

$(function() {
  loadToc($('#toc'), '.toc-link', '.toc-list-h2', 20);
  setupLanguages($('body').data('languages'));
  $('.content').imagesLoaded( function() {
    window.recacheHeights();
    window.refreshToc();
  });
});

window.onpopstate = function() {
  activateLanguage(getLanguageFromQueryString());
};
