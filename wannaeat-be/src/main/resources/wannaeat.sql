CREATE TABLE `users` (
	`user_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`email`	VARCHAR(100)	NOT NULL,
	`nickname`	VARCHAR(20)	NOT NULL	COMMENT 'UNIQUE',
	`phone`	VARCHAR(255)	NULL	COMMENT '양방향 암호화 기법 적용',
	`role`	VARCHAR(20)	NOT NULL	COMMENT '"GUEST", "BUSINESS", "CUSTOMER"',
	`social_type`	VARCHAR(20)	NOT NULL	COMMENT '"KAKAO", "GOOGLE"',
	`deleted`	TINYINT(1)	NOT NULL	DEFAULT false	COMMENT '0 : 탈퇴X, 1 : 탈퇴'
);

CREATE TABLE `user_tokens` (
	`user_id`	BIGINT	NOT NULL,
	`refresh_token`	VARCHAR(255)	NULL,
	`fcm_token`	VARCHAR(255)	NULL
);

CREATE TABLE `restaurants` (
	`restaurant_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`user_id`	BIGINT	NOT NULL,
	`restaurant_category_id`	BIGINT	NOT NULL,
	`restaurant_business_number`	VARCHAR(50)	NOT NULL	COMMENT 'UNIQUE',
	`restaurant_owner_name`	VARCHAR(20)	NOT NULL,
	`restaurant_name`	VARCHAR(30)	NOT NULL,
	`restaurant_address`	VARCHAR(100)	NOT NULL,
	`restaurant_phone`	VARCHAR(11)	NOT NULL,
	`restaurant_start_time`	TIME	NULL,
	`restaurant_end_time`	TIME	NULL,
	`break_start_time`	TIME	NULL,
	`break_end_time`	TIME	NULL,
	`max_reservation_time`	BIGINT	NULL,
	`min_member_cnt`	BIGINT	NULL,
	`max_member_cnt`	BIGINT	NULL,
	`deposit_per_member`	BIGINT	NULL,
	`restaurant_description`	VARCHAR(500)	NULL,
	`latitude`	DOUBLE	NULL,
	`longitude`	DOUBLE	NULL
);

CREATE TABLE `restaurant_categories` (
	`restaurant_category_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`restaurant_category_name`	VARCHAR(20)	NOT NULL
);

CREATE TABLE `restaurant_images` (
	`restaurant_image_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`restaurant_id`	BIGINT	NOT NULL,
	`restaurant_image_url`	VARCHAR(255)	NOT NULL
);

CREATE TABLE `menus` (
	`menu_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`restaurant_id`	BIGINT	NOT NULL,
	`menu_cagtegory_id`	BIGINT	NOT NULL,
	`menu_name`	VARCHAR(30)	NOT NULL,
	`menu_price`	INT	NOT NULL,
	`menu_image`	VARCHAR(255)	NULL,
	`menu_description`	VARCHAR(500)	NULL,
	`deleted`	TINYINT(1)	NOT NULL	DEFAULT false
);

CREATE TABLE `menu_categories` (
	`menu_cagtegory_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`restaurant_category_id`	BIGINT	NOT NULL,
	`menu_category_name`	VARCHAR(20)	NOT NULL
);

CREATE TABLE `reservations` (
	`reservation_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`restaurant_id`	BIGINT	NOT NULL,
	`user_id`	BIGINT	NULL,
	`reservation_date`	DATE	NOT NULL,
	`reservation_start_time`	TIME	NOT NULL,
	`reservation_end_time`	TIME	NOT NULL,
	`member_cnt`	INT	NOT NULL,
	`reservation_url`	VARCHAR(255)	NOT NULL	COMMENT '퇴실시 NULL로 변경',
	`regist_time`	DATETIME	NOT NULL	DEFAULT now(),
	`cancelled`	TINYINT(1)	NOT NULL	DEFAULT false
);

CREATE TABLE `reservation_tables` (
	`reservation_table_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`reservation_id`	BIGINT	NOT NULL,
	`table_id`	BIGINT	NOT NULL
);

CREATE TABLE `orders` (
	`order_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`reservation_id`	BIGINT	NOT NULL,
	`menu_id`	BIGINT	NOT NULL,
	`Key`	reservation_enter_id	NOT NULL,
	`prepare_request`	TINYINT(1)	NOT NULL	COMMENT '0: 준비x, 1: 준비요청',
	`paid`	TINYINT(1)	NOT NULL	DEFAULT false	COMMENT '0: 미결제, 1: 결제완료',
	`served`	TINYINT(1)	NOT NULL	DEFAULT false	COMMENT '0: 서빙전, 1: 서빙완료'
);

CREATE TABLE `notifications` (
	`notification_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`user_id`	BIGINT	NOT NULL,
	`notification_category_id`	BIGINT	NOT NULL,
	`notification_message`	VARCHAR(100)	NOT NULL,
	`move_category_name`	VARCHAR(20)	NOT NULL	COMMENT '"RESERVATION"',
	`move_category_id`	BIGINT	NOT NULL
);

CREATE TABLE `notification_categories` (
	`notification_category_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`notification_category_name`	VARCHAR(20)	NOT NULL
);

CREATE TABLE `restaurant_likes` (
	`restaurant_like_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`user_id`	BIGINT	NOT NULL,
	`restaurant_id`	BIGINT	NOT NULL
);

CREATE TABLE `reservation_enter` (
	`reservation_enter_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT',
	`reservation_id`	BIGINT	NOT NULL	COMMENT 'AUTO_INCREMENT'
);

ALTER TABLE `users` ADD CONSTRAINT `PK_USERS` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `user_tokens` ADD CONSTRAINT `PK_USER_TOKENS` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `restaurants` ADD CONSTRAINT `PK_RESTAURANTS` PRIMARY KEY (
	`restaurant_id`,
	`user_id`
);

ALTER TABLE `restaurant_categories` ADD CONSTRAINT `PK_RESTAURANT_CATEGORIES` PRIMARY KEY (
	`restaurant_category_id`
);

ALTER TABLE `restaurant_images` ADD CONSTRAINT `PK_RESTAURANT_IMAGES` PRIMARY KEY (
	`restaurant_image_id`
);

ALTER TABLE `menus` ADD CONSTRAINT `PK_MENUS` PRIMARY KEY (
	`menu_id`,
	`restaurant_id`
);

ALTER TABLE `menu_categories` ADD CONSTRAINT `PK_MENU_CATEGORIES` PRIMARY KEY (
	`menu_cagtegory_id`
);

ALTER TABLE `reservations` ADD CONSTRAINT `PK_RESERVATIONS` PRIMARY KEY (
	`reservation_id`,
	`restaurant_id`
);

ALTER TABLE `reservation_tables` ADD CONSTRAINT `PK_RESERVATION_TABLES` PRIMARY KEY (
	`reservation_table_id`,
	`reservation_id`
);

ALTER TABLE `orders` ADD CONSTRAINT `PK_ORDERS` PRIMARY KEY (
	`order_id`,
	`reservation_id`,
	`menu_id`,
	`Key`
);

ALTER TABLE `notifications` ADD CONSTRAINT `PK_NOTIFICATIONS` PRIMARY KEY (
	`notification_id`,
	`user_id`
);

ALTER TABLE `notification_categories` ADD CONSTRAINT `PK_NOTIFICATION_CATEGORIES` PRIMARY KEY (
	`notification_category_id`
);

ALTER TABLE `restaurant_likes` ADD CONSTRAINT `PK_RESTAURANT_LIKES` PRIMARY KEY (
	`restaurant_like_id`,
	`user_id`,
	`restaurant_id`
);

ALTER TABLE `reservation_enter` ADD CONSTRAINT `PK_RESERVATION_ENTER` PRIMARY KEY (
	`reservation_enter_id`,
	`reservation_id`
);

ALTER TABLE `user_tokens` ADD CONSTRAINT `FK_users_TO_user_tokens_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`user_id`
);

ALTER TABLE `restaurants` ADD CONSTRAINT `FK_users_TO_restaurants_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`user_id`
);

ALTER TABLE `restaurants` ADD CONSTRAINT `FK_restaurant_categories_TO_restaurants_1` FOREIGN KEY (
	`restaurant_category_id`
)
REFERENCES `restaurant_categories` (
	`restaurant_category_id`
);

ALTER TABLE `restaurant_images` ADD CONSTRAINT `FK_restaurants_TO_restaurant_images_1` FOREIGN KEY (
	`restaurant_id`
)
REFERENCES `restaurants` (
	`restaurant_id`
);

ALTER TABLE `menus` ADD CONSTRAINT `FK_restaurants_TO_menus_1` FOREIGN KEY (
	`restaurant_id`
)
REFERENCES `restaurants` (
	`restaurant_id`
);

ALTER TABLE `menus` ADD CONSTRAINT `FK_menu_categories_TO_menus_1` FOREIGN KEY (
	`menu_cagtegory_id`
)
REFERENCES `menu_categories` (
	`menu_cagtegory_id`
);

ALTER TABLE `menu_categories` ADD CONSTRAINT `FK_restaurant_categories_TO_menu_categories_1` FOREIGN KEY (
	`restaurant_category_id`
)
REFERENCES `restaurant_categories` (
	`restaurant_category_id`
);

ALTER TABLE `reservations` ADD CONSTRAINT `FK_restaurants_TO_reservations_1` FOREIGN KEY (
	`restaurant_id`
)
REFERENCES `restaurants` (
	`restaurant_id`
);

ALTER TABLE `reservations` ADD CONSTRAINT `FK_users_TO_reservations_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`user_id`
);

ALTER TABLE `reservation_tables` ADD CONSTRAINT `FK_reservations_TO_reservation_tables_1` FOREIGN KEY (
	`reservation_id`
)
REFERENCES `reservations` (
	`reservation_id`
);

ALTER TABLE `orders` ADD CONSTRAINT `FK_reservations_TO_orders_1` FOREIGN KEY (
	`reservation_id`
)
REFERENCES `reservations` (
	`reservation_id`
);

ALTER TABLE `orders` ADD CONSTRAINT `FK_menus_TO_orders_1` FOREIGN KEY (
	`menu_id`
)
REFERENCES `menus` (
	`menu_id`
);

ALTER TABLE `orders` ADD CONSTRAINT `FK_reservation_enter_TO_orders_1` FOREIGN KEY (
	`Key`
)
REFERENCES `reservation_enter` (
	`reservation_enter_id`
);

ALTER TABLE `notifications` ADD CONSTRAINT `FK_users_TO_notifications_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`user_id`
);

ALTER TABLE `notifications` ADD CONSTRAINT `FK_notification_categories_TO_notifications_1` FOREIGN KEY (
	`notification_category_id`
)
REFERENCES `notification_categories` (
	`notification_category_id`
);

ALTER TABLE `restaurant_likes` ADD CONSTRAINT `FK_users_TO_restaurant_likes_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `users` (
	`user_id`
);

ALTER TABLE `restaurant_likes` ADD CONSTRAINT `FK_restaurants_TO_restaurant_likes_1` FOREIGN KEY (
	`restaurant_id`
)
REFERENCES `restaurants` (
	`restaurant_id`
);

ALTER TABLE `reservation_enter` ADD CONSTRAINT `FK_reservations_TO_reservation_enter_1` FOREIGN KEY (
	`reservation_id`
)
REFERENCES `reservations` (
	`reservation_id`
);

