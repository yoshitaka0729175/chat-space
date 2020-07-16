class Api::MessagesController < ApplicationController
  def index
    # ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    group = Group.find(params[:group_id])
    # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    last_message_id = params[:id]
    # 取得したグループでのメッセージたちから、idがlast_message_idより新しい（大きい）メッセージたちのみを取得
    @messages = group.messages.includes(:user).where("id > ?", last_message_id)
  end
end
