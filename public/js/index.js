$(function() {
  $(".enter-trig").focus();

  $(".advanced").one("click", function() {
    $(this).empty();
    $("#advanced").fadeIn();
  });
  
  //ajaxURL.js
  new Clipboard('.copy');
  
  $("#submit-code").one("click", function() {
    $("#submit-code").css('backgroundColor', '#E0E0E0');
    $.ajax({
      method: 'POST',
      url: '/add',
      headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
      data: {id: $(".key-box").eq(0).val(), url: $(".url-box").val()},
      dataType: 'json',
      beforeSend: function() {
        $(".advanced").empty();
        $("#advanced").empty();
      },
      success: function(data) {
        console.log(data);
        if(data.id) {
          $(".cbox > input").val("http://links.gq/" + data.id);
          $(".cbox > button").addClass("copy").html("COPY").attr("data-clipboard-text","http://links.gq/" + data.id);
        }
        else {
        $(".cbox > input").val("Error:" + data.error);
        }
      },
      error: function(xhr,status,error) {
        $(".cbox > input").val("Oops! Check your inputs, captain");
      }
    });
  });
  
  //submitWithEnter.js
  $(".enter-trig").keypress(function(event) {
    
    if(event.which == 13)
      $(".trigg").trigger("click");
  });
   
});