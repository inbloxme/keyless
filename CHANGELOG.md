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
