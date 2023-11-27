# SplitMate: A Smart Expense Manager and Splitter

SplitMate is a web app that helps you manage your expenses and split them with your friends. Whether you are planning a trip, a party, or a group project, SplitMate can make it easy to track your spending and share the costs.

## Features

With SplitMate, you can:

- Add friends and send friend requests to connect with other users
- Add expenses and income to keep track of your budget
- See a detailed breakdown of your spending by category
- Split money with your friends in any ratio or percentage
- Create groups and split expenses equally among group members
- View your balance and settle debts with a few clicks

## Technologies

SplitMate is built with HTML, CSS, JavaScript, Node.js, Express, MongoDB, and Bootstrap. It has a single repo for both the backend and the frontend.

## Demo

You can try out the app here: https://splitmate.netlify.app/

## Installation

To run the app locally, follow these steps:

1. Clone the repo: `git clone https://github.com/splitmate/splitmate.git`
2. Go to the backend folder: `cd backend`
3. Create a .env file with the following variables:

```
PORT = 3000 (or any of your choice)
MONGO_URL = "add your mongo url here"
JWT_SECRET = "add a secret jwt here"
```

4. Install the dependencies: `npm install`
5. Run the server: `node index.js`
6. Go to the frontend folder: `cd ../frontend`
7. Optionally, change the fetch urls in all files to localhost:<port>
8. Open the html files in your browser or use an IDE to run them

- Alternatively, you can skip steps 2 to 7 and just open the html files as they are connected to the real server already deployed on render.com.

