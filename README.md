
## Leave Management Application 
This is a personal practice project, the application is used to submit leave applications by employees and the HR can decline or approve the applications. Check out the deployment [here](https://leave-mng.surge.sh). 


## Technology
### Front-End
React/Redux/React Router/React-loading-overlay/axios

### Back-End
Node.js/Express/Mongodb/Mongoose/Socket.io

## Functionality
The application realized following features:
* Users login and logout function, if the user has HR authority, the page will have an extra option to list all the applications and that user can take actions on each application.(Note: At the stage, using 'john'/'test' and 'manager'/'test' to login)
* Users are able to choose the leave type, if the leave type is annual leave or sick leave, the application page will display the days they have accumulated till now and they won't be able to apply for days exceed the limit.
* The dates users want to take leave will be highlighted.(Note: the function is working locally, but not working in the deployment environment)
* The HR entry will list all applications and once users click on certain application, the dates will be highlighted in the calendar.

## Considerations
* The application used a calendar module which was one of my previous practice module. I modified it a little bit so it can take a callback function which is necessay for this project.

## Future Improvement
* Add a sign-up page and store the user info in the database at the back-end.
* Now the Login authentication is simply implemented in front-end, after the above function  completed, it is better to realise it at the back-end.
* Add a notification function so once the application is updated, the user can be notified.
* Polish the UI by using UI libraries
* Enhance the mobile device friendliness
