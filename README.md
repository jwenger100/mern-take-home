# Installing Koyfin Take Home
1. Run the command ```git clone https://github.com/jwenger100/mern-take-home.git``` If git is not installed, please follow these [instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
2. If not already installed, please [download](https://nodejs.org/en/download/) the latest version of Node and install it. You can check if node is installed by typing ```node -v``` at the command prompt.
3. Navigate to the .env file in the ./server folder of the directory where you cloned or unzipped the project. If using the Github version, enter the ATLAS (MongoDB) password from the email into the connection string and replace the token ```<password>``` with the value (the password is already entered to the .env file for the zipped version).
4. Make sure you are still in the ./server folder of that directory and type enter ```npm install``` at the command prompt.
5. Type in ```npm start``` to launch the webserver and backend server.
6. Wait for the message in the command window "ETL Pipeline completed. Please load the web application." This will denote that the ETL pipeline has finished and all data is loaded into MongoDB.
7. Open the web browser and navigate to [http://localhost:8080](http://localhost:8080).


