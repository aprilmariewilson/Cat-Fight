USE q2vthzrii2colmkc;

DROP TABLE IF EXISTS cat_fighters;
CREATE TABLE IF NOT EXISTS cat_fighters (
	id int(32) AUTO_INCREMENT NOT NULL,
    name varchar(64) NOT NULL,
    hp int(4) NOT NULL,
    atk int(4) NOT NULL,
    def int(4) NOT NULL,
    primary key(id)
)