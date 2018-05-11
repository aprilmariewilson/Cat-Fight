USE q2vthzrii2colmkc;

DROP TABLE IF EXISTS Cats;
CREATE TABLE IF NOT EXISTS Cats (
	id int(32) AUTO_INCREMENT NOT NULL,
    cat_name varchar(64) NOT NULL,
    hp int(4) NOT NULL,
    atk int(4) NOT NULL,
    def int(4) NOT NULL,
		model varchar(255) NOT NULL,
    primary key(id)
);