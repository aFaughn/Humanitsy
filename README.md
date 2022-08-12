# Humanitsy README
Welcome to Humanitsy!
Live Link https://humanitsy.herokuapp.com
Humanitsy is a clone of Etsy, users can create, edit, and delete products and reviews!

## Index
- Features
- Components
- Schema
- Frontend Routes
- API Routes
- Redux Store Tree
- Screenshots
- How to build & run Humanitsy
- Technologies
- Planned Features
- Technical Implementation Details

## Features
### Sign Up
Users can login and create accounts and any products or reviews made will be saved to a backend flask app.
### Navigation Bar
A navigation component is always visible anywhere on the application for quick and easy browsing to any view.
### Demo User
A convenient Demo User button is available to those who want to skip the registration process and login with a pre-made account with a few sample products and reviews tied to it.
### Products
Users may browse all products on the site on the main page, and click their respective cards to view specific details about that product.
### Reviews
Users are able to leave a review for a restaurant by assigning it a score of 1-5 and leaving a comment about their experience (Users may only leave 1 review)

## Components
- RestaurantDetails - Show a product's details
- RestaurantEdit - Edit form for product
- RestaurantForm - Show create form for product
- MostRecentProducts - Show all products
- ReviewEdit - Update a user review
- ReviewForm - Create a review
- Reviews - Show all reviews
- User - User profle
- Footer
- NavBar
## Database Schema
![database schema](https://user-images.githubusercontent.com/5642880/182678964-8df9c309-eb2e-47a2-966f-d668a53a1858.png)
## API Routes
### All routes begin with /api/
### __/auth__
- GET / - Authenticate user
- POST /login - log user in
- POST /logout - log user out
- POST /sign_up - create new user instance and log them in
### __/products__
- GET /new - Get new product form
- POST /new - Submit new product form
- GET /:productId - Get details for a specific product
- DELETE /:productId/delete - Delete a specified product
- PUT /:productId/edit - Update a products details
### /reviews
- GET /all - Get all reviews
- POST /new - Post a new review
- PUT /:reviewId/edit - update a review
- DELETE /:reviewId/delete - delete a review
## Redux Store Tree

```
store = {
    session:{user},
    products:{
              productId:{
                           productData
                           },
              optionalOrderedList: []
             },
    reviews:{
             productId:{
                      reviewData
                      }
             optionalOrderedList: []
              }
```
## Installation
1. Clone Humanitsy
2. ```cd``` into the ```/app``` folder.
3. run ```pipenv install ``` and enter your ```pipenv shell```
4. run ```flask run``` to start the backend flask server on default: `port 3000`
5. In a seperate terminal, ```cd``` into the ```/react-app``` folder
6. run ```npm install ```
7. run ```npm build``` to start the frontend react server on default port: `5000` in production mode
8. If it does not automatically open a browser window, navigate to ```localhost:5000``` to access the app.
  ## Technologies Used
  ![](https://img.shields.io/badge/-HTML-5555ff?style=flat-square&logo=html5&logoColor=FFFFFF) ![](https://img.shields.io/badge/-CSS-5555ff?style=flat-square&logo=css3&logoColor=FFFFFF) ![](https://img.shields.io/badge/-JS-5555ff?style=flat-square&logo=javascript&logoColor=FFFFFF)  ![](https://img.shields.io/badge/-Python-5555ff?style=flat-square&logo=python&logoColor=ffffff)  ![](https://img.shields.io/badge/-React-5555ff?style=flat-square&logo=react&logoColor=FFFFFF) ![](https://img.shields.io/badge/-VScode-5555ff?style=flat-square&logo=visual-studio-code&logoColor=FFFFFF)
![](https://img.shields.io/badge/-Flask-5555ff?style=flat-square&logo=flask&logoColor=ffffff)  ![](https://img.shields.io/badge/-Redux-5555ff?style=flat-square&logo=redux&logoColor=ffffff)  ![](https://img.shields.io/badge/-Postgres-5555ff?style=flat-square&logo=sequelize&logoColor=ffffff)  ![](https://img.shields.io/badge/-GitHub-5555ff?style=flat-square&logo=github&logoColor=ffffff)
## Technical Details
Humanitsy was built using Flask as it's backend, and React / Redux for it's front end.

Humanitsy was a big project for a single developer and there were often times where I was left scratching my head. That being said, I have big plans for the future of this app and plan to continue updating it over time.
## Planned Features
 - [ ] Users can upload their images to AWS instead of just providing a URL
 - [ ] Users can add items to a cart that will persist after logout / refresh
 - [ ] Users can browse all of a seller's products
 - [ ] Users can search products by keyword or attributes
 - [ ] Incorporate all stats of weapons
 - [ ] Past Orders
 - [ ] Sign in / Sign up Modal instead of a route
 - [ ] Select Infusion option on add-to-cart
 - [ ] Display number of reviews
 - [ ] Display more of a seller's products beneath a product's page
 - [ ] Seller outstanding orders page with buyer notes
 - [ ] SketchFab previews
## Screenshots
### All Products
![Products](https://i.imgur.com/PKrVhDc.png)
### Product Details
![ProductDetails](https://i.imgur.com/JK9HafX.png)
### Splash Page
![SplashPage](PlaceHolder)
