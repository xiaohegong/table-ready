# TABLE READY

## Description 
We are planning to build a web portal for [Table Ready](http://www.tableready.net) that allows restaurant owners to efficiently manage their restaurants’ waitlist, reservations, customers, and employees with ease. In addition, our portal will integrate with another existing mobile app that customers use to add reservations, waitlist and check out restaurants. 

## Key Features
There are three types of targeted users for our app: restaurant managers, restaurant employees and Table Ready system admins.

#### System Admins
* View subscription trends and user statistics
* Add/Delete all existing users and restaurants. 
* Ability to view and perform operations on all UI pages of existing users and restaurants.

#### Restaurant Managers
* Add/Delete employees for the restaurants they own.
* View each restaurant employee's information.
* Edit the restaurant's information.
* Create and add a new restaurant they own.
* View/Add/Delete the menu of their restaurant.
* Subscription payment to Table Ready.

#### Restaurant Employees
* View the current status of the restaurant this employee works for, including
  * the current occupancy states for each table;
  * the current waitlist status,
    * number of groups on the waitlist;
    * for each group on the waitlist, ability to view the number of guest, their estimated arrival time, and the date of waitlisting. 
* Update the restaurant current state.
	* Employees that are using this software can drag one of the waitlist card to an empty table with enough capacity, indicating one of the group on the waitlist has been served. The status of that group's waitlist card will change from "not served" to "served". 
	* After they finish their meal, employees can empty the occupied table, and remove the waitlist card that have been served. 

## Instructions
 <!-- * Clear instructions for how to use the application from the end-user's perspective -->
 <!-- * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc.  -->
 <!-- * Provide clear steps for using each feature described above -->
#### Live App
https://table-ready.herokuapp.com/

#### Usages
##### Log in & Sign up
- Visit the web app. 
  - The homepage animation is made by a member who had a lot of fun learning react. We play with the bubbles when we feel frustrated while debugging, but we will update this design to match with other pages in the end. 
- Click sign up and register a new user of type 
    1) super admin,
    2) restaurant admin,
    3) restaurant employee.
- Log in on the homepage. Some pre-registered users for your convenience:
    - super admin user 
      - Username: admin
      - Password: admin
    - restaurant manage user
      - Username: user
      - Password: user
    - restaurant employee user
      - Username: emp
      - Password: empemp

##### Navigating as Restaurant Manager User
(Log in as Username: user & Password: user)
- Your personal Page:
  - View your information and all owned restaurant.
  - Add a new restaurant by clicking the "Add New" button on the top right corner
      * Fill in all information and click "Create Restaurant" button to create a new restaurant.
  - Click on any of the restaurant to view its detail.
- Your restaurant Page:
  * Add an employee by entering their username and clicking "Add Employee" button.
  * Delete an employee by clicking the 
  "Delete" button.
  * Update your restaurant information by clicking "Edit" button next to Restaurant Info
  * View Dress Code, Menu, and Payment Info by clicking cards under Options
      - For dress code
          * edit Dress Code by clicking "edit" button and "Done" after editing
      - Update menu
          * add menu item by clicking "add new" button
          * delete menu item by clicking "delete" button

##### Navigating as Restaurant Employee User
(Log in as Username: emp & Password: empemp)
- If the current login user is not working at any restaurant right now, the page will be redirected to a error page. So please ask your restaurant manager to add you to their restaurant first. 
- If the current login user is working at a restaurant, he/she will be directed to the employee page.
- Click on the input box at the top center. Select a date using the date picker and click "confirm" to display a list of guests (each represented by a card) with reservations or on the waitlist for that specific date.
- The reservations displayed only belong to the current restaurant. Employees can't see reservations for other restaurants. For this deliverable, we treated a reservation and a waitlist guest the same way.
- Click the "add reservation" button to add a new reservation. This will bring a pop up window that allows the user to fill in the specific information about the reservation. After filling out all fields, click the submit button to add the reservation.
- To put a reservation from the waitlist to an empty table, click on the check mark button on the reservation card. This will bring up a horizontal menu. 
  - Left side shows all the reservation you want to serve. 
  - Right side shows all the table status. Drag the reservation card on the left to one of the empty table. 
  - Green indicates the table is currently occupied. 
  - If the capacity of the table does not meet the capacity limit, the background will turn to red and dropping the card on that table will have no effect. 
  - If the capacity of the table meets the requirement, then the background will turn green, and dropping the card will change the status of the reservation from not served to served.
- To cancel or serve a reservation, click on the "stopping" button next to the "check" button on the card to remove it.

##### Navigating as System Admin User
(Log in as Username: admin & Password: admin)
- Overview displays subscription trends and user statistics. This feature is not implemented yet as we left all the "subscription" features to d3. 
- "Manage" displays the list of all users and restaurant registered in the system. You can
  - search an user/restaurant using the search bar,
  - remove an user/restaurant by clicking on "Delete" button.
  - go to the user/restaurant by clicking on their name. 
- "Settings" lets the system admin user to update his/her email and password. The payment info section will be implemented in d3. 