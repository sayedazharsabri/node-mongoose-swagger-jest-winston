# A NodeJS project wich included nodeJS, mongoose, swagger, jest, winston and express validator

### To run this project on Local
Step 1: Run below command to install all the packages
        
        yarn install


### To run using nodemon

Step 1: Create a mongoDB database and add mongoDB connection string to nodemon.json -> MONGODB_CONNECTION_STRING
Step 2: Run below command to start the server on localhost
        
        yarn start:dev


### To run without nodemon
Step 1: set NODE_ENV, PORT, MONGODB_CONNECTION_STRING in node environment while executing command to run server. 

### To run Test cases
Step 1: Run below command
        
        yarn test

### To access swagger documentation
Step 1: Run the server on local host and then go to browser and access below URL
        
        http://localhost:3000/api-docs
        
Note: 3000 is port, so change it if you change the port

### To access logs
Step 1: Goto log folder. There datewise files for mixed/combined logs and errors.




