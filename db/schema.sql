USE q2vthzrii2colmkc;

DROP TABLE IF EXISTS Cats;
CREATE TABLE Cats (
	  id INT NOT NULL IDENTITY(1, 1),
    cat_name VARCHAR(64) NOT NULL,
    hp INT(4) NOT NULL,
    atk INT(4) NOT NULL,
    def INT(4) NOT NULL,
		model VARCHAR(255) NOT NULL,
    primary key(id)
);

DROP TABLE IF EXISTS Moves;
CREATE TABLE Moves (
	  id INT NOT NULL IDENTITY(1, 1),
    move_name VARCHAR(64) NOT NULL,
    atk INT(4) NOT NULL,
    def INT(4) NOT NULL,
    primary key(id)
);