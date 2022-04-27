-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: my_db_01
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ev_article_cate`
--

DROP TABLE IF EXISTS `ev_article_cate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_article_cate` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `alias` varchar(255) NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '数据是否被标记删除\n0 没有被删除\n1 被删除',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `id_UNIQUE` (`Id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `alias_UNIQUE` (`alias`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_article_cate`
--

LOCK TABLES `ev_article_cate` WRITE;
/*!40000 ALTER TABLE `ev_article_cate` DISABLE KEYS */;
INSERT INTO `ev_article_cate` VALUES (1,'科技','KeJi',0),(2,'历史','LiShi',0),(3,'数学','ShuXue',1),(4,'文化','WenHua',1),(6,'物理','WuLi',1);
/*!40000 ALTER TABLE `ev_article_cate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_articles`
--

DROP TABLE IF EXISTS `ev_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_articles` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `cover_img` varchar(255) NOT NULL,
  `pub_date` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `is_delete` tinyint(1) NOT NULL DEFAULT '0',
  `cate_id` int NOT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_articles`
--

LOCK TABLES `ev_articles` WRITE;
/*!40000 ALTER TABLE `ev_articles` DISABLE KEYS */;
INSERT INTO `ev_articles` VALUES (1,'趣味运动会','这是一段内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容','D:\\desktop\\learning\\Node.js\\day6\\code\\api_server\\router_handler\\cover_img','2022-04-26 14:59:50.440','已发布',0,1,21),(2,'趣味运动会','这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容这是一段内容','D:\\desktop\\learning\\Node.js\\day6\\code\\api_server\\router_handler\\cover_img','2022-04-26 15:00:37.788','已发布',1,1,21),(3,'春节招聘会','突如其来的疫情反弹，给我市2022届高校毕业生就业工作带来了巨大的挑战。','D:\\desktop\\learning\\Node.js\\day6\\code\\api_server\\router_handler\\cover_img','2022-04-27 19:51:01.635','已发布',0,3,21),(4,'秋节招聘会','这是一段内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容','D:\\desktop\\learning\\Node.js\\day6\\code\\api_server\\router_handler\\cover_img','2022-04-27 19:51:40.380','草稿',0,3,21),(5,'毕业典礼','这是一段内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容','D:\\desktop\\learning\\Node.js\\day6\\code\\api_server\\router_handler\\cover_img','2022-04-27 19:52:05.599','已发布',0,2,21);
/*!40000 ALTER TABLE `ev_articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ev_users`
--

DROP TABLE IF EXISTS `ev_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ev_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `user_pic` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ev_users`
--

LOCK TABLES `ev_users` WRITE;
/*!40000 ALTER TABLE `ev_users` DISABLE KEYS */;
INSERT INTO `ev_users` VALUES (7,'asdf','$2a$10$T4XuaXyBqQbj/DJgzGKGoOvYvxWmF3F4RQamHNAyWb0/cIe7HETyq',NULL,NULL,NULL),(18,'abcd','$2a$10$R.JsfP5Sv3tYYLPNcrcQ0uj4M3qm4kXpG2mldO4LY7C7RpxrU5gB6',NULL,NULL,NULL),(21,'admin123','$2a$10$PaDvZyqJuEdqSFT070VzzealnhnMr3Bx5W8KmY3ZCfaREHvfluA7q','苏酥','1234567890@qq.com','data:image/png;base64,VE9PTUFOWVNFQ1JFVFM='),(23,'admin12','$2a$10$VMZHMRMtkLmC5en6W9.MEeM9isbaz5Z9Z//BBhpvCIapjsbNYtGCW',NULL,NULL,NULL),(24,'admin11','$2a$10$PM4f7WsFo9oTP5Aqe/Mroe9qH.Ay9X.k90yc11xrvR57TeNzcrnnW',NULL,NULL,NULL);
/*!40000 ALTER TABLE `ev_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '这是用户信息的唯一标识\n',
  `username` varchar(45) NOT NULL COMMENT '用户的登录名\n',
  `password` varchar(45) NOT NULL COMMENT '用户的登录密码\n',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '用户的状态，是个布尔值\n0 表示用户状态正常\n1 表示用户被 禁用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'zs','123456',0),(2,'aaaa','0000',1),(3,'hhhh','654321',0),(5,'Spider-Man','pcc321',1),(12,'xtt','200411',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'my_db_01'
--

--
-- Dumping routines for database 'my_db_01'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-27 20:16:59
