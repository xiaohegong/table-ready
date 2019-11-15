# TABLE READY

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 
 * We are planning to build a web portal for [Table Ready](http://www.tableready.net) that allows restaurant owners to efficiently manage their restaurants’ waitlist and reservations, customers, and employees with ease. The clients register and manage their restaurant internally, such as reservations and nightly seating, and externally, such as advertising restaurant, while maintaining positive interactions with new and returning customers. In addition, our portal will integrate with another app that customers use to make reservations. 
 * Provide a high-level description of your application and it's value from an end-user's perspective
 * What is the problem you're trying to solve?
 * Is there any context required to understand **why** the application solves this problem?

## Key Features
There are three types of users of our app: SuperAdmins, Restaurant Owners and Employees.
For SuperAdmins, the key features are:
 * Add/Delete existing users. Those users includes restaurant owners and employees.
 * Create SupperAdmins ( Super Admins can only be created by Super Admins)
 * View all the exisiting users and restaurants.

For Restaurant Owners, the key features are:
 * Add/Delete employees from their restaurant.
 * View the restaurant employee's information.
 * Edit the restaurant's information.
 * Create new restaurant.
 * View/Add/Delete the menu of their restaurant

For Employees, the key features are:
 * View the restaurant current state. That includes
	 * See which tables are empty and which tables are occupied.
	 * See the current waitlist status. How many waitlists? For each waitlist, how many people are there? What is their estimated arrival time? On what day are they arriving? 
* Edit the restaurant current state. That includes
	* Employees that are using this software can drag one of the waitlist card to an empty table with enough capacity, indicating one of the group on the waitlist has been served. The status of that group's waitlist card will change from "not served" to "served" After they finish their meal, employees can empty the occupied table, and remove the waitlist card that have been served. 
 * Described the key features in the application that the user can access
 * Feel free to provide a breakdown or detail for each feature that is most appropriate for your application

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
    - log in or sign up on homepage
    - if log in as admin: 
        - Restaurants Page:
            - you can view admin's information and all owned restaurant.
            - you can add new restaurant by clicking the Add New button on the top right corner
                * complete all information and click Create Restaurant button to create new restaurant.
            - clicking on any of the restaurant to view its detail.
        - Restaurant Page:
            * you can add an employees by entering their username and clicking Add Employee button.
            * you can delete an employee by clicking the Delete button.
            * you can update your restaurant information by clicking Edit button next to Restaurant Info
            * you by view Dress Code, Menu, and Pay by clicking cards under Options
                - Dress Code
                    *  edit Dress Code by clicking edit button and Done after edit
                - Menu
                    * add menu item by clicking add new button
                    * delete menu item by clicking delete button
	- At the employee page:
		- If the current login user is not working at any restaurant right now, the page will be redirected to a error page.
		- If the current login user is working at a restaurant, he will be directed to the employee page. There are few elements on the page he can interact with:
			* There is an input box on the top center. When you click on that, there will be a date picker that allows you to select the current date.
			* After selecting a date, click on the confirm button next to the input box to display the current reservations on that specific date. The reservations displayed only belongs to the current restaurant. Employees can't see reservations for other restaurant.
            * If you want to add another reservation, click the "add reservation" button next to the confirm button. This will bring a pop up window that allows the user to fill in the specific information about the reservation. After filling out all of them, click the submit button to add reservation.
        - To put a reservation from the waitlist to an empty table, click on the check mark button on the reservation card. This will bring up a horizontal menu. One the left of the menu are all the reservation you want to serve. On the right of the menu are all the table status. Green indicates the table is currently occupied. You can drag the reservation card on the left and drop it on one of the empty table. If the capacity of the table does not meet the requirement, the backgroun will be red and dropping the card on that table will have no effect. If the capacity of the table meets the requirement, then the background will turn green, and dropping the card will change the status of the reservation from not served to served.
        - If you are done with one of the reservation, click on the "stopping" button next to the "check" button on the card to remove it.
 * If you cannot deploy your application for technical reasons, please let your TA know at the beginning of the iteration. You will need to demo the application to your partner either way.
