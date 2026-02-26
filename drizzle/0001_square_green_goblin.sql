CREATE TABLE `inscricoes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`telefone` varchar(20) NOT NULL,
	`criadoEm` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `inscricoes_id` PRIMARY KEY(`id`),
	CONSTRAINT `inscricoes_email_unique` UNIQUE(`email`)
);
