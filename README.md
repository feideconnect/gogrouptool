# LDAP Test utility


Prepare app for usage:

	select status, scopes, scopes_requested from clients where id = 01a2c2ea-a888-48d4-bb8f-1ed81d1cde5b;
	SELECT id, status, name,scopes,scopes_requested FROM clients WHERE id =  c148bc3f-6b15-47d7-ad23-3c36677eb8b5;
	UPDATE clients set status = {'Mandatory'} where id =  c148bc3f-6b15-47d7-ad23-3c36677eb8b5;


To get a token go to:

	https://auth.feideconnect.no/oauth/authorization?response_type=token&client_id=01a2c2ea-a888-48d4-bb8f-1ed81d1cde5b


Set token in an environment variable:

	export TOKEN=XXXXXXX


Run verifications of LDAP entitlement using Extended user info API:

	node index

Run VOOT group listing

	node voot







