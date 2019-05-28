# bamazon
a store front connected to MySQL

Welcome to Bamazon, a virtual store where anything can be sold.  Below will be a brief instructional on how to use the website to navigate purchases or if you are a manager to view and add product information.

First of you will start out by running node bamazonCustomer.js.

1) you will be prompt to enter your name and confirm if you want to look at what is for sale

2) After you confirm that you are ready to look at what is for sale, a list of all the current items for sale will populate.

3) Then you will hit the down arrow, and be prompted to pick an item ID number that you are interested in.

4) Then you will be prompted to enter the amount of items you would like to purchase.

5) It will then produce a total for you and ask whether you would like to confirm that purchase or not.

6) Depending on your choice if you hit yes the program will thank you and end, if you hit no it will bring you back to the list to see if you would like to pick another option.

below is a brief video that showcases how this application works from a customer view point:

[brief demo of the customer view of bamazon](https://youtu.be/BVYfkzHkiDM "Bamazon Customer Demo")



Manager side

like the customer side you start out by using node bamazonManager.js

1) you will be prompted to either log in, create a new user or exit.

2) if you already have an id you will log in and then be prompted to either add a product or look at current inventory.

3) if you don't have an ID you can try and create a new ID.  If you have the special code that allows you to create ID's you will be prompted to place that before you continue.

4) once you place the key code to start creating an ID you than will put your username and password in.  This will then be your login credentials for the manager view.  Run the application again and login.

below is a short video showcasing the different capabilities of this program:

[brief demo of the manager credential check and view](https://youtu.be/JKNXIdF5cqY "Bamazon Manager Demo")

Features:
-Has user authentication, only registered users can access the manager view
-Only individuals with the hard coded key can setup a manager account to access the manager view
-Once you access the manager view it will continually loop to allow you to continue making edits.

Future add ons:
-Remove items
-Measure sales