CREATE TABLE `carts` (
    `username`  VARCHAR(16) NOT NULL,
    `productId`  INTEGER(8) NOT NULL,
    `sellerUsername` VARCHAR(16) NOT NULL,
    `title` VARCHAR(32) NOT NULL,
    `imgUrl` VARCHAR(64) NOT NULL,
    `price` DECIMAL(16,2) NOT NULL,
    `stock` INTEGER(16) NOT NULL,
    `quantity` INTEGER(16) NOT NULL,
    CONSTRAINT cart_productId_username_pk PRIMARY KEY(username,productId)
);

INSERT INTO carts VALUES("racarlos",5,"alingPuring","Pancit Canton","5.jpg",15.00,1000,1000);
INSERT INTO carts VALUES("racarlos",7,"aszeneca","2D Printed Hammer","7.jpg",900.00,3,2);
INSERT INTO carts VALUES("racarlos",8,"aszeneca","Babyproof Nails","8.jpg",7.50,50,20);
INSERT INTO carts VALUES("racarlos",15,"segFault","Keychron RGB K8","15.jpg",5600.00,8,1);

INSERT INTO carts VALUES("yellowKid",1,"alingPuring","1 Pc. Piattos Chip","1.jpg",60.00,23,15);
INSERT INTO carts VALUES("yellowKid",11,"segFault","CDRK GTX 3060","11.jpg",59000.00,5,5);
INSERT INTO carts VALUES("yellowKid",18,"segFault","Bebeless Beyblade","18.jpg",27.00,5,3);

INSERT INTO carts VALUES("mrClean",2,"alingPuring","Marshmellow","2.jpg",3.00,500,70);
INSERT INTO carts VALUES("mrClean",10,"aszeneca","Zip Tie Legit 100%","10.jpg",3.00,500,50);
INSERT INTO carts VALUES("mrClean",14,"segFault","Kingston 2666 Mhz DDR4","14.jpg",2600.00,40,2);
INSERT INTO carts VALUES("mrClean",17,"toysRMe","Zoids Burning Liger","17.jpg",68.00,5,3);
INSERT INTO carts VALUES("mrClean",18,"toysRMe","Bebeless Beyblade","18.jpg",27.00,5,3);
INSERT INTO carts VALUES("mrClean",20,"toysRMe","Nerf Nerf Nerf","20.jpg",300.00,5,3);

INSERT INTO carts VALUES("theUniter",3,"alingPuring","Edible Crayons","3.jpg",120.00,7,6);
INSERT INTO carts VALUES("theUniter",6,"aszeneca","Red Screw Driver","6.jpg",300.00,3,2);
INSERT INTO carts VALUES("theUniter",15,"segFault","1 Pc. Piattos Chip","15.jpg",5600.00,8,1);
INSERT INTO carts VALUES("theUniter",19,"toysRMe","Sea Monkeh","19.jpg",420.00,5,2);


-- Select all carts for admin
CREATE PROCEDURE selectCarts()
BEGIN
    SELECT * FROM carts;
END;

-- Select All Carts of a user for cart page
CREATE PROCEDURE selectUserCarts(
    IN p_username VARCHAR(16)
)
BEGIN
    SELECT * FROM carts where username = p_username;
END;


CREATE PROCEDURE selectProductinCarts(
    IN p_productId INTEGER(8)
)
BEGIN
    SELECT * FROM carts where productId = p_productId;
END;

CREATE PROCEDURE selectCart(
    IN p_username VARCHAR(16),
    IN p_productId INTEGER(8)
)
BEGIN
    SELECT * FROM carts 
    where username = p_username AND productId = p_productId;
END;

CREATE PROCEDURE insertCart(
    IN p_username VARCHAR(16),
    IN p_productId INTEGER(8),
    IN p_sellerUsername VARCHAR(16),
    IN p_title VARCHAR(32),
    IN p_imgUrl VARCHAR(64),
    IN p_price DECIMAL(16,2),
    IN p_stock INTEGER(16),
    IN p_quantity INTEGER(16)
)
BEGIN
    INSERT INTO carts
    SET
        username = p_username,
        productId = p_productId,
        sellerUsername = p_sellerUsername,
        title = p_title,
        imgUrl = p_imgUrl,
        price = p_price,
        stock = p_stock, 
        quantity = p_quantity;
END;


CREATE PROCEDURE deleteCart(               -- Standard Cart delete from buyer's cart page 
    IN p_username VARCHAR(16),
    IN p_productId INTEGER(8)
)
BEGIN
    DELETE FROM carts
    where username = p_username AND productID = p_productId;
END;

CREATE PROCEDURE updateCartOnCheckout(        -- Update stock and price of all carts based on product ID upon checkout 
    IN p_productId INTEGER(8),
    IN p_stock INTEGER(16),
    IN p_quantity INTEGER(16)
)
BEGIN 
    UPDATE carts
    SET 
        stock = p_stock,
        quantity = p_quantity
    where productId = p_productId;
END;


CREATE PROCEDURE updateCartOnProductUpdate( -- Update all carts where the product was updated on an edit-product operation
    IN p_productId INTEGER(8),
    IN p_title VARCHAR(32),
    IN p_imgUrl VARCHAR(64),
    IN p_price DECIMAL(16,2),
    IN p_stock INTEGER(16)
)
BEGIN
    UPDATE carts
    SET
        title = p_title,
        imgUrl = p_imgUrl,
        price = p_price,
        stock = p_stock
    WHERE
        productId = p_productId;
END;



CREATE PROCEDURE updateCart(
    IN p_username VARCHAR(16),
    IN p_productId INTEGER(8),
    IN p_quantity INTEGER(16)
)
BEGIN
    UPDATE carts
    SET 
        quantity = p_quantity
    WHERE 
        username = p_username AND productId = p_productId;
END;
