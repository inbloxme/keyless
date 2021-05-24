### 1.0.4 (2020-06-18)

##### New features added

* Added methods to change and reset password.
* Added a method to create a new wallet.
* Wallet methods have been moved to a separate class. [README](https://github.com/inbloxme/keyless#readme)

### 1.0.5 (2020-06-29)

##### Pipeline Added

* Added github pipelines to feature, bugfix and master branch.

### 1.0.6 (2020-08-20)

##### Updated return values for getUser method

* getUser method now returns wallet instance along with the token.

### 1.0.7 (2020-08-21)

##### Updated the class return statements

* Updated the return statements for classes
* Implemented the methods from wallet class inside the utils to extract private key.

### 1.0.8 (2020-08-21)

##### Custom error for insufficient funds

* Added a custom error message when the transaction fails due to insufficient funds.

### 1.0.9 (2020-08-21)

##### Explicitly returned the private key and mnemonic from the wallet recovery methods.

* Updated the wallet recovery methods to explicitly return the private key and mnemonic instead of the entire object.

### 1.1.0 (2020-08-22)

##### Transaction and IP info logging.
* Added transaction and IP info logging after successful transaction.

### 1.1.1 (2020-08-26)

##### Updated the error message in the getUser method.

* If the user credentials entered doesn't exist or is incorrect, the error message will be displayed accordingly.
* Added transaction and IP info logging after successful transaction.

### 1.1.2 (2020-09-03)

##### Added method to convert amount wei and gwei to eth.

*User needs to enter source unit and amount. The method will convert the amount to eth.

### 1.1.3 (2020-09-09)

##### Added the Widget.

*Added the widget for keyless transaction signing

### 1.1.4 (2020-09-09)

##### Changed Credentials to test environment.

*Changed credentials to test environment

### 1.1.5 (2020-09-09)

##### Fixed the punctuation error.

*Fixed the punctuation error.

### 1.1.6 (2020-09-10)

##### Added the methods to calculate gas fee and display it on the widget.

*Added the methods to calculate gas fee and display it on the widget
*Fixed some linting issues.

### 1.1.7 (2020-09-19)

##### Reenabled the back button on the "Enter Password" screen.

*Reenabled the back button on the "Enter Password" screen.

### 1.1.8 (2020-09-22)

##### Enabled the user to set custom web3 provider URL.

*Enabled the user to set custom web3 provider URL.

### 1.1.9 (2020-10-09)

##### User needs to initialize the Widget constructor by passing the rpcURL and the environment.

*Enabled the user to initialize the constructor by passing the rpcURL and the environment.

### 1.2.0 (2020-10-13)

##### Custom error messages.

*Added custom error messages for web3 provider errors like insufficient funds, low gas limit or invalid public address.

### 1.3.0 (2020-12-02)

##### Features Updated

*IP logging feature removed
*Hardcoded url and error messages removed and set in constants
*Reset and change password feature removed
*Remember me feature removed
*Bar loader updated to inblox.me logo loader
*Removed redundant event listeners
*Added separate event listeners for sign and send transaction & sign transation
*Added condition for inblox backend test environment
*Updated re-directions from widget


### 1.3.1 (2020-12-03)

##### Bugs fixed

*Removed duplicate variable import

### 1.3.2 (2020-01-31)

##### Dynamic Network Selection

*Transaction will be sent to the network specified in the RPC URL.
*Etherscan link on the transaction success modal will be decided according to the network type.

### 1.3.3 (2020-02-02)

##### Vulnerable package update

*Bumped up the axios version because of its high severity vulnerability.

### 1.3.4 (2020-02-08)

##### Fix punctuation issue

*Fixed the punctuation issue caused due to the use of ESLint.

### 1.3.5 (2021-03-13)

##### Updated the base URL for Auth service.

*Updated the Auth service URL from inblox to safle.

### 1.3.6 (2021-03-15)

##### Rebranding from Inblox to Safle.

*Updated all the instances of Inblox to Safle.
*Updated the widget logo and color schemes as per the new brand guidelines.

### 1.3.7 (2021-03-17)

##### Fixing footer logo alignment.

*Powered by safle logo alignment updated.

### 1.0.1 (2021-03-17)

##### Fixing footer  alignment.

* Footer alignment updated.

### 1.0.2 (2021-04-16)

##### Updated README.

* Updated all the instances of inblox to safle inside the README file.

### 1.0.3 (2021-05-24)

##### Added bundle file.

* Added a minified js file of keyless package
