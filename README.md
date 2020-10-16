# **Keyless Transactions - Inbloxme**

This package enables usage of inblox handlename infrastructure as a keyless signing mechanism.

> Disclaimer - This is WIP, and release in beta.

## **Keyless Transactions**

Talking about user adoption, the bottleneck faced by most of the dApps is the user onboarding flow. The user needs to have a wallet, generating and operating a wallet is cumbersome for a new crypto user.

Keyless transactions abstracts the private key from the user and allows the user to sign transaction in an easy way while having the same level of security as before.

Inblox Keyless Transactions allow users to sign transactions via,

1. Password

2. Biometrics A. Fingerprint B. FaceID

3. Device based virtual Hardware Security Module

We have made **password based transaction signing** available for anyone to use, build upon and replicate.

This documentation focuses more on that, more coming soon. If you want to know more and enagage with development, you can email at the address in footnotes.

Happy #BUIDLing

## **Design Principles**

1. **Private Key Abstraction** - Inbloxme infrastructure never have the visibility of the private key, it's encrypted on the client with the user password(unsalted & unencrypted) and sent to the virtual Hardware Security Module for safe storage.

2. **Password Invisibility** - User password is never exposed in plain text to any of the systems apart from the client.

3. **Non-Custodial Relationship** - User Private Key is always exportable and encrypted version can be deleted (redundant) from the inbloxme infrastructure.

4. **App Agnostic** - Any application without getting an API key can access inbloxme handlename service, password based transaction signing requires special access which can be requested for. (In Alpha Testing).

## **Installation and Usage**

> Installation

Install the package by running the command,

`npm install @inbloxme/keyless-transactions`

Import the package into your project using,

`const inblox = require('@inbloxme/keyless-transactions');`

## **Keyless Transactions**

> Initializing

Initialise the constructor using your custom RPC URL.

`const keyless = new inblox.Keyless({ apiKey, apiSecret, rpcURL, env });`

Parameters,

* `apiKey` - The API Key for this user.

* `apiSecret` - The API Secret for this user.

* `rpcURL` - Web3 RPC provider URL.

* `env` - API environments (eg. dev, test).

--------------------------  

## Keyless Methods

> Get User

This method is used get user login token.

`getUser({ userName, password });`

Parameters,

* `userName` - InbloxId/Email of the user.

* `password` - User's Inblox password.

--------------------------

> Sign transactions

This method can be used to sign a transaction using the user's private key.

`signTransaction({ to, value, gasPrice, gasLimit, data, nonce, password });`

Parameters,

* `to` - Recipient public address

* `value` - Amount to be transferred in Wei

* `gasPrice` (optional) - Gas price value to be set in Wei

* `gasLimit` (optional) - Gas limit value to be set

* `data` (optional) - Data, in case of a contract call

* `nonce` (optional) - Transaction nonce

* `password` - User's Inblox password

--------------------------

> Send transactions

This Method is used to send a signed transaction to the blockchain.

`sendTx({ signedTx });`

Parameters,

* `signedTx` - Signed transaction in hex

--------------------------

> Sign and send transactions

This method is used to sign a raw transaction using the user's private key and send it to the blockchain

`signAndSendTx({ to, value, gasPrice, gasLimit, data, nonce, password });`

Parameters,

* `to` - Recipient public address

* `value` - Amount to be transferred in Wei

* `gasPrice` (optional) - Gas price value to be set in Wei

* `gasLimit` (optional) - Gas limit value to be set

* `data` (optional) - Data, in case of a contract call

* `nonce` (optional) - Transaction nonce

* `password` - User's Inblox password

--------------------------

> Validate password and get private key

This method is used to validate the user's password and get the private key

`validatePasswordAndGetPKey({ password });`

Parameters,

* `password` - User's Inblox password of the user

--------------------------

> Change Password

This Method is used to change a user's password

`changePassword({ encryptedPrivateKey, oldPassword, newPassword, confirmPassword });`

Parameters,

* `encryptedPrivateKey` - The encrypted private key of the user

* `oldPassword` - Old Inblox password of the user

* `newPassword` - New password to be set

* `confirmPassword` - Confirm new password

--------------------------

> Reset Password

This Method is used to reset a user's password

`resetPassword({ privateKey, seedPhrase, encryptedJson, walletPassword, newPassword });`

Parameters,

* `privateKey` - The private key of the user. OR

* `seedPhrase` - User's wallet seed phrase. OR

* `encryptedJson` - User's wallet keystore file. AND

* `walletPassword` - Keystore passphrase

* `newPassword` - New password to set

--------------------------

> Convert to ETH

This Method is used to convert value in Wei/gWei to ETH.

`convertToEth({ srcUnit, amount });`

Parameters,

* `srcUnit` - Source unit to be converted to ETH

* `amount` - Amount in source unit

--------------------------

## Wallet Methods

> Initializing

Initialise the constructor using your custom RPC URL.

--------------------------

`const keyless = new inblox.Wallet();`

  --------------------------

> Create Wallet

This Method is used to create a new wallet

`createWallet()`

--------------------------  

> Import from Keystore File

This Method is used to import a wallet using encrypted JSON and passphrase.

`importFromEncryptedJson(jsonData, password);`

Parameters,

* `jsonData` - The Keystore JSON

* `password` - The password to decrypt the Keystore JSON

--------------------------

> Import from mnemonic

This Method is used to import a wallet using mnemonic phrase

`importFromMnemonic(mnemonic);`

Parameters,

* `mnemonic` - The 12 word mnemonic/seed phrase

--------------------------

> Import from private key

This Method is used to import a wallet using private key

`importFromPrivateKey(privateKey);`

Parameters,

* `privateKey` - User's wallet private key

--------------------------

## Widget Integration

> Initializing

`const keylessWidget = new keyless.Widget({ rpcURL, env });`

Parameters,

* `rpcURL` - Web3 RPC provider URL.

* `env` - API environments (eg. dev, test).

--------------------------

> Event listeners - Initialization

* Listen for the **successful widget initialization** event using the event listener

    `keylessWidget.on(keylessWidget.EVENTS.KEYLESS_WIDGET_INITIALISED, (data) => { console.log(data) });`

* Listen for the **widget close** event using the event listener

    `keylessWidget.on(keylessWidget.EVENTS.KEYLESS_WIDGET_CLOSED, (data) => { console.log(data) });`

--------------------------

> Initialize login

`keylessWidget.initLogin();`

--------------------------

> Event listeners - Login

* Listen for the **login success** event using the event listener

    `keylessWidget.on(keylessWidget.EVENTS.LOGIN_SUCCESS, (data) => { console.log(data) });`

* Listen for the **login failure** event using the event listener

    `keylessWidget.on(keylessWidget.EVENTS.LOGIN_FAILURE, (data) => { console.log(data) });`

--------------------------

> Sign raw transaction

`keylessWidget.initSignTransaction({ to, value, gasPrice, gasLimit, data });`

Parameters,

* `to` - Public address of the recipient

* `value` - Value to be transferred in Wei

* `gasPrice` (optional) - Gas price to be set for the transaction in Wei

* `gasLimit` (optional) - Gas limit to be used for the transaction

* `data` (optional) - Data, incase of a contract call

--------------------------

> Get the signed transaction data

```keylessWidget.getSignedData()```

Returns `signedTransaction`

--------------------------

> Sign and send transaction

`keylessWidget.initSendTransaction({ to, value, gasPrice, gasLimit, data });`

Parameters,

* `to` - Public address of the recepient

* `value` - Value to be transferred in Wei

* `gasPrice` (optional) - Gas price to be set for the transaction in Wei

* `gasLimit` (optional) - Gas limit to be used for the transaction

* `data` (optional) - Data, incase of a contract call

--------------------------  

> Event listeners - Sign and send transaction

* Listen for the **transaction success** event using the event listener

    `keylessWidget.on(keylessWidget.EVENTS.TRANSACTION_SUCCESSFUL, (data) => { console.log(data) });`

* Listen for the **transaction failure** event using the event listener

    `keylessWidget.on(keylessWidget.EVENTS.TRANSACTION_FAILED, (data) => { console.log(data) });`

--------------------------

> Listen for the all the events

`keylessWidget.on(keylessWidget.ALL_EVENTS, (data) => { console.log(data) });`

--------------------------

> Get the details of the signed-in user

`keylessWidget.getUserData()`

Returns `publicAddress` and `inbloxId` of the user.

--------------------------

## **WIP**

Want to contribute, we would ❤️ that!

We are a Global 🌏🌍🌎 team! 💪

Write to [dev@inblox.me](mailto:dev@inblox.me), or follow us on twitter, [https://twitter.com/inblox_me](https://twitter.com/inblox_me)
