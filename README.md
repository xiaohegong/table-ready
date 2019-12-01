# Table Ready

## Description 

This is a web portal built for [Table Ready](http://www.tableready.net) that allows restaurant managers to efficiently manage their restaurants’ waitlist, reservations, information, customers, and employees with ease. In addition, our portal will be integrated with the Table Ready's mobile app that customers use to add reservations, waitlist and check out restaurants. We aim to facilitate restaurant managers to efficiently manage their restaurant and maintain communication with their customers.    

## Key Features
There are three types of end users for our app: restaurant managers, restaurant employees and Table Ready system admins.

#### System Admins
* Add/Delete all existing users and restaurants. 
* Ability to add a new system admin user.
* Ability to view all available pages and perform all types of supported operations:
  * Act as a restaurant manager and update restaurant information.
  * Act as a restaurant manager and manage restaurant employees. 
  * Act as a restaurant employee and update the reservations, waitlist and current status of the restaurant.  
  * View and update information on any user's personal page. 
  
#### Restaurant Managers
* Add/Delete employees for the restaurants he own.
* View each restaurant employee's information.
* Edit the restaurant's information.
* Edit his personal information.
* Create and add a new restaurant he own.
* View/Add/Delete the menu of his restaurant.
* Add/modify the tables and table capacity for his restaurant, so the restaurant employees can update the table occupancy status in real time. 
* Upload image for a view of his restaurant or for a food item on the menu.  

#### Restaurant Employees
* View the current status of the restaurant this employee works for, including:
  * the current occupancy status for each table,
  * the current reservations
    * number of reservations,
    * The estimated time of arrival, number of guests, and arrival status for each reservation,
  * the current waitlist status,
    * number of groups on the waitlist,
    * for each group on the waitlist, ability to view the number of guest, their estimated arrival time, and the date of waitlisting. 
* Update the restaurant's current status.
	* Employees that are using this software can drag any of the guest card to an empty table with enough capacity, indicating one of the group on the waitlist/reservation list has been served. The status of that group's waitlist card will change from "not served" to "served". 
	* After the guests are done with their meal, employees can remove the guest card and empty the occupied table when the table is cleaned up. 
* Add a new group of guests to the waitlist or add a new reservation. 

## Instructions

 ### Live App
 https://table-ready.herokuapp.com/
 
 ### Usages
 #### Log in, Log out & Sign up
 - Visit the web app. 
 - Click sign up and register a new user of type 
     1) restaurant admin,
     2) restaurant employee.
 - Log in on the homepage.
 - At any point after you are logged in, click the "log out" button on the top right corner to log out. 
 
 #### Navigating as Restaurant Manager User
 - When you are logged in, you first see your personal page:
   - View your information on the left and all the restaurants you own on the right.
   - Update your information by clicking "Setting" and update your profile picture by clicking "Change Avatar".
   - Add a new restaurant by clicking the "Add New" button on the top right corner
       * Fill in all information and click "Create Restaurant" button to create a new restaurant.
   - Click on any of the restaurant to view its detail.
 - Your restaurant Page:
   * At any point, you can click your profile picture on the top right corner to go back to your personal page.
   * This restaurant's information is displayed on the left, you can click "Edit" to update them. You can also upload a picture of your restaurant by clicking "change image". 
   * Add an employee by entering their username and clicking the "Add Employee" button. This will send an invitation to the employee to work for your restaurant. You will be able to see them in the employees list once the accept your invitation.
   * Delete an employee by clicking the "Delete" button.
   * View Dress Code, Menu, and Tables by clicking cards under Options on the left. 
       - For dress code
           * Edit your Dress Code by clicking "edit" button and "Done" after editing.
       - Update menu
           * Add a menu item by clicking "Add New" button
           * Edit or Delete menu item by clicking the buttons on the menu item.
           * Change the image for the menu item so your customers can visualize the food on the menu.
       - Tables
           * You can add new tables to your restaurant.
           * You can also edit the name and capacity for each table, the default capacity is 2. These tables will be used in the employee's page for them to update the tables' status when customers arrive.


#### Navigating as Restaurant Employee User
- When you are logged in, if you are not working at any restaurant right now, you will see your personal page. You can change your avatar, update your personal and contact information here. Now you will not be able to see the restaurant status management page. Ask your restaurant manager to send you an invitation.
- Once you've received an invitation to work at a restaurant, you can choose to reject or accept the invitation.
- If you confirm to work at a restaurant:
    * You will see the restaurant status management page after you log in, but you can still go to your personal page by clicking your profile picture on the top right. 
    * Click on the input box at the top center. Select a date using the date picker to display the lists of guests that have reservations or are on the waitlist at that day. 
    * The reservations displayed only belong to the current restaurant. Employees for one restaurant can't see reservations for other restaurants. 
    * Click the "New Guests" button to add a new reservation or add new guests to the waitlist. This will bring a pop up window that allows the employee to fill in the specific information about the reservation/waitlist. After filling out all fields, click the submit button to add the reservation.
- On this restaurant status management page, you can:
    * Click on the cards for each group of guests and see their reservation/waitlist details. 
    * If they are ready to be sitted, click on the checkmark button and drag their card to one of the available table.
        * While you are dragging the cards, if the table turns red, then the table's capacity is not enough for this group of guests. The table will fit if it turns green. 
        * When you are done, click the close button on the top right or hit "Esc" key to return to the main page.
    * If a group of guests are done, click the "ban" button on their card. When the table is cleaned up and ready again, click the "ban" button on the table.
- To cancel a reservation or remove guests from the waitlist, click on the "ban" on their card.

#### Navigating as System Admin User
- After you are logged in, you will see the "Manage" pane, which displays the list of all users and restaurant registered in the system. You can:
  - search an user/restaurant using the search bar.
  - remove an user/restaurant by clicking on the "Delete" button.
  - go to the user/restaurant page by clicking on their name and perform administrative operations.
  - add a new super admin user, which can only be added by you. 
- "Settings" lets the system admin user to update his/her email, phone number and password. 

## Development requirements
We are using react and nodejs for our application. To work on this application, you might want to install nodejs and npm install all the required packages. We are using a cloud database, so no setup is required for the database.

### Running remotely
Simply visit the live app on:  https://table-ready.herokuapp.com/

### Running locally
1. `git clone` this repo
2. `cd react-app/`
3. `npm run dev`
4. Finally, open your browser and navigate the app. 

### Running tests 
#### Tests for server calls
> *Note:* Please make sure you are not running the application locally before you run the tests. 
1. Shut down any running instances of local server. 
2. `cd react-app/`
3. Start your local mongodb database: `mongod`
4. Run `npm test`
5. You will see all the test results and test coverage summary

#### Tests for react components
1. `cd react-app/clients`
2. Run `npm test`
4. You will see all the test results.


 ## Licenses 

 We chose The MIT License so that we can have this repository open-sourced and keep frequent maintenance after we handoff the repo. 
 This will make the codebase public and available for any interested users.  

