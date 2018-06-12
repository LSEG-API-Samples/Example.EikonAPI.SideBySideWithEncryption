# Encryption and Decryption process explanation

In this example, there are 2 libraries involve in encryption process
- [node-jose (v0.10.0)](https://github.com/cisco/node-jose.git)
- [buffer (v4.9.1)](https://github.com/feross/buffer.git)

## Encryption process

First, we need those above libraries. Add this scrip tag before the end of html tag

```HTML
<!-- this is a webpack generated file from combined node-jose and buffer -->
<script src="lib/encryption-tools.min.js"></script>
```

Now, we can access those libraries via global variable **lib**

```javascript
const jose   = lib.jose;
const Buffer = lib.Buffer;
```

Next, create an empty keystore:

```javascript
keystore = jose.JWK.createKeyStore();
```

Then, get public key by making a GET request to

```javascript
`http://127.0.0.1:${port}/sxs/s/v1/getPublicKey`
```

```
// a public key example
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgAuA2JA46xFCwweuUCC7
E0sLsGG5LbYj7KQIRpfgINWjIcSlpFlPJehV38NWOx3/9cerZkFt+oc8NbAGA0tt
EbM6BH02+7SACxMQdcvWCrm3CecVkiJegixXoalJdjYn8a26wTSGZ2WsjRjmLHLv
yI4ZCk6sbeAEfwk0MDJfQUaweRospayls+jasvWx0dn7A8phJWM4TctqGtfJwYDU
RVs+7niWndJ9WygK+tKyqfgDOvV7QwNSZlq9LmJn9D7KQ8wLb81Zf0zKvQptAWEB
rriVDGhTrwNKbl84VlMBQZzdedpa0I9gLOMt2PvRMmp/XrPJ+kLx4Bt6fCqSjkKS
gQIDAQAB
-----END PUBLIC KEY-----

```

After that, add the public key to the keystore
```javascript
const props = {
    kty: 'RSA',
    kid: 'SxSKey',
};
keystore.add(publicKey, 'pem', props);
```

Follow by, generating a new Key:

```javascript
// first argument is the key type (kty)
// second is the key size (in bits) or named curve ('crv') for "EC"
// We use different 'kid' to separate the public key from new generated key
const option = {
    kid: 'SxSDemoAppKey',
    alg: '',
    use: 'enc',
};
keystore.generate("RSA", 2048, option)
```

*You can find more details on '**kty**', '**kid**', '**alg**' and '**use**' on [this site](https://self-issued.info/docs/draft-ietf-jose-json-web-key.html#rfc.section.4)*


Now, we are ready to encrypt the data

```javascript
// turn our JSON data to Buffer
const input = new Buffer(rawData);
```

```javascript
// {input} is a Buffer
// You are free to pick format and algorithm of your choice
const options = {
    format: 'compact',
    contentAlg: 'A256GCM',
};
jose.JWE.createEncrypt(options, keystore.get('SxSKey'))
    .update(input)
    .final()
    .then((encryptedData) => encryptedData);
```

Finally, perform handshake with the encrypted data.
SxS API will return encrypted data.
It's time for decryption.

## Decryption process

Pass the encrypted data we received. When the decryption process complete, we will get decrypted data. Now, turn it to sring (it should be JSON string), parse it and so on.

```javascript
const key = keystore.get('SxSDemoAppKey')
jose.JWE.createDecrypt(key)
    .decrypt(encryptedData)
    .then(result => {
        // {result} is an Object with:
        // *  header: the combined 'protected' and 'unprotected' header members
        // *  protected: an array of the member names from the "protected" member
        // *  key: Key used to decrypt
        // *  payload: Buffer of the decrypted content
        // *  plaintext: Buffer of the decrypted content (alternate)
        result.plaintext.toString()
    });
```

