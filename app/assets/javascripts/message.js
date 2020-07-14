$(function(){
  function buildHTML(message){
  if ( message.image ) {
    let html =
      `<div class="MessageBox">
        <div class="MessageInfo">
          <div class="MessageInfo__userName">
            ${message.user_name}
          </div>
          <div class="MessageInfo__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="Message__content">
            ${message.content}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>
      </div>`
    return html;
  } else {
    let html =
    `<div class="MessageBox">
      <div class="MessageInfo">
        <div class="MessageInfo__userName">
          ${message.user_name}
        </div>
        <div class="MessageInfo__date">
          ${message.created_at}
        </div>
      </div>
      <div class="Message">
        <p class="Message__content">
          ${message.content}
        </p>
      </div>
    </div>`
    return html;
  };
}

  $('.Form').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');

    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data);
      $('.Messagelist').append(html);
      $('form')[0].reset();
      $('.Messagelist').animate({ scrollTop: $('.Messagelist')[0].scrollHeight});
      $('.btn').prop('disabled', false);
    })
    .fail(function() {
      alert('メッセージを送信できません')
    });      
  });
});