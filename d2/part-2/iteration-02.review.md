# Table Ready

[Website link: https://table-ready.herokuapp.com/](https://table-ready.herokuapp.com/)


## Iteration 02 - Review & Retrospect

 * When: Nov 10th, 2019
 * Where: online

## Process - Reflection

We are working on a restaurant management web portal for Table Ready. Our web portal will mainly be used by restaurant owners and restaurant employees to efficiently manage customer reservation, waitlisting and restaurants. We also made an interface for Table Ready system admins to manage their users.

#### Decisions that turned out well

1. Using React + mongodb + express + nodeJS turned out to be very convenient. Some of us had no experience using these tools and we were able to ramp up quickly as there are many tutorials and libraries available. 
2. Working in separate dev branches avoided conflicts and maintained a clean working tree. This saved a lot of time and effort and we could keep track of each other’s progress and code easily. 
3. Dividing the team into sub-groups with each sub-group responsible for the interface of one type of user. This workflow allowed each page to be completed independently and saved tons of time needed to debug other people’s code. Instead, each pair can focus on their assigned page. 
4. Creating [mock-ups](https://docs.google.com/presentation/d/1g1dHOyj21-MOzF1t34b7JpvGQRNcFAWaiYuNGUe0HvY/edit?usp=sharing) for UI and implement front-end following the plan. After we decided how the UI should look like, implementing the front-end became much easier as we avoided unnecessary changes and miscommunication.

#### Decisions that did not turn out as well as we hoped

1. SQL database vs noSQL database:

   Originally, our plan is to use a SQL database since our partner told us she used SQL database before and it would be easier for her to set up the server. However, she encountered some difficulty and we couldn’t solve it. We then explained some advantages of cloud databases to her and we ended up using a mongodb database.

2. Drag and Drop package:

   One of the requirements from our partner is to implement a drag and drop system for the waitlist management. We originally used a npm package called ‘react-beautiful-dnd’. However, the package is not compatible with some other functionality we have. Therefore, we have to switch to another package called ‘react-dnd’. This package works great, but it does not have some fancy animation in the old package.


#### Planned changes

- Remove payment feature as requested by our partner. As a result, remove stats viewing in super admin page as there will not be any useful stats.
- Relocate register new super admin user from signup page to super admin’s page as requested by our partner. 
- Reformat employee page UI:
  1. Condense all the card layout. Right now the card take up too much space on the screen given how little information it contains. Our partner suggests us to make it into an excel spreadsheet style but she also like our card-like design. Therefore, we decide to condense our card layout to make it take less space.
  2. Remove the horizontal [burger menu](https://github.com/negomi/react-burger-menu). Right now, when seating a group of people, the user needs to click on the waitlist card to bring out a horizontal menu that contains table information. Then drag the card to the corresponding position. Our partner suggests us to remove this menu and put the table information alongside with the waitlist cards so that the users can see 
- Unify styles used throughout the application for better user experience.


## Product - Review

#### Goals and/or tasks that were met/completed:

- Database has been well set up. All database dependent operations are implemented. 
- Completed sign in and sign up pages and data manipulation related to these two pages.
- Completed main workflow on the restaurant and restaurant owner pages. Able to view and update all information about owners, the restaurants he owns, the menu items, and his employees.
- Completed major functionalities for adding/removing reservation and waitlist. This was planned to be delivered next time originally. 
- Completed system administrator page. Administrator can access the revenue, all users’ information, and his/her own profile settings.

#### Goals and/or tasks that were planned but not met/completed:

- Initially, we were planning to do some testing or security handling. In tutorial, our TA suggested we don’t necessarily need to handle them in this phase. So we shifted our time and focus to deliver more features for a more complete user experience. 
- Better error handling. We did not provide adequate error messages to the user. We decided to add more useful and prettier error messages / warnings in the next deliverable after we complete thorough testing. 
- Initially, we planned for the restaurant owners to be able to view his own restaurant’s employees’ pages. However, since we had some difficulties merging the two pages (they were implemented by two different sub-groups), there are a lot of details we need to change in order to complete this feature. Therefore, we decided to leave this feature to the next phase.

#### How was your product demo?
Each sub-group demoed the page that they were responsible for to our partner on Google Hangout. We set up each page beforehand and ran a rehearsal. Our partner was pretty satisfied with our results and she really liked with the UI design. She gave us some comments about moving some components around as well as removing some small features. Before our demo, she didn’t reply to our emails for 10 days so we didn’t receive any feedback from her when we were planning the details. After the demo, we gained much more information for how the UI should look like. She suggested us to make decisions from a restaurant manager’s perspective more and keep up the good work. 

## Meeting Highlights

Going into the next iteration, our main insights are:

- Our work distribution and sub-team splits worked quite well, but because some members did not have prior experience with database/react, we had a hard time in the beginning to set things up. We expect a much smoother workflow in the next deliverable.
- Some teammates procrastinated due to other task deadlines/life, so as a team, we will start earlier next time and motivate each other to work.
- We did not do a lot of testing and security handling in this phase since we want to deliver as much features as possible, but we will focus more on QA in the next deliverable. 

  