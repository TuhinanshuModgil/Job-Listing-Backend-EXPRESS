# File Structure 
The backend is written using Express and Mongoose. The main entry point is the index.js file in the root folder. 
The api folder was created to deploy the server on Vercel.
The models folder contains the Schemas/data models for the job listing. This will be used when we add a new job to the database
The routes folder contains all the routes required for the CRED operations on the Jobs

# How to setup on you PC 
Download the entire folder from git hub into your PC

now open terminal and change directory into the folder

In the terminal run
```
npm i 
```
to instal all the required packages 
I have also included the .env file with the environment variables so that connection to database can be established 
In a real server the enviroment variable file would be hidden and not be available to public

now run
```
npm run dev
```
to start the backend 

note: now that the backend is running on port specified in the .env file we can setup the front and start sending the requests to the backend.

Important! Do make sure that the localhost port in the .env.local file of the frontend is same as the port in the .env file 