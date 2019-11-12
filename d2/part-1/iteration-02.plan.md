# Table Ready


## Iteration 02

 * Start date: Oct 19th, 2019
 * End date: Nov 8th, 2019

## Process

We are working on a restaurant management web portal for Table Ready. Our web portal will mainly be used by restaurant owners and restaurant employees to efficiently manage customer reservation, waitlisting and restaurants. We also made an interface for Table Ready system admins to manage their users. 

#### Roles & responsibilities

We have one person responsible for managing project and communicating with partner. Then we divided our application into 4 main interfaces and assigned each pair a page to take care of. Each sub-group will be responsible for every element on the asssigned page including front-end, back-end and interaction with API/database. 

* Xiaohe Gong:
    * Weakness: familiar but rarely used Java, no experience with react and angular 
    * Strength: experienced with web dev, docker, and database
    * Responsibilities: 1) Managing progress: plan milestones and communicate with partner 2) Work on the superadmin user interface, responsible for 
* Jiatao Xiang:
    * Weakness: no experience with angular
    * Strength:  database design, backend design, front end design
    * Responsibilities: database design, responsible for backend and front-end functionalities of sign up and log in page. Including authentication and session validation. 
* Yujie Miao: 
    * Weakness: not familiar with React and Angular.  Not familiar with UI design.
    * Strength: proficient with php, very experienced with web development using javascript and sql database.
    * Responsibilities: Database design, back-end, reponsible for the restaurant owner UI.
* Xu Wang:
    * Weakness: unfamiliar with NoSQL
    * Strength: experience with backend development, database design and management
    * Responsibilities: backend development and front-end design and implementation of superadmin UI. 
* Huakun Shen:
    * Weakness: unfamiliar with frontend UI design
    * Strength: experience with databases, and frontend & backend web development
    * Responsibilities: app deployment on AWS, designing front-end and integrating backend database for the restaurant owner page. 
* Wenshuo Li:
    * Weakness: No web/database experience
    * Strength: experienced with UI design
    * Responsibilities: Front-end design and back-end implementation of restaurant employee page. 
* Lantao Cui: 
    * Weakness: No knowledge of database, React and angular
    * Strength: Familiar with Java, Javascript, and has experience with UX design
    * Responsibilities: Back-end and front-end  implementation for restaurant employee page. 

#### Team Rules

We expect to meet once per week with our partner. We will have 1-2 face-to-face meetings each week within our team, and we will have remote meetings on google hangout with our partner since our partner does not live in the GTA. We’ve already set up a groupchat with our partner for meeting remotely. 

For meetings, we will keep a minutes for every meeting. We already have meeting minutes with our [partner](https://docs.google.com/document/d/144cCnsJGDXGZDuQeKfe_9Xnur8x1ENCg_WSGpzylNng/edit?usp=sharing) and within our [group](https://docs.google.com/document/d/1LNuYeRcTlORE7JXlvPhqWXyxSPD5UxnJ7wrf9Af4M9E/edit?usp=sharing) linked.  We will also keep track of our progress on our [Trello board](https://trello.com/b/mTQ6buKm/phase-1). 
We have not had a lot of problems since we are all friends with each other. We’ve been indecisive about which kind of database system we want to use, so we wrote down the advantages of each decision and took a vote. We had some confusion for the technical expectations of our partner about what she wants the application to be deployed on, so we had another meeting with her to clarify and we are planning to talk to our TA about some technical problems we may face. If any tasks are delayed, we will talk to the person that was assigned the task and help them if they are stuck. If they are behind schedule due to other reasons (other assignments or being lazy), we will discuss the problem further in our weekly meeting.


#### Events

We plan to hold meetings weekly with our team at Gerstein Library, and at least bi-weekly with our partner remotely using Google Hangout. We’ve temporarily set the meeting time to be every Saturday morning.
For each meeting, we are going to talk about our progress and plans. We will show our partner what we’ve been doing this week. We will also ask our partner for further instructions and suggestions, and we need to assign additional work to people with less work or more available time. We will have a discussion session and multiple code reviews. Considering the case that someone may not be clear about what they should do, we decide to divide our group in pairs, so that the team management will be more flexible because we can have pair meetings more frequently.   
Besides from regular meetings with our partner, we will also hold regular meetings within the group (once or twice per week). During the group meeting, each member will talk about what they’ve been doing this week, what they’ve finished and what they are planning to do next. We will also send each other code review request if we are finished with a large chunk of code. 

#### Partner Meetings
We’ve already had two meetings online. One on October 4th and one on October 12th. During our first meeting, we introduced ourselves to our project partner. The project partner briefly explained what the project is and what her expectation is about this project. In the second meeting, we talked about how should we build this project and what specific architecture should the application follow. We had a long discussion on which type of database we are going to use (SQL or no-SQL). 
So now we have the regular meeting, basic technologies and architecture set up with our partner. 
We've been keeping track of the partner meeting minutes [here](https://docs.google.com/document/d/144cCnsJGDXGZDuQeKfe_9Xnur8x1ENCg_WSGpzylNng/edit?usp=sharing).


#### Artifacts

We will have a To-Do lists including all of our current tasks and we will actively give updates on Messenger. We will use trello to assign tasks for our project. We will update what we should do for each week and cross out the items we’ve already finished. 
- Phase 1 [Trello board](https://trello.com/b/mTQ6buKm/phase-1)

Each task will have its own priority, and we will be focusing on the one will higher priorities. We will prioritize each task based on whether it is a prerequisite of other tasks, for example, if we must finish task A before task B, task A will have a higher priority. We will also evaluate one task’s priority based on how many other tasks it is involved in. When assigning tasks to group members, we will take account into the task’s difficulty, that particular member’s strength and weakness. After all, we will make sure each group member put an equal amount of time and effort into this project.


#### Deployment and Github Workflow

We've divided our web application into 4 main interfaces and divided our team into sub-groups that will be responsible for the assigned page. This way, we will not need to know every tiny implementation detail our teammate implemented and makes debugging more efficient. Each sub-group will git checkout a separate development branch while they are working on the assigned page. When some substantial progress is made (e.g.,  front-end of the page is finished), the sub-team will submit a pull request from dev/feature branch to master branch and ask the team to review. When at least one person reviews and approves the code, the author can merge the changes into master. This way, we will foster good code, a clean working tree and maintain a record of important milestones/progess. 

We decided to follow conventions when coding and naming variables. While developing, we will deploy and test our application on local nodeJS server. We will also write automated tests after we are done with the main functionalities. When we are ready to deploy, we will use Heroku to deploy the web application online. We choose to use Heroku because we really only need a server with domain names and Heroku provides high quality, free service. 


## Product

#### Goals and tasks

We aim to have a working prototype of the web portal in this iteration with only minor features left to be done. 
* We will start with creating UI Mock-ups and implement the front-end interface accordingly. There are four main interfaces in our application:
    * Log in/Sign up 
    * Restaurant owner page
        * Displays all restaurant information under the owner
        * Display restaurant owner information
        * Payment method to Table Ready
        * Displays all restaurant employees
    * Restaurant employee page
        * Add and manage reservations
        * Add and manage waitlisting
    * System admin page
        * Displays user subscription trends/stats
        * Manage all restaurant and users
        * Settings: update user information
* Then we will build API routes and database collections to store users, reservations and restaurant data. 
* We will also connect each page with the database so that the frontend interacts with the backend effectively. 
* Finally, when each page works with each other and the database, we will deploy the application to an AWS server. 
* Some minor features will be skipped and delivered in the next iteration. 
    * Subscription Payment
    * Drag and Drop Table assignment

#### Artifacts

We will have a To-Do lists including all of our current tasks. We will use trello to assign tasks for our project. We will update what we should do for each week and cross out the items we’ve already finished. 
  - Phase 1 [Trello board](https://trello.com/b/mTQ6buKm/phase-1)

We will plan our front-end design and make mock-ups. Then we will send the draft to our partner for suggestions. The mock-up will be followed when we implement the frontend.
  - [Front-end Mock-up](https://docs.google.com/presentation/d/1g1dHOyj21-MOzF1t34b7JpvGQRNcFAWaiYuNGUe0HvY/edit?usp=sharing)

We will also design the database structure as a team. We will decide how and what to store for every object we need in the database. This way, we will know exactly what to expect when fetching/working with database. 
  - [Database design](https://docs.google.com/presentation/d/1obw6oMljnIAOQM-sE64_XcFNz9TjB4mGw-WpQpQovvU/edit?usp=sharing)