# **Keyless Transactions - Inbloxme**

This package enables usage of inblox handlename infrastructure as a keyless signing mechanism.

> Disclaimer - This is WIP, and release in alpha.

## **Keyless Tranasctions**

Talking about user adoption, the bottleneck faced by most of the dApps is the user onboarding flow. The user needs to have a wallet, generating and operating a wallet is cumbersome for a new crypto user.

Keyless transactions abstracts the private key from the user and allows the user to sign transaction in an easy way while having the same level of security as before.

Inblox Keyless Transactions allow users to sign transactions via,

1. Password
2. Biometrics A. Fingerprint B. FaceID
3. Device based virtual Hardware Security Module

We have made **password based transaction signing** available for anyone to use, build upon and replicate.

This documentation focuses more on that, more coming soon. If you want to know more and enagage with development, you can email at the address in footnotes.

Happy #BUIDLing

## **Design Principles**

1. **Private Key Abstraction** - Inbloxme infrastructure never have the visibility of the private key, it's encrypted on the client with the user password(unsalted & unencrypted) and sent to the virtual Hardware Security Module for safe storage.
2. **Password Invisibility** - User password is never exposed in plain text to any of the systems apart from the client.
3. **Non-Custodial Relationship** - User Private Key is always exportable and encrypted version can be deleted (redundant) from the inbloxme infrastructure.
4. **App Agnostic** - Any application without getting an API key can access inbloxme handlename service, password based transaction signing requires special access which can be requested for. (In Alpha Testing).

## **Installation and Usage**

> Installation

Install the package by running the command,

`npm install @inbloxme/inblox-keyless-txns`

Import the package into your project using,

`const inblox = require('@inbloxme/inblox-keyless-txns');`

## **Password Based Transaction Sign**

> Initialising

Initialise the constructor using,

`const PBTS = new inblox.PBTS(authenticationToken);`

> Sign Transaction

This method can be used to sign a transaction using the user's private key. The transaction can be done using the provider as infura by inputting the infura key or the RPC URL.

`const signTx = PBTS.signAndSendTx({ password, rawTx });`

`password` - The Inblox password of the user. `rawTx` - The raw transaction object.

The `rawTx` object contains, `to` - Address to send the transaction to. `from` - Address of the sender. `gasPrice` - Price of gas in wei. `gasLimit` - Gas Limit for the transaction. `nonce` - Nonce of the sender address. `value` - Amount to be sent in the transaction. `data` - Data to be passed in the transaction. Can be a contract call data.

## **Login Via Inblox**

> Initialising

To use Login Via Inblox method, initialise the constructor using,

`const loginViaInblox = new inblox.LoginViaInblox(accessToken);`

> Login Via Inblox

This method is used to generate a Bearer token from the Inblox backend systems which can be used to initiate request to access protected resources.

`const token = loginViaInblox.login({ userName, password });`

`userName` - The user's handlename or the email id associated with Inblox platform. `password` - The Inblox password of the user.

> LogOut

This method is used to logout from the Inblox platform.

`const token = loginViaInblox.logout();`

> Sign Transaction

This method enables

> Note - For all the methods, errors are returned under error key and success is returned under response key.

## **WIP**

Want to contribute, we would ❤️ that!

We are a Global 🌏🌍🌎 team! 💪

Write to [dev@inblox.me](mailto:dev@inblox.me), or follow us on twitter, [https://twitter.com/inblox_me](https://twitter.com/inblox_me)