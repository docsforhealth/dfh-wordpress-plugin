import $ from 'jquery';

$(function() {
  $('.toolkit-topics__toggle').on('click', function() {
    $('.toolkit-topics').toggleClass('toolkit-topics--open');
    const $this = $(this),
      oldText = $this.text(),
      newText = oldText.includes('Show')
        ? oldText.replace('Show', 'Hide')
        : oldText.replace('Hide', 'Show');
    $this.text(newText);
  });
});
