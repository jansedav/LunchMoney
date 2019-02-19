# Welcome to Lunch Money!

---

This is a personal project that I created in the Winter of 2019 while attending Oregon State University. I got the idea for this project from my love of the TV show Kitchen Nightmares. I noticed a pattern in many of the failing restaraunts on the show, poor inventory management and poorly priced items i.e. expired food, not enough inventory, overpriced/underpriced food etc. I decided that an inventory management application would be a great solution to this problem so that is why I started developing LunchMoney.

---
####To start the program locally:
Please start by downloading the node modules for both the frontend and backend by entering the following in to the command line in the relative directories i.e. LunchMoney, lunch-money-api, lunch-money-ui (Note the following examples are assuming you are using a linux environment):

```
npm install --save
```
---
Start your Mongodb database if you are running it locally:
```
sudo service mongodb start
```
---
Set the jwtPrivateKey (Note this is just an example the value you set is up to you!):
```
export lunch_jwtPrivateKey=LunchMoney
```
---
Start the backend and the frontend at the same time from the root directory i.e. LunchMoney :
```
npm start
```
---
