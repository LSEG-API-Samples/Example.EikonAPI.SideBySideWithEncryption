# Refinitiv Side By Side Sample With Encryption

This simple web application demonstrates how to securely integrate with Refinitiv Eikon via SxS API

### Prerequisite
- Valid Refinitiv Eikon credential

### Getting start
1. Login Eikon, then enter "cpurl://apps.cp./apps/appkeygenerator" in Eikon toolbar search
2. Register new SxS application
3. Make sure you have 'Product ID' and 'API Key' come in handy.
4. Follow these steps below

```
# Clone this repo
$ git clone https://github.com/TR-API-Samples/Example.EikonAPI.SideBySideWithEncryption.git

# Go into the repository
$ cd SideBySideSamplesForCustomer
```

#### To run the simple app

- just simply open index.html under simple folder with your browser

#### To run the secure app, please follow these steps below


```
# Go into the secure folder
$ cd secure

# Install the dependencies
$ npm install 

# Build library
$ npm run build

# Run
$ npm run start
```
