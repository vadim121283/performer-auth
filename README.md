# performer-auth

## Add auth keys

1. Install [openssl](https://code.google.com/archive/p/openssl-for-windows/downloads)
2. Generate private key: `openssl genrsa -out private.key 2048`
3. Generate public key: `openssl rsa -in private.key -outform PEM -pubout -out public.key`
