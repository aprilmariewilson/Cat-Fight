USE q2vthzrii2colmkc;

DROP TABLE IF EXISTS Cats;
CREATE TABLE Cats (
	  id INT NOT NULL IDENTITY(1, 1),
    cat_name VARCHAR(64) NOT NULL,
    hp int(4) NOT NULL,
    atk int(4) NOT NULL,
    def int(4) NOT NULL,
		model VARCHAR(255) NOT NULL,
    primary key(id)
);