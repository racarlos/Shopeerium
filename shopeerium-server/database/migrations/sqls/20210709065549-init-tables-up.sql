CREATE TABLE `categories` (
    `productId`  INT(8) NOT NULL,
    `category` VARCHAR(16) NOT NULL
);

CREATE INDEX idx_categories_category ON categories(category);   -- Used for search product by category

INSERT INTO categories VALUES (1,"Food");
INSERT INTO categories VALUES (2,"Food");
INSERT INTO categories VALUES (3,"Food");
INSERT INTO categories VALUES (4,"Food");
INSERT INTO categories VALUES (5,"Food");

INSERT INTO categories VALUES (6,"Tools");
INSERT INTO categories VALUES (7,"Tools");
INSERT INTO categories VALUES (8,"Tools");
INSERT INTO categories VALUES (9,"Tools");
INSERT INTO categories VALUES (10,"Tools");

INSERT INTO categories VALUES (11,"Technology");
INSERT INTO categories VALUES (12,"Technology");
INSERT INTO categories VALUES (13,"Technology");
INSERT INTO categories VALUES (14,"Technology");
INSERT INTO categories VALUES (15,"Technology");

INSERT INTO categories VALUES (16,"Toys");
INSERT INTO categories VALUES (17,"Toys");
INSERT INTO categories VALUES (18,"Toys");
INSERT INTO categories VALUES (19,"Toys");
INSERT INTO categories VALUES (20,"Toys");

INSERT INTO categories VALUES (1,"Art");                -- Additional Categories 
INSERT INTO categories VALUES (1,"Pets");
INSERT INTO categories VALUES (2,"Pets");
INSERT INTO categories VALUES (3,"Art");
INSERT INTO categories VALUES (3,"Health");
INSERT INTO categories VALUES (4,"Toys");
INSERT INTO categories VALUES (4,"Health");
INSERT INTO categories VALUES (5,"Home");

INSERT INTO categories VALUES (6,"Home");
INSERT INTO categories VALUES (6,"Toys");
INSERT INTO categories VALUES (7,"Art");
INSERT INTO categories VALUES (7,"Home");
INSERT INTO categories VALUES (8,"Furnitures");
INSERT INTO categories VALUES (8,"Pets");
INSERT INTO categories VALUES (9,"Technology");
INSERT INTO categories VALUES (9,"Accessories");
INSERT INTO categories VALUES (10,"Clothings");
INSERT INTO categories VALUES (10,"Accessories");
INSERT INTO categories VALUES (10,"Health");
  
INSERT INTO categories VALUES (11,"Toys");
INSERT INTO categories VALUES (11,"Appliances");
INSERT INTO categories VALUES (12,"Furnitures");
INSERT INTO categories VALUES (12,"Health");
INSERT INTO categories VALUES (13,"Mobile");
INSERT INTO categories VALUES (13,"Clothings");
INSERT INTO categories VALUES (14,"Food");
INSERT INTO categories VALUES (15,"Mobile");
INSERT INTO categories VALUES (15,"Art");

INSERT INTO categories VALUES (16,"Accessories");
INSERT INTO categories VALUES (16,"Furnitures");
INSERT INTO categories VALUES (17,"Clothings");
INSERT INTO categories VALUES (17,"Art");

-- Stored Procedures for Categories
CREATE PROCEDURE selectCategories()         -- Shows All Unique Categories
BEGIN
    SELECT DISTINCT category FROM categories ORDER BY category DESC; 
END; 

CREATE PROCEDURE selectProductCategory(   -- Used for checking if a product is associated to a category
    IN p_productId INT(8),
    IN p_category VARCHAR(16)
)
BEGIN
    SELECT * FROM categories where productId = p_productId AND category = p_category;
END; 


CREATE PROCEDURE selectProductCategories(   -- Show Categories which are associated to a particular proudct 
    IN p_productId INT(8)
)
BEGIN
    SELECT category FROM categories 
    where productId = p_productId
    ORDER BY category DESC; 
END; 

CREATE PROCEDURE insertProductCategory(
    IN p_productId INT(8),
    IN p_category VARCHAR(16)
)
BEGIN
    INSERT INTO categories SET productId = p_productId, category = p_category;
END; 

CREATE PROCEDURE deleteProductCategory(
    IN p_productId INT(8),
    IN p_category VARCHAR(16)
)
BEGIN
    DELETE FROM categories WHERE productId = p_productId AND category = p_category;
END; 
