CREATE TABLE `chat_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`visitorName` varchar(128) NOT NULL,
	`visitorEmail` varchar(320) NOT NULL,
	`message` text NOT NULL,
	`ipAddress` varchar(64) NOT NULL,
	`captchaVerified` int NOT NULL DEFAULT 0,
	`notified` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_views` (
	`id` int AUTO_INCREMENT NOT NULL,
	`path` varchar(512) NOT NULL,
	`ipHash` varchar(64) NOT NULL,
	`referrer` varchar(512),
	`userAgent` varchar(256),
	`country` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `page_views_id` PRIMARY KEY(`id`)
);
