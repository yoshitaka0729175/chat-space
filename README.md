# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :groups, through: :groups_users
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|title|text|null: false|
|text|text|null: false|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|member|integer|null: false|
### Association
- has_many :messages
- has_many :users, turough: :groups_users

## groups_userテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|groups_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

