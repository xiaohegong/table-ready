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
                
 * If you cannot deploy your application for technical reasons, please let your TA know at the beginning of the iteration. You will need to demo the application to your partner either way.

