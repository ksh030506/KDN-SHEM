
CREATE TABLE `ict`.`user` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(45) NULL,
  `passwd` VARCHAR(45) NULL,
  `house_id` VARCHAR(45) NULL,
  `goal` INT NULL,
  PRIMARY KEY (`idx`));


CREATE TABLE `ict`.`energy_hour` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `dt` DATETIME NULL,
  `house_id` VARCHAR(45) NULL,
  `energy_hour` FLOAT NULL,
  PRIMARY KEY (`idx`));

CREATE TABLE `ict`.`energy_day` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `house_id` VARCHAR(45) NULL,
  `energy_day` FLOAT NULL,
  PRIMARY KEY (`idx`));
