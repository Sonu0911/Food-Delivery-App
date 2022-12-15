SRC
    config
        config.ts  
        //add all app config variable here like bcrypt token, port number, jwt secret key
        // DB connection
        // Base url

    +918074544730
CONTROLLERS

     1. User controller
         (a)  Create   // create the user with proper validation;
         (b)  Update // Update the user with proper validation;
         (c)  Login(otp,google)  // Login that user with the help of mobile number otp or with google account
                 //(d)  getUsers // Get the all users;
                  (e)  GetUser // get the single user with the help of id --> -->

      2.  RESTAURANT CONTROLLER
      
         (a)  Get all restaurant // Fetch all the restaurants
         (b)  Get restaurant  // with the help of id Fetch the single restaurant 

     3. SEARCH CONTROLLER
         (a) Add city  // Adding the city
         (b) GetCityId // get the city  

      4. FOOD CONTROLLER  
          (a)  Get food list of restaurant // Get all food list of a single restaurant 
          (b)  Get food list  // Get the food list from all restaurant
          (c)  Get food by id // Get the single food by id
          (d)  Update the food list // We can update the food list(if you want to add the food or minimize the food, you can do that)
          (e)  Delete food // you can delete the food

      5. ORDER CONTROLLER
          (a) Create order   // Creating a new order
          (b) Get order by id  // Get the single order with the help of id
          (c) Get the orders of users // Get the all orders

       6. PAYMENT
           (a) Create the payment;   

MIDDLEWARE
       1. Authentication & Authorization // for the secuirity purpose we have to authenticate and  authorize with the help of JWT token
       2. Admin authentication; // Authentication for the admin
       3. Guest access // without login guest what can access;

MODEL ( SCHEMAS)
      1. UserModel
      2. restaurant model
      3. SEARCH Model
      4. FOOD Model 
      5. OrderModel
      6. Payment Model

ROUTES
      // Here all the types of routes will be present;
      1. userRoute.ts
      2. restaurantRoute.ts;
      3. searchRoute.ts;
      4. foodRoute.ts;
      5. orderRoute.ts
      6. paymentRoute.ts

VALIDATION
     validation.ts  
     All common validation is here
     // bcrypt;
     // email validation
     // phone validation;
     // pincode validation;
     // string validation;


UTIL
    util.ts // Generate the token and it's expiry




// user
1. signup
2. verify resgister otp;
3. login;
4. verify login otp;
5. edit the user;
6. get the user'
7. forgot passcode;
8. verify the otp;
9. change passcode;

// restro;
1. add the restro;
2. get the rstro with the help of id;
3. get the all restro;
4. get the restro  with the help of city;

// food
1. add the food;
2. get the food with restro
3. get the list of  the food;
4. get the single food;  
5. delete the food;

// category;
1. create the category;
2. get the category;
3. delete the category;

// order
1. create the order
2. using id get the order
3. user's order;

// payment
1. payment(creating the payment order) ;
2. payment capture;

// review;
1. add the review to the order;
2. update the order;
3. delete the review;

// coupon ;
 add the coupon 

// seller;
 add business details;

// I have to work on ;

// favorite
1. add fav
2. get that fav items list;
3. delete ;

// best choices
CRUD
// best offers 
CRUD
// today's special
CRUD

//payout


      

