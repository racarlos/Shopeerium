const express = require('express');

const seedRouter = express.Router();

const Redis = require('ioredis');
const redis =  new Redis({
    port: 6379,
    host: 'shopeerium_redis',
    password: "Password097"
}); 


seedRouter.post('/', async (req,res,next) => {


    const shopsArr = [
        {
            "sellerUsername": "alingPuring",
            "shopName" : "Pure Silver",
            "shopLogo" : "alingPuring.png",
            "productCount" : 5,
            "dateJoined" : "August 2021",
            "number": "9112358112",
            "email": "alingPuring@puregold.com"
        },
        {
            "sellerUsername": "aszeneca",
            "shopName" : "Flagship Flagstore",
            "shopLogo" : "aszeneca.png",
            "productCount" : 5,
            "dateJoined" : "August 2021",
            "number": "9356387181",
            "email": "aszeneca@up.edu.ph"
        },
        {
            "sellerUsername": "segFault",
            "shopName" : "CD-R Kween",
            "shopLogo" : "segFault.png",
            "productCount" : 5,
            "dateJoined" : "August 2021",
            "number": "9351237181",
            "email": "segfault@gmail.com"
        },
        {
            "sellerUsername": "toysRMe",
            "shopName" : "Toys R ME BannerStore",
            "shopLogo" : "toysRMe.png",
            "productCount" : 5,
            "dateJoined" : "August 2021",
            "number": "9354567181",
            "email": "ksanders@gmail.com"
        }
    ]

    const usersArr = [
        {
            "username": "alingPuring",
            "firstName": "Pure",
            "lastName": "Aurum",
            "number": "9112358112",
            "role": "seller",
            "email": "alingPuring@puregold.com",
            "password": "betterthanlanders",
            "imgUrl": "alingPuring.png"
        },
        {
            "username": "aszeneca",
            "firstName": "Rendon",
            "lastName": "Labador",
            "number": "9356387181",
            "role": "seller",
            "email": "aszeneca@up.edu.ph",
            "password": "notsecure",
            "imgUrl": "aszeneca.png"
        },
        {
            "username": "masterMark",
            "firstName": "xX Mark",
            "lastName": "Kram Xx",
            "number": "9123899222",
            "role": "buyer",
            "email": "mail@mail.com",
            "password": "extendpakuya",
            "imgUrl": "masterMark.png"
        },
        {
            "username": "mrClean",
            "firstName": "Kiko",
            "lastName": "Matos",
            "number": "9239456222",
            "role": "buyer",
            "email": "mail@mail.com",
            "password": "somewhatsecure",
            "imgUrl": "mrClean.png"
        },
        {
            "username": "racarlos",
            "firstName": "Robie",
            "lastName": "Carlos",
            "number": "9239899222",
            "role": "buyer",
            "email": "racarlos1@up.edu.ph",
            "password": "verysecure",
            "imgUrl": "racarlos.png"
        },
        {
            "username": "segFault",
            "firstName": "Core",
            "lastName": "Dump",
            "number": "9351237181",
            "role": "seller",
            "email": "segfault@gmail.com",
            "password": "whydoIcodeinC",
            "imgUrl": "segFault.png"
        },
        {
            "username": "theUniter",
            "firstName": "Otto",
            "lastName": "Bismarck",
            "number": "9278999606",
            "role": "buyer",
            "email": "mail@mail.com",
            "password": "anakitabimoakona",
            "imgUrl": "theUniter.png"
        },
        {
            "username": "toysRMe",
            "firstName": "Koronel",
            "lastName": "Sanders",
            "number": "9354567181",
            "role": "seller",
            "email": "ksanders@gmail.com",
            "password": "fingerlickingood",
            "imgUrl": "toysRMe.png"
        },
        {
            "username": "yellowKid",
            "firstName": "Joseph",
            "lastName": "Weil",
            "number": "9239899456",
            "role": "buyer",
            "email": "notAmail.com",
            "password": "pasokmgasuki",
            "imgUrl": "yellowKid.png"
        }
    ]

    const productsArr = [
        {
            "productId": 1,
            "sellerUsername": "alingPuring",
            "title": "1 Pc. Piattos Chip",
            "imgUrl": "1.jpg",
            "price": 60,
            "stock": 23,
            "amountSold": 27,
            "categories": "[\"Food\", \"Pets\", \"Art\"]",
            "description": "Yes, its just 1 Chip for 60 pesos, what a steal right?"
        },
        {
            "productId": 2,
            "sellerUsername": "alingPuring",
            "title": "Marshmellow",
            "imgUrl": "2.jpg",
            "price": 3,
            "stock": 500,
            "amountSold": 234,
            "categories": "[\"Food\", \"Pets\"]",
            "description": "Chrisopher Comstock made this"
        },
        {
            "productId": 3,
            "sellerUsername": "alingPuring",
            "title": "Edible Crayons",
            "imgUrl": "3.jpg",
            "price": 120,
            "stock": 7,
            "amountSold": 346,
            "categories": "[\"Health\", \"Food\", \"Art\"]",
            "description": "Sakto pang kulay ng Gaming Build mo"
        },
        {
            "productId": 4,
            "sellerUsername": "alingPuring",
            "title": "Ice Cube",
            "imgUrl": "4.jpg",
            "price": 5,
            "stock": 0,
            "amountSold": 1000,
            "categories": "[\"Toys\", \"Food\", \"Health\"]",
            "description": "Melts right before you get it"
        },
        {
            "productId": 5,
            "sellerUsername": "alingPuring",
            "title": "Pancit Canton",
            "imgUrl": "5.jpg",
            "price": 15,
            "stock": 1000,
            "amountSold": 420,
            "categories": "[\"Home\", \"Food\", \"Health\"]",
            "description": "Unang Kagat Iskolar Agad"
        },
        {
            "productId": 6,
            "sellerUsername": "aszeneca",
            "title": "Red Screw Driver",
            "imgUrl": "6.jpg",
            "price": 300,
            "stock": 3,
            "amountSold": 345,
            "categories": "[\"Home\", \"Toys\", \"Tools\"]",
            "description": "Counterclockwise to tighten"
        },
        {
            "productId": 7,
            "sellerUsername": "aszeneca",
            "title": "2D Printed Hammer",
            "imgUrl": "7.jpg",
            "price": 900,
            "stock": 3,
            "amountSold": 34,
            "categories": "[\"Home\", \"Tools\", \"Art\"]",
            "description": "1 Dimension less than a 3D Printed One"
        },
        {
            "productId": 8,
            "sellerUsername": "aszeneca",
            "title": "Babyproof Nails",
            "imgUrl": "8.jpg",
            "price": 7.5,
            "stock": 50,
            "amountSold": 456,
            "categories": "[\"Tools\", \"Pets\", \"Furnitures\"]",
            "description": "Make it safe for your babies"
        },
        {
            "productId": 9,
            "sellerUsername": "aszeneca",
            "title": "Alien Wrench",
            "imgUrl": "9.jpg",
            "price": 230,
            "stock": 6,
            "amountSold": 3030,
            "categories": "[\"Tools\", \"Technology\", \"Accessories\"]",
            "description": "Allen wrenches can't fix my bike"
        },
        {
            "productId": 10,
            "sellerUsername": "aszeneca",
            "title": "Zip Tie Legit 100%",
            "imgUrl": "10.jpg",
            "price": 3,
            "stock": 500,
            "amountSold": 128,
            "categories": "[\"Tools\", \"Clothings\", \"Health\"]",
            "description": "Legit legit no Issue, PM for orders"
        },
        {
            "productId": 11,
            "sellerUsername": "segFault",
            "title": "CDRK GTX 3060",
            "imgUrl": "11.jpg",
            "price": 59000,
            "stock": 5,
            "amountSold": 1,
            "categories": "[\"Toys\", \"Technology\", \"Appliances\"]",
            "description": "Take on the latest games using the power of Ampere"
        },
        {
            "productId": 12,
            "sellerUsername": "segFault",
            "title": "AMD Ryzen 4900H",
            "imgUrl": "12.jpg",
            "price": 24500,
            "stock": 3,
            "amountSold": 456,
            "categories": "[\"Technology\", \"Health\", \"Furnitures\"]",
            "description": "But can it run Crysis?"
        },
        {
            "productId": 13,
            "sellerUsername": "segFault",
            "title": "Samsung 970 Evo Plus",
            "imgUrl": "13.jpg",
            "price": 970,
            "stock": 970,
            "amountSold": 54,
            "categories": "[\"Technology\", \"Mobile\", \"Clothings\"]",
            "description": "Restart your machine 5 times while your friend is still booting up"
        },
        {
            "productId": 14,
            "sellerUsername": "segFault",
            "title": "Kingston 2666 Mhz DDR4",
            "imgUrl": "14.jpg",
            "price": 2600,
            "stock": 40,
            "amountSold": 23,
            "categories": "[\"Technology\", \"Food\"]",
            "description": "Yes, Its gonna help you run Crysis"
        },
        {
            "productId": 15,
            "sellerUsername": "segFault",
            "title": "Keychron RGB K8",
            "imgUrl": "15.jpg",
            "price": 5600,
            "stock": 8,
            "amountSold": 45,
            "categories": "[\"Technology\", \"Mobile\", \"Art\"]",
            "description": "Keychron RGB K8 Wireless Mechanical Keyboard"
        },
        {
            "productId": 16,
            "sellerUsername": "toysRMe",
            "title": "Bakugan Batang Brawlers",
            "imgUrl": "16.jpg",
            "price": 71,
            "stock": 5,
            "amountSold": 70,
            "categories": "[\"Toys\", \"Furnitures\", \"Accessories\"]",
            "description": "For throwing, not for eating"
        },
        {
            "productId": 17,
            "sellerUsername": "toysRMe",
            "title": "Zoids Burning Liger",
            "imgUrl": "17.jpg",
            "price": 68,
            "stock": 5,
            "amountSold": 71,
            "categories": "[\"Toys\", \"Clothings\", \"Art\"]",
            "description": "No it doesn't get a Season 2"
        },
        {
            "productId": 18,
            "sellerUsername": "toysRMe",
            "title": "Bebeless Beyblade",
            "imgUrl": "18.jpg",
            "price": 27,
            "stock": 5,
            "amountSold": 72,
            "categories": "[\"Toys\"]",
            "description": "Beyblade para sa walang bebe :( "
        },
        {
            "productId": 19,
            "sellerUsername": "toysRMe",
            "title": "Sea Monkeh",
            "imgUrl": "19.jpg",
            "price": 420,
            "stock": 5,
            "amountSold": 73,
            "categories": "[\"Toys\"]",
            "description": "I still dont get how these things live"
        },
        {
            "productId": 20,
            "sellerUsername": "toysRMe",
            "title": "Nerf Nerf Nerf",
            "imgUrl": "20.jpg",
            "price": 300,
            "stock": 5,
            "amountSold": 74,
            "categories": "[\"Toys\"]",
            "description": "Nerf your champ, nerf your buiid"
        }
    ]

    try {

        for(const user of usersArr){
            await redis.hmset(`users:${user.username}`,user);
        }
    
        for(const product of productsArr){
            await redis.hmset(`products:${product.productId}`,product);
        }
    
        for(const shop of shopsArr){
            await redis.hmset(`shops:${shop.sellerUsername}`,shop);
        }
    
        
        res.status(200).json({
            message: "User and Product Data is Seeded"
        });

    } catch (error) {

        res.status(500).json({
            message: "REDIS Data Seeding Failed"
        });

    }
});





module.exports = seedRouter;