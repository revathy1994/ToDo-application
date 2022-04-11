# Brief Description

ToDo is a task management online application to help you stay organized and manage your day to day. By using ToDo, you can make 
shopping lists, tasks lists or plan an event. From grocery lists to work routines are simple with ToDo. 
The user can securely login with their email and password to view, add, update or delete tasks. After an ongoing task is completed, user can tap the button 'mark as completed' or if you want to delete an ongoing task, you can tap the 'delete' button. ToDo helps you quickly capture and retrieve your lists across multipe devices.
The additional features included are the 'Notification' where the user can get new notification of the ongoing tasks (to be completed) on the current date and the 'Filter' where the user can view all his tasks including 'completed tasks' and 'ongoing tasks' by under three different filters. The three filters are 1. ALL, 2. COMPLETED, 3. ONGOING.



# Overview of the technologies

The technologies used to build the ToDo web application are:
Node 14,
Front-End framework: Angular 12,
UI frameworks: Angular material,
               Bootstrap 5,
Database: Firebase realtime database 

# Security Considerations

The User can sign in to the ToDo web application securely using their email and password and the authentication is completed with firebase. 
The user session expires after 60 minutes and the user gets automatically logged out from their ToDo account.
The password must be 8 characters including letters and numbers.


# Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

# To Run Project

Step 1: Clone the repository - git clone
|Step 2: open the project in any IDE
|Step 3: Execute command - npm install
|Step 4: Execute command - ng serve


# Login Details

User 1: marie@gmail.com
Password: marie123

User 2: keith@gmail.com
Password: keith001

# ToDo Features

1. Notification - 
The user will receive notification of their tasks lists to be completed on the current date.

2. Filter - 
The user can filter their tasks into 3:
    All - All the ongoing and the completed tasks will list under 'All',
    Completed - The completed task till date will list under 'Completed',
    Ongoing - The current ongoing task or the the tasks to be completed will lists under 'Ongoing'



# TodoAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
