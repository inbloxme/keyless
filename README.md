# **Keyless Transactions - Inbloxme**

This package enables usage of inblox handlename infrastructure as a keyless signing mechanism.

> Disclaimer - This is WIP, and release in beta.

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

`npm install @inbloxme/keyless`

Import the package into your project using,

`const inblox = require('@inbloxme/keyless');`

## **Password Based Transaction Sign**

> Initialising

Initialise the constructor using,

`const keyless = new inblox.Keyless(apiKey, apiSecret, infuraKey);`


> Import wallet using Keystore JSON

This method can be used to import a wallet information using the keystore json and password as parameters.

`const wallet = inblox.importFromEncryptedJson(jsonData, password);`

`jsonData` - The JSON data of the keystore file. 
`password` - The password of the keystore file.


> Import wallet using Mnemonic phrase

This method can be used to import a wallet information using the 12 word seed phrase.

`const wallet = inblox.importFromMnemonic(mnemonic);`

`mnemonic` - The 12 word seed phrase.


> Import wallet using private key

This method can be used to import a wallet information using the private key.

`const wallet = inblox.importFromPrivateKey(privateKey);`

`privateKey` - The private key of the wallet. 


> Get User

This method can be used to sign a transaction using the user's private key. The transaction can be done using the provider as infura by inputting the infura key or the RPC URL.

`const getUser = keyless.getUser({ userName, password });`

`userName` - The Inblox username of the user. `password` - The Inblox password of the user.


> Sign Transaction

This method can be used to sign a transaction using the user's private key. The transaction can be done using the provider as infura by inputting the infura key or the RPC URL.

`const signedTx = keyless.signTransaction({ to, value, gasPrice, gasLimit, data, nonce, password });`

`to` (required) - THe address of the recepient.
`value` (required) - The amount to be sent.
`password` (required) - The Inblox password of the user.
`gasPrice` (optional) - The gas price.
`gasLimit` (optional) - Gas Limit.
`data` (optional) - Data.
`nonce` (optional) - Nonce.


> Send Transaction

This method can be used to sign a transaction using the user's private key. The transaction can be done using the provider as infura by inputting the infura key or the RPC URL.

`const sendTx = keyless.sendTx({ signedTx });`

`signedTx` (required) - Signed Transaction in string.


> Sign and send Transaction

This method can be used to sign a transaction using the user's private key. The transaction can be done using the provider as infura by inputting the infura key or the RPC URL.

`const signAndSendTx = keyless.signAndSendTx({ to, value, gasPrice, gasLimit, data, nonce, password });`

`to` (required) - THe address of the recepient.
`value` (required) - The amount to be sent.
`password` (required) - The Inblox password of the user.
`gasPrice` (optional) - The gas price.
`gasLimit` (optional) - Gas Limit.
`data` (optional) - Data.
`nonce` (optional) - Nonce.


## **WIP**

Want to contribute, we would ❤️ that!

We are a Global 🌏🌍🌎 team! 💪

Write to [dev@inblox.me](mailto:dev@inblox.me), or follow us on twitter, [https://twitter.com/inblox_me](https://twitter.com/inblox_me)
