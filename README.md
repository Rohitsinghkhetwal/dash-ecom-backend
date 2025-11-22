


 # E-commerce backend app 

 
-   **`index.ts`**  
    Acts as the **entry point** of the application. It initializes the Express server and loads all core modules.
    
-   **`db.ts`**  
    Contains the **database utility function** responsible for establishing and managing the PostgreSQL connection.
    
-   **`controller/`**  
    This folder contains all the **business logic** for the application. Each controller handles specific features or modules of the system.
    
-   **`routes/`**  
    Includes all the **API endpoint definitions**. Each route file maps URLs to their respective controller functions.
    
-   **`emailServices/`**  
    Contains the logic for **sending emails**, such as OTPs, notifications, or other email-based features.
    
-   **`.env`**  
    Stores all **environment variables and secrets**, such as database credentials, API keys, and configuration values.
    
-   **`package.json`**  
    Maintains the **project dependencies**, scripts, and metadata, representing the history and structure of the project.


## 2. Project  Instructions

```

#clone the backend app
https://github.com/Rohitsinghkhetwal/dash-ecom-backend.git

2. npm install

3. create a .env file and paste this 

PORT=8000

DATABASE_URL= your postgres Db

GMAIL_USER=gmail

GMAIL_PASS=gmail service pass.

and create this of your own .

#Open terminal and type npm run dev and hit Enter .


### Voila You started the backend app. 

Deploying the app in free render instance . gmail OTP may not work (It require paid instance ), Please try to run in local . 

```


```

## Basic Flows of Application.
We have Products stored in Database and we are fetching it using REST API .
WE are creating the orders and saving to backend and sending a mail to the user.
The flow is straight forward selecting the products in frontend placing the order .
After placing the order we are saving the data to database and sending a mail .

```