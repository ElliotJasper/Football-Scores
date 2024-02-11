For this application to work you will need
- MongoDB atlas
- Stripe key
- Stripe endpoint secret

Firstly, create a dotenv file in the root of the football-scores directory. You will need a a:
- A MongoDB password named PASSWORD.
- A session secret named whatever you want called SESSION_SECRET.
- A stripe test secret key name STRIPE_KEY.
- A stripe public key named STRIPE_PUBLIC_KEY.
- A port number named PORT.
- A stripe endpoint secret named STRIPE_ENDPOINT_SECRET.

Now make sure you are in the football scores directory, and run the file index.js using node or nodemon.
Next, in another terminal, cd into ./react/lastmanstanding, and run the react setup using npm start.
