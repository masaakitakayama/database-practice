-- MySQL dump 10.13  Distrib 9.5.0, for Win64 (x86_64)
--
-- Host: localhost    Database: my_practice
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_name` varchar(255) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'スクショ','image01.png','2026-01-03 09:11:31'),(2,'スクショ','sql_projectphoto1.jpg.png','2026-01-03 09:14:52');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `age` int DEFAULT NULL,
  `joined_date` date DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `primary_skill` varchar(100) DEFAULT NULL,
  `user_name_kana` varchar(100) DEFAULT NULL,
  `user_name_ruby` varchar(100) DEFAULT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'佐藤 健二','sato.k@example.jp','2026-01-04 06:29:04',28,'2022-04-07','営業部','PM','Figma','さとう けんじ','サトウ ケンジ',NULL),(2,'鈴木 一郎','suzuki@example.com','2026-01-10 06:40:42',33,'2023-12-17','デザイン部','人事','Python','すずき いちろう','スズキ イチロウ',NULL),(3,'鈴木 一郎','suzuki.i@example.com','2026-01-04 06:29:04',24,'2023-01-08','営業部','PM','Figma','すずき いちろう','スズキ イチロウ',NULL),(4,'高橋 美咲','takahashi.m@example.net','2026-01-04 06:29:04',44,'2023-03-20','営業部','デザイナー','Go','たかはし みさき','タカハシ ミサキ',NULL),(5,'田中 結衣','tanaka.y@example.org','2026-01-04 06:29:04',46,'2022-01-09','営業部','PM','Go','たなか ゆい','タナカ ユイ',NULL),(6,'渡辺 翔太','watanabe.s@example.jp','2026-01-04 06:29:04',35,'2020-06-21','デザイン部','エンジニア','React','わたなべ しょうた','ワタナベ ショウタ',NULL),(7,'伊藤 杏奈','ito.a@example.com','2026-01-04 06:29:04',23,'2021-04-16','デザイン部','エンジニア','Python','いとう あんな','イトウ アンナ',NULL),(8,'山本 裕太','yamamoto.y@example.net','2026-01-04 06:29:04',34,'2020-01-12','営業部','エンジニア','AWS','やまもと ゆうた','ヤマモト ユウタ',NULL),(9,'中村 蓮','nakamura.r@example.org','2026-01-04 06:29:04',39,'2021-04-15','開発部','人事','Python','なかむら れん','ナカムラ レン',NULL),(10,'小林 莉子','kobayashi.r@example.jp','2026-01-04 06:29:04',34,'2021-05-06','営業部','デザイナー','React','こばやし りこ','コバヤシ リコ',NULL),(11,'加藤 陽介','kato.y@example.com','2026-01-04 06:29:04',37,'2022-11-13','開発部','デザイナー','React','かとう ようすけ','カトウ ヨウスケ',NULL),(12,'吉田 葵','yoshida.a@example.net','2026-01-04 06:29:04',20,'2020-04-23','デザイン部','デザイナー','Python','よしだ あおい','ヨシダ アオイ',NULL),(13,'山田 太郎','yamada.t@example.org','2026-01-04 06:29:04',59,'2022-12-11','営業部','エンジニア','React','やまだ たろう','ヤマダ タロウ',NULL),(14,'佐々木 翼','sasaki.t@example.jp','2026-01-04 06:29:04',44,'2023-10-18','開発部','デザイナー','Go','ささき つばさ','ササキ ツバサ',NULL),(15,'山口 真央','yamaguchi.m@example.com','2026-01-04 06:29:04',26,'2020-02-24','開発部','PM','Python','やまぐち まお','ヤマグチ マオ',NULL),(16,'松本 潤','matsumoto.j@example.net','2026-01-04 06:29:04',23,'2024-05-06','営業部','デザイナー','Go','まつもと じゅん','マツモト ジュン',NULL),(17,'井上 健太','inoue.k@example.org','2026-01-04 06:29:04',22,'2021-04-21','営業部','エンジニア','Go','いのうえ けんた','イノウエ ケンタ',NULL),(18,'木村 拓也','kimura.t@example.jp','2026-01-04 06:29:04',22,'2023-06-20','デザイン部','人事','AWS','きむら たくや','キムラ タクヤ',NULL),(19,'林 瑠奈','hayashi.l@example.com','2026-01-04 06:29:04',27,'2023-06-10','営業部','デザイナー','Python','はやし るな','ハヤシ ルナ',NULL),(20,'斎藤 匠','saito.t@example.net','2026-01-04 06:29:04',51,'2021-10-18','開発部','デザイナー','AWS','さいとう たくみ','サイトウ タクミ',NULL),(21,'清水 翔','shimizu.s@example.org','2026-01-04 06:29:04',29,'2023-09-01','営業部','PM','Figma','しみず しょう','シミズ ショウ',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-11 20:47:11
