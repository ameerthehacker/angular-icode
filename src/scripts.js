$(function() {
  $('body').on('click', '.message .close', function() {
    $(this).closest('.message').transition('fade');
  });  
});