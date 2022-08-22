CREATE TABLE `users` (
    `username` VARCHAR(16) NOT NULL,
    `firstName` VARCHAR(16) NOT NULL,
    `lastName` VARCHAR(16) NOT NULL,
    `number` VARCHAR(11) NOT NULL,
    `role` VARCHAR(6) NOT NULL,
    `email` VARCHAR(32) NOT NULL,
    `password` VARCHAR(32) NOT NULL,
    `imgUrl` VARCHAR(64),
    CONSTRAINT users_username_pk PRIMARY KEY(username)
);

-- Buyers
INSERT INTO users VALUES("racarlos","Robie","Carlos",09239899222,"buyer","racarlos1@up.edu.ph","verysecure","racarlos.png");
INSERT INTO users VALUES("mrClean","Kiko","Matos",09239456222,"buyer","mail@mail.com","somewhatsecure","mrClean.png");
INSERT INTO users VALUES("masterMark","xX Mark","Kram Xx",09123899222,"buyer","mail@mail.com","extendpakuya","masterMark.png");
INSERT INTO users VALUES("yellowKid","Joseph","Weil",09239899456,"buyer","notAmail.com","pasokmgasuki","yellowKid.png");
INSERT INTO users VALUES("theUniter","Otto","Bismarck",09278999606,"buyer","mail@mail.com","anakitabimoakona","theUniter.png");

-- Sellers 
INSERT INTO users VALUES("alingPuring","Pure","Aurum",09112358112,"seller","alingPuring@puregold.com","betterthanlanders","alingPuring.png");       -- sells Food
INSERT INTO users VALUES("aszeneca","Rendon","Labador",09356387181,"seller","aszeneca@up.edu.ph","notsecure","aszeneca.png");                       -- sells Tools
INSERT INTO users VALUES("segFault","Core","Dump",09351237181,"seller","segfault@gmail.com","whydoIcodeinC","segFault.png");                        -- sells Tech
INSERT INTO users VALUES("toysRMe","Koronel","Sanders",09354567181,"seller","ksanders@gmail.com","fingerlickingood","toysRMe.png");                 -- sells Toys


-- Verify User in Login
CREATE PROCEDURE verifyUser(
    IN p_username VARCHAR(16),
    IN p_password VARCHAR(32)
)
BEGIN 
    SELECT * FROM users WHERE username = p_username AND password = p_password;
END;

-- Select all Users
CREATE PROCEDURE selectUsers()
BEGIN
    SELECT * FROM users;
END;

-- Select Single User, replaced by redis 
CREATE PROCEDURE selectUser(
    IN p_username VARCHAR(16)
)
BEGIN 
    SELECT * FROM users WHERE username = p_username;
END;

-- Inserting new User 
CREATE PROCEDURE insertUser(
    IN p_username VARCHAR(16),
    IN p_firstName VARCHAR(16),
    IN p_lastName VARCHAR(16),
    IN p_number VARCHAR(16),
    IN p_role VARCHAR(6),
    IN p_email VARCHAR(32),
    IN p_password VARCHAR(32),
    IN p_imgUrl VARCHAR(64)
)
BEGIN
    INSERT INTO users
    SET 
        username = p_username,
        firstName = p_firstName,
        lastName = p_lastName,
        number = p_number,
        role = p_role,
        email = p_email,
        password = p_password,
        imgUrl = p_imgUrl;
END;

 -- Delete a Buyer, and their Carts
CREATE PROCEDURE deleteBuyer(          
    IN p_username VARCHAR(16)
)
BEGIN
    DELETE FROM users WHERE username = p_username;
    DELETE FROM carts WHERE username = p_username;
END;

-- Delete a Seller, their products sold, and carts where they're product is put
CREATE PROCEDURE deleteSeller(          
    IN p_username VARCHAR(16)
)
BEGIN
    DELETE FROM users WHERE username = p_username;
    DELETE FROM products WHERE sellerUsername = p_username;
    DELETE FROM carts WHERE sellerUsername = p_username;
END;

-- Update User based on given info 
CREATE PROCEDURE updateUser(
    IN p_username VARCHAR(16),
    IN p_firstName VARCHAR(16),
    IN p_lastName VARCHAR(16),
    IN p_number VARCHAR(16),
    IN p_email VARCHAR(32),
    IN p_password VARCHAR(32),
    IN p_imgUrl VARCHAR(64)
)
BEGIN
    UPDATE users
    SET 
        firstName = p_firstName,
        lastName = p_lastName,
        number = p_number,
        email = p_email,
        password = p_password,
        imgUrl = p_imgUrl
    WHERE
        username = p_username;
END; 
