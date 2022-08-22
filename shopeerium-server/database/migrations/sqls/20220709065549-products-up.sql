CREATE TABLE `products` (
    `productId` INT(8) NOT NULL,
    `sellerUsername` VARCHAR(16) NOT NULL,
    `title` VARCHAR(32) NOT NULL,
    `imgUrl` VARCHAR(64) NOT NULL ,
    `price` DECIMAL(16,2) NOT NULL,
    `stock` INTEGER(16) NOT NULL,
    `amountSold` INTEGER(16) NOT NULL,
    `categories` JSON NOT NULL,
    `description` VARCHAR(65000) NOT NULL,
    CONSTRAINT products_productId_pk PRIMARY KEY(productId)
);

CREATE INDEX idx_products_sellerUsename ON products(sellerUsername,price);   -- Used for displaying products on sellers page, initial price filter on product listing


INSERT INTO products 
VALUES(1,"alingPuring","1 Pc. Piattos Chip","1.jpg",60.00,23,27, '["Food", "Pets", "Art"]',"Yes, its just 1 Chip for 60 pesos, what a steal right?");
INSERT INTO products 
VALUES(2,"alingPuring","Marshmellow","2.jpg",3.00,500,234,'["Food", "Pets"]',"Chrisopher Comstock made this");
INSERT INTO products 
VALUES(3,"alingPuring","Edible Crayons","3.jpg",120.00,7,346,'["Health", "Food", "Art"]',"Sakto pang kulay ng Gaming Build mo");
INSERT INTO products 
VALUES(4,"alingPuring","Ice Cube","4.jpg",5.00,0,1000,'["Toys", "Food", "Health"]',"Melts right before you get it");
INSERT INTO products 
VALUES(5,"alingPuring","Pancit Canton","5.jpg",15.00,1000,420,'["Home", "Food", "Health"]',"Unang Kagat Iskolar Agad");

INSERT INTO products 
VALUES(6,"aszeneca","Red Screw Driver","6.jpg",300.00,3,345,'["Home", "Toys", "Tools"]',"Counterclockwise to tighten");
INSERT INTO products 
VALUES(7,"aszeneca","2D Printed Hammer","7.jpg",900.00,3,34,'["Home", "Tools", "Art"]',"1 Dimension less than a 3D Printed One");
INSERT INTO products 
VALUES(8,"aszeneca","Babyproof Nails","8.jpg",7.50,50,456,'["Tools", "Pets", "Furnitures"]',"Make it safe for your babies");
INSERT INTO products
VALUES(9,"aszeneca","Alien Wrench","9.jpg",230.00,6,3030,'["Tools", "Technology", "Accessories"]',"Allen wrenches can't fix my bike");
INSERT INTO products
VALUES(10,"aszeneca","Zip Tie Legit 100%","10.jpg",3.00,500,128,'["Tools", "Clothings", "Health"]',"Legit legit no Issue, PM for orders"); 

INSERT INTO products 
VALUES(11,"segFault","CDRK GTX 3060","11.jpg",59000.00,5,1,'["Toys", "Technology", "Appliances"]',"Take on the latest games using the power of Ampere");
INSERT INTO products 
VALUES(12,"segFault","AMD Ryzen 4900H","12.jpg",24500.00,3,456,'["Technology", "Health", "Furnitures"]',"But can it run Crysis?");
INSERT INTO products 
VALUES(13,"segFault","Samsung 970 Evo Plus","13.jpg",970.00,970,54,'["Technology", "Mobile", "Clothings"]',"Restart your machine 5 times while your friend is still booting up");
INSERT INTO products
VALUES(14,"segFault","Kingston 2666 Mhz DDR4","14.jpg",2600.00,40,23,'["Technology", "Food"]',"Yes, Its gonna help you run Crysis");
INSERT INTO products
VALUES(15,"segFault","Keychron RGB K8","15.jpg",5600.00,8,45,'["Technology", "Mobile", "Art"]',"Keychron RGB K8 Wireless Mechanical Keyboard");

INSERT INTO products 
VALUES(16,"toysRMe","Bakugan Batang Brawlers","16.jpg",71.00,5,70,'["Toys", "Furnitures", "Accessories"]',"For throwing, not for eating");
INSERT INTO products 
VALUES(17,"toysRMe","Zoids Burning Liger","17.jpg",68.00,5,71,'["Toys", "Clothings", "Art"]',"No it doesn't get a Season 2");
INSERT INTO products 
VALUES(18,"toysRMe","Bebeless Beyblade","18.jpg",27.00,5,72,'["Toys"]',"Beyblade para sa walang bebe :( ");
INSERT INTO products
VALUES(19,"toysRMe","Sea Monkeh","19.jpg",420.00,5,73,'["Toys"]',"I still dont get how these things live");
INSERT INTO products
VALUES(20,"toysRMe","Nerf Nerf Nerf","20.jpg",300.00,5,74,'["Toys"]',"Nerf your champ, nerf your buiid");


-- Stored Procedures for Products

CREATE PROCEDURE searchProducts(
    IN p_pattern VARCHAR(32)
)
BEGIN 
    SELECT * FROM products where title like p_pattern;
END;

CREATE PROCEDURE selectProducts()
BEGIN
    SELECT * FROM products;
END;

CREATE PROCEDURE selectProduct(
    IN p_productId INT(8)
)
BEGIN
    SELECT * FROM products where productId = p_productId;
END;

CREATE PROCEDURE selectProductbySeller(
    IN p_username VARCHAR(16)
)
BEGIN
    SELECT * FROM products where sellerUsername = p_username;
END;

CREATE PROCEDURE selectProductbyCategory(
    IN p_category VARCHAR(16)
)
BEGIN
    SELECT * from products where productId in (SELECT productId from categories where category=p_category) order by productId;
END;


CREATE PROCEDURE insertProduct(
    IN p_productId INT(8),
    IN p_sellerUsername VARCHAR(16),
    IN p_title VARCHAR(32),
    IN p_imgUrl VARCHAR(64),
    IN p_price DECIMAL(16,2),
    IN p_stock INTEGER(16),
    IN p_amountSold INTEGER(16),
    IN p_categories JSON,
    IN p_description VARCHAR(65000)
)
BEGIN
    INSERT INTO products 
    SET
        productId = p_productId,
        sellerUsername = p_sellerUsername,
        title = p_title,
        imgUrl = p_imgUrl,
        price = p_price,
        stock = p_stock,
        amountSold = p_amountSold,
        categories = p_categories,
        description = p_description;

END;

CREATE PROCEDURE deleteProduct(             -- Delete a Product and all carts which has that Product
    IN p_productId VARCHAR(16)
)
BEGIN
    DELETE FROM products WHERE productId = p_productId;
    DELETE FROM carts WHERE productId = p_productId;
END;

CREATE PROCEDURE updateProduct(
    IN p_productId  INT(8),
    IN p_title VARCHAR(32),
    IN p_imgUrl VARCHAR(64),
    IN p_price DECIMAL(16,2),
    IN p_stock INTEGER(16),
    IN p_amountSold INTEGER(16),
    IN p_categories JSON,
    IN p_description VARCHAR(65000)

)
BEGIN
    UPDATE products
    SET
        title = p_title,
        imgUrl = p_imgUrl,
        price = p_price,
        stock = p_stock,
        amountSold = p_amountSold,
        categories = p_categories, 
        description = p_description

    WHERE productId = p_productId;
END;
