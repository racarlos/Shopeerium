
const userRouter = require('./routes/userRouter')                   // Import Routes 
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const categoryRouter = require('./routes/categoryRouter');
const authRouter = require('./routes/authRouter');
const seedRouter = require('./routes/seedRouter');
const shopRouter = require('./routes/shopRouter');
const fileRouter = require('./routes/fileRouter');

const express = require('express');
const app = express();                                              // Import deps 
const server = require('http').Server(app);                         // http server using express as req and res handler 

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET","POST","PUT","PATCH","DELETE"]
    }
})   // Mount io to server

const bodyParser = require('body-parser');


const port = process.env.PORT || 3000

let options = {                                                            // Config for express.static 
    dotfiles: "ignore",
    extensions: ["jfif","jpg","jpeg","png"],
    index: false
}

app.use('/assets',express.static('assets',options));                       // For Serving static files (images in assets folder)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, PUT');
    res.header('Access-Control-Allow-Credentials: true');

    next();
});


app.get('/',(req,res) => {
    res.status(200).json({
        message: 'Welcome to Shopeerium'
    })
})

app.use('/upload',fileRouter);              // Let app use the route handlers 
app.use('/users',userRouter);            
app.use('/shops',shopRouter)
app.use('/products',productRouter);
app.use('/carts', cartRouter);
app.use('/categories',categoryRouter);
app.use('/auth',authRouter);
app.use('/seed',seedRouter)                 // Used for Initial redis seeding 

                                            
app.use((req,res,next) => {                 // If path does not exist 

    const error = new Error('Not Found')   
    error.status = 404                    

    res.status(404).json({                  // Error response to be sent back 
        error: {
            message: error.message,
            params: req.params,
            error: error
        }
    })           
})



io.on("connection", socket => { 

    socket.on('Updating Product', (updatedProduct) => {             // Updates in product-detail, cart-list
        io.emit('Updated Product', updatedProduct)
    });

    socket.on('Checking-out Product', (checkedOutProduct) => {      // Updates in product-detail, cart list 
        io.emit('Checked-out Product', checkedOutProduct)
    });


});


server.listen(port, () => {
    console.log("Server is listening on port: ",port)
    console.log("Shopeerium! Wowee")                        // Wowee
})
