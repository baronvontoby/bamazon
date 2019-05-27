DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO INCREMENT,
    product_name VARCHAR (255),
    department_name VARCHAR (255),
    price DECIMAL (10,2),
    stock_quantity INT (10),
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Fertilizer', 'Garden', 10.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Shovel', 'Garden', 25.50, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Rake', 'Garden', 20.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Soil 5lb', 'Garden', 9.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Hose', 'Garden', 35.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('TV', 'Entertainment', 599.00, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('PS4', 'Entertainment', 399.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Nintendo Switch', 'Entertainment', 399.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Weber Grill', 'Outdoors', 699.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Diapers 40 Pack', 'Baby', 39.00, 200);