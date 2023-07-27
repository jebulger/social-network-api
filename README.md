# Social Network API

## Description

## Installation
Requirements:
- Access to a command line tool
- Node.js installed
- Insomnia in order to test the routes
## Usage
Steps to use the app:
1. Cd into the root directory with your command line.
2. Run the command node server.js to start the server.
3. The routes are now live and can be tested using insomnia.
4. The base endpoint is "http://localhost:3001/api".
5. Example routes here (replace the all caps with the actual ids):
    - Friends:
        - Add friend: http://localhost:3001/api/users/USERIDHERE/friends/NEWFRIENDID
        - Remove friend: http://localhost:3001/api/users/USERIDHERE/friends/EXFRIENDID
    - Users:
        - Find all users: http://localhost:3001/api/users
        - Find single user: http://localhost:3001/api/users/USERSIDHERE
        - Create new user: http://localhost:3001/api/users
            - Passing in the json body containing username and email
        - Update existing user: http://localhost:3001/api/users/USERID
            - Passing in a json body containing new username
        - Delete an existing user: http://localhost:3001/api/users/USERID
    - Reactions: 
        - Create a reaction to a thought: http://localhost:3001/api/thoughts/THOUGHTID/reactions
            - Passing in reactionBody and username of who is giving the reaction
        - Remove a reaction on a thought: http://localhost:3001/api/thoughts/THOUGHTID/reactions/REACTIONID
    - Thoughts: 
        - Get all thoughts: http://localhost:3001/api/thoughts
        - Get a single thought: http://localhost:3001/api/thoughts/THOUGHTID
        - Create a new thought: http://localhost:3001/api/thoughts
            - Passing in thoughtText, username, and userId
        - Update a thought: http://localhost:3001/api/thoughts/THOUGHTID
            - Passing in its new thoughtText
        - Delete a thought: http://localhost:3001/api/thoughts/THOUGHTID

## Tutorial
The tutorial provides a much better guide on how to use the api. You can visit it in the link below:

[Click here to watch the tutorial](https://drive.google.com/file/d/1-PCc6GQ6pBUpnkJPfPv8PnDkciYPB22L/view?usp=sharing)