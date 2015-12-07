# LDAP Test utility


To use this client, you will need to register a client with the sufficient scopes. Use the client ID in the authorization url below:


Dependencies

	npm install

To get a token go to:

	https://auth.feideconnect.no/oauth/authorization?response_type=token&client_id=01a2c2ea-a888-48d4-bb8f-1ed81d1cde5b

Set token in an environment variable:

	export TOKEN=XXXXXXX


Run verifications of LDAP entitlement using Extended user info API:

	node index

Run VOOT group listing

	node voot


