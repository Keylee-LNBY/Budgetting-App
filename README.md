# Budgetting-App

This is an application that allows users to track their transactions on & offline. Users are also given a chart to have a visual of their transactions, and the total money they have left.

This app would be a great budget tracker for trips, vacations, and projects. 
Add the money you have bugetted for a project and then add any transactions you are making to see how much you are spending and have left.

This app uses node, express, mongoose, and webpack.

Whenever a user enters transactions offline, they are stored in the indexedb (a pending db) that stores any data entered, and then once you open the application back up online the stored data is seamlessly entered into the database. I got this to work by using a service worker.


![Budget Tracker](/public/icons/chartView.png)
![Budget Tracker](/public/icons/transactionView.png)

Here is the deployed application: 
[Check out Budget Tracker on Heroku!](https://secret-beach-48232.herokuapp.com/)