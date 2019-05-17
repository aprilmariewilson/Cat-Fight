USE q2vthzrii2colmkc;

INSERT INTO Cats (cat_name, hp, atk, def, model)
VALUES
	('Sprinkletons', 100, 20, 10, '/assets/spritesheets/cat-1.png'),
    ('Sylvester', 150, 20, 10, '/assets/spritesheets/cat-2.png'),
    ('Mr Bubbles', 88, 20, 10, '/assets/spritesheets/cat-3.png'),
    ('Antonio', 125, 20, 10, '/assets/spritesheets/cat-4.png'),
    ('Azure Cat', 101, 20, 10, '/assets/spritesheets/cat-0.png')

INSERT INTO Moves (move_name, atk, def)
VALUES
    ('kick', 30, 10),
    ('punch', 5, 1),
    ('powerShot', 17, 7),
    ('flyingKick', 15, 7),
    ('uppercut',10, 5),
    ('superUppercut',20, 8),
    ('combo', 7, 2),
    ('doubleKick', 12, 6),
    ('highKick', 15, 7),
    ('doubleAttack', 25, 9)