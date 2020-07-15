#@usersを配列形式にし、変数userとして分解していく
json.array! @users do |user|
  json.id user.id
  json.name user.name
end