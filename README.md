For Deployment

Prior to Run the App:
Installation of Mongo DB, Node and Npm is required.

DB Setup:
1. Create a db named "bank_backend" in Mongo DB, and configure the connection string in 'config.json'

Project Setup: 

1. Go to root folder of the project from command line and run "npm install"
2. After the command has completed, run "npm start".

wait for the message "running server on port 4000"


Information: Note Count is managed in the server only and not in DB, hence the note count will be 0 when server is started.

API Routes:

1. Register Card

Endpoint: '/cards/register'
Method: 'POST'
Params: {
	cardno
	pin,
	firstname,
	lastname
}

2. Authenticate Card

Endpoint: '/cards/authenticate'
Method: 'POST'
Params: {
	cardno,
	pin
}

3. Withdraw Money

Endpoint: '/cards/withdraw'
Method: 'POST'
Params: {
	cardno,
	amount
}

4. Deposit Money

Endpoint: '/cards/deposit'
Method: 'POST'
Params: {
	cardno,
	two_thousand,
	five_hundered
}