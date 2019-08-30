Create Table
```SQL
CREATE TABLE XXX(
    id int NOT NULL,
    Name VARCHAR(255) NOT NULL
);
```
Create primary key & Foreign key
```SQL

```
Delete all values in tables
```SQL
DELETE FROM XXX; #XXX is table
```

INSERT values in TABLE
```SQL
INSERT INTO XXX VALUES(); #XXX IS TABLE
INSERT INTO XXX VALUES(), (), (); #XXX IS TABLE insert multiple rows
```

Remane columns in MYSQL & SQL:
```SQL
ALTER TABLE FLOWER_COLOR
CHANGE description color_description VARCHAR(255); --- don't need ""

ALTER TABLE FLOWER_COLOR
RENAME COLUMN description TO color_description; ---SQL commond
```