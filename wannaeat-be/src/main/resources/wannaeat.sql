CREATE DATABASE `wannaeat`;
use `wannaeat`;

CREATE TABLE `users`
(
    `user_id`     BIGINT       NOT NULL AUTO_INCREMENT,
    `email`       VARCHAR(100) NOT NULL,
    `nickname`    VARCHAR(20)  NOT NULL,
    `phone`       VARCHAR(255) NOT NULL COMMENT '양방향 암호화 기법 적용',
    `role`        VARCHAR(20)  NOT NULL COMMENT '"MANAGER", "CUSTOMER"',
    `social_type` VARCHAR(20)  NOT NULL COMMENT '"KAKAO", "GOOGLE"',
    `deleted`     TINYINT(1)   NOT NULL DEFAULT false,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `user_tokens`
(
    `user_id`       BIGINT       NOT NULL,
    `refresh_token` VARCHAR(255) NULL,
    `fcm_token`     VARCHAR(255) NULL,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `restaurants`
(
    `restaurant_id`              BIGINT       NOT NULL AUTO_INCREMENT,
    `user_id`                    BIGINT       NOT NULL,
    `restaurant_category_id`     BIGINT       NOT NULL,
    `restaurant_business_number` VARCHAR(50)  NOT NULL,
    `restaurant_owner_name`      VARCHAR(20)  NOT NULL,
    `restaurant_name`            VARCHAR(30)  NOT NULL,
    `restaurant_address`         VARCHAR(100) NOT NULL,
    `restaurant_phone`           VARCHAR(11)  NOT NULL,
    `restaurant_open_time`       TIME         NULL,
    `restaurant_close_time`      TIME         NULL,
    `break_start_time`           TIME         NULL,
    `break_end_time`             TIME         NULL,
    `max_reservation_time`       BIGINT       NULL,
    `min_member_cnt`             BIGINT       NULL,
    `max_member_cnt`             BIGINT       NULL,
    `deposit_per_member`         BIGINT       NULL,
    `restaurant_description`     VARCHAR(500) NULL,
    `latitude`                   DOUBLE       NULL,
    `longitude`                  DOUBLE       NULL,
    PRIMARY KEY (`restaurant_id`)
);

CREATE TABLE `restaurant_categories`
(
    `restaurant_category_id`   BIGINT      NOT NULL AUTO_INCREMENT,
    `restaurant_category_name` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`restaurant_category_id`)
);

CREATE TABLE `restaurant_images`
(
    `restaurant_image_id`  BIGINT       NOT NULL AUTO_INCREMENT,
    `restaurant_id`        BIGINT       NOT NULL,
    `restaurant_image_url` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`restaurant_image_id`)
);

CREATE TABLE `menus`
(
    `menu_id`           BIGINT       NOT NULL AUTO_INCREMENT,
    `restaurant_id`     BIGINT       NOT NULL,
    `menu_cagtegory_id` BIGINT       NOT NULL,
    `menu_name`         VARCHAR(30)  NOT NULL,
    `menu_price`        INT          NOT NULL,
    `menu_image`        VARCHAR(255) NULL,
    `menu_description`  VARCHAR(500) NULL,
    `deleted`           TINYINT(1)   NOT NULL DEFAULT false,
    PRIMARY KEY (`menu_id`)
);

CREATE TABLE `menu_categories`
(
    `menu_cagtegory_id`      BIGINT      NOT NULL AUTO_INCREMENT,
    `restaurant_category_id` BIGINT      NOT NULL,
    `menu_category_name`     VARCHAR(20) NOT NULL,
    PRIMARY KEY (`menu_cagtegory_id`)
);

CREATE TABLE `reservations`
(
    `reservation_id`         BIGINT       NOT NULL AUTO_INCREMENT,
    `user_id`                BIGINT       NULL,
    `restaurant_id`          BIGINT       NOT NULL,
    `reservation_date`       DATE         NOT NULL,
    `reservation_start_time` TIME         NOT NULL,
    `reservation_end_time`   TIME         NOT NULL,
    `member_cnt`             INT          NOT NULL,
    `reservation_url`        VARCHAR(255) NULL,
    `regist_time`            DATETIME     NOT NULL DEFAULT now(),
    `cancelled`              TINYINT(1)   NOT NULL DEFAULT false,
    PRIMARY KEY (`reservation_id`)
);

CREATE TABLE `reservation_tables`
(
    `reservation_table_id` BIGINT NOT NULL AUTO_INCREMENT,
    `reservation_id`       BIGINT NOT NULL,
    `table_id`             BIGINT NOT NULL,
    PRIMARY KEY (`reservation_table_id`)
);

CREATE TABLE `orders`
(
    `order_id`                   BIGINT     NOT NULL AUTO_INCREMENT,
    `reservation_id`             BIGINT     NOT NULL,
    `menu_id`                    BIGINT     NOT NULL,
    `reservation_participant_id` BIGINT     NOT NULL,
    `prepare_request`            TINYINT(1) NOT NULL DEFAULT false,
    `served`                     TINYINT(1) NOT NULL DEFAULT false,
    `total_cnt`                  INT        NOT NULL,
    `paid_cnt`                   INT        NOT NULL,
    PRIMARY KEY (`order_id`)
);

CREATE TABLE `notifications`
(
    `notification_id`          BIGINT       NOT NULL AUTO_INCREMENT,
    `user_id`                  BIGINT       NOT NULL,
    `notification_category_id` BIGINT       NOT NULL,
    `notification_message`     VARCHAR(100) NOT NULL,
    `move_category`            VARCHAR(20)  NOT NULL COMMENT '"RESERVATION"',
    `move_category_id`         BIGINT       NOT NULL,
    PRIMARY KEY (`notification_id`)
);

CREATE TABLE `notification_categories`
(
    `notification_category_id`   BIGINT      NOT NULL AUTO_INCREMENT,
    `notification_category_name` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`notification_category_id`)
);

CREATE TABLE `reservation_participants`
(
    `reservation_participant_id` BIGINT NOT NULL AUTO_INCREMENT,
    `reservation_id`             BIGINT NOT NULL,
    PRIMARY KEY (`reservation_participant_id`)
);

CREATE TABLE `restaurant_likes`
(
    `restaurant_like_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id`            BIGINT NOT NULL,
    `restaurant_id`      BIGINT NOT NULL,
    PRIMARY KEY (`restaurant_like_id`)
);

CREATE TABLE `alarms`
(
    `alarm_id`         BIGINT       NOT NULL  AUTO_INCREMENT PRIMARY KEY,
    `user_id`          BIGINT       NOT NULL,
    `reservation_id`   BIGINT       NOT NULL,
    `menu_id`          BIGINT       NULL COMMENT 'AUTO_INCREMENT',
    `alarm_type`       VARCHAR(50)  NOT NULL COMMENT '"RESERVATION_CONFIRMED"',
    `regist_time`      DATETIME     NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`menu_id`) REFERENCES `menus` (`menu_id`) ON DELETE SET NULL ON UPDATE CASCADE
);


ALTER TABLE `user_tokens`
    ADD CONSTRAINT `FK_users_TO_user_tokens_1` FOREIGN KEY (
                                                            `user_id`
        )
        REFERENCES `users` (
                            `user_id`
            );

ALTER TABLE `restaurants`
    ADD CONSTRAINT `FK_users_TO_restaurants_1` FOREIGN KEY (
                                                            `user_id`
        )
        REFERENCES `users` (
                            `user_id`
            );

ALTER TABLE `restaurants`
    ADD CONSTRAINT `FK_restaurant_categories_TO_restaurants_1` FOREIGN KEY (
                                                                            `restaurant_category_id`
        )
        REFERENCES `restaurant_categories` (
                                            `restaurant_category_id`
            );

ALTER TABLE `restaurant_images`
    ADD CONSTRAINT `FK_restaurants_TO_restaurant_images_1` FOREIGN KEY (
                                                                        `restaurant_id`
        )
        REFERENCES `restaurants` (
                                  `restaurant_id`
            );

ALTER TABLE `menus`
    ADD CONSTRAINT `FK_restaurants_TO_menus_1` FOREIGN KEY (
                                                            `restaurant_id`
        )
        REFERENCES `restaurants` (
                                  `restaurant_id`
            );

ALTER TABLE `menus`
    ADD CONSTRAINT `FK_menu_categories_TO_menus_1` FOREIGN KEY (
                                                                `menu_cagtegory_id`
        )
        REFERENCES `menu_categories` (
                                      `menu_cagtegory_id`
            );

ALTER TABLE `menu_categories`
    ADD CONSTRAINT `FK_restaurant_categories_TO_menu_categories_1` FOREIGN KEY (
                                                                                `restaurant_category_id`
        )
        REFERENCES `restaurant_categories` (
                                            `restaurant_category_id`
            );

ALTER TABLE `reservations`
    ADD CONSTRAINT `FK_users_TO_reservations_1` FOREIGN KEY (
                                                             `user_id`
        )
        REFERENCES `users` (
                            `user_id`
            );

ALTER TABLE `reservations`
    ADD CONSTRAINT `FK_restaurants_TO_reservations_1` FOREIGN KEY (
                                                                   `restaurant_id`
        )
        REFERENCES `restaurants` (
                                  `restaurant_id`
            );

ALTER TABLE `reservation_tables`
    ADD CONSTRAINT `FK_reservations_TO_reservation_tables_1` FOREIGN KEY (
                                                                          `reservation_id`
        )
        REFERENCES `reservations` (
                                   `reservation_id`
            );

ALTER TABLE `orders`
    ADD CONSTRAINT `FK_reservations_TO_orders_1` FOREIGN KEY (
                                                              `reservation_id`
        )
        REFERENCES `reservations` (
                                   `reservation_id`
            );

ALTER TABLE `orders`
    ADD CONSTRAINT `FK_menus_TO_orders_1` FOREIGN KEY (
                                                       `menu_id`
        )
        REFERENCES `menus` (
                            `menu_id`
            );

ALTER TABLE `orders`
    ADD CONSTRAINT `FK_reservation_participants_TO_orders_1` FOREIGN KEY (
                                                                          `reservation_participant_id`
        )
        REFERENCES `reservation_participants` (
                                               `reservation_participant_id`
            );

ALTER TABLE `reservation_participants`
    ADD CONSTRAINT `FK_reservations_TO_reservation_participants_1` FOREIGN KEY (
                                                                                `reservation_id`
        )
        REFERENCES `reservations` (
                                   `reservation_id`
            );

ALTER TABLE `restaurant_likes`
    ADD CONSTRAINT `FK_users_TO_restaurant_likes_1` FOREIGN KEY (
                                                                 `user_id`
        )
        REFERENCES `users` (
                            `user_id`
            );

ALTER TABLE `restaurant_likes`
    ADD CONSTRAINT `FK_restaurants_TO_restaurant_likes_1` FOREIGN KEY (
                                                                       `restaurant_id`
        )
        REFERENCES `restaurants` (
                                  `restaurant_id`
            );

