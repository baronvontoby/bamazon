USE bamazon_db;

CREATE TABLE managers (
    id NOT NULL AUTO_INCREMENT,
    user_name VARCHAR (255),
    user_password VARCHAR (255),
    PRIMARY KEY (id)
)