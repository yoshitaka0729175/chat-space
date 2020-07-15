$(function() {
//一致するユーザーがいた場合の処理
  function addUser(user) {
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    //作ったhtmlを打ち込む
    $("#UserSearchResult").append(html);
  }
  //一致するユーザーがいなかった場合の処理
  function addNoUser() {
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    $("#UserSearchResult").append(html);
  }
  function addMember(name, id) {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
    $(".ChatMembers").append(html);
  }
    //検索欄にも記入力されるたびに処理を行う
  $("#UserSearch__field").on("keyup", function() {
    //検索欄に入力された文字をvalで取得し変数inputに代入
    let input = $("#UserSearch__field").val();

    $.ajax({
      type: "GET",    //HTTPメソッド
      url: "/users",       //users_controllerの、indexアクションにリクエストの送信先を設定する
      //keyを自分で決め（今回はkeywordと定義）valueには先ほど検索欄から取得し代入したinputの値を使う
      dataType: 'json',
      data: { keyword: input },   //テキストフィールドに入力された文字を設定する
    })

    //jbuilderファイルで作った配列を引数にしdone関数を起動
    .done(function(users){
      //console.log("成功です")ここで一旦動いているか確認
      //if,else if,elseどの場合においても、処理後は、すでに検索欄に出力されている情報を削除する
      $("#UserSearchResult").empty();
      //検索に一致するユーザーが０じゃない場合(いる場合)
      if (users.length !== 0) {

        //usersという配列をforEachで分解し、ユーザーごとにaddUser関数に飛ばす
        users.forEach(function(user) {
          addUser(user);
        });
        //入力欄に文字が入力されていない場合は処理を終了
      } else if (input.length == 0) {
        return false;
        //検索に一致するユーザーがいない場合はaddNoUserに飛ばす
      } else {
        addNoUser();
      }
    })
    .fail(function(){
      //console.log("失敗です")こちらも動いているか事前に確認
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });
  $("#UserSearchResult").on("click", ".ChatMember__add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addMember(userName, userId);
  });
  $(".ChatMembers").on("click", ".ChatMember__remove", function() {
    $(this).parent().remove();
  });
});