# LDAP Test utility


Dependencies

```
npm install
```



To use this utility, you will need to register a client with the sufficient scopes. Use the client ID 7a259c12-ee5c-4588-882e-01b95d930f0b

To get a token go to:

```
c
```

Set token in an environment variable:

```
export TOKEN=XXXXXXX
```

Run verifications of LDAP entitlement using Extended user info API:

```
node index
```

Run VOOT group listing

```
node voot
```





Example output from LDAP entitlement checking:

```
...

Inspecting generic entitlement urn:mace:feide.no:go:groupid:b:NO974566176:KL_2015_2016_ITS_FRBO:2015-08-01:2016-06-30

Inspecting GO Group b::NO974566176:E_ITS:2015-08-01:2016-06-30::Elever%20ved%20It-Senteret
 1       Gruppe type b
 2         Grep kode
 3            Org nr NO974566176
 4         Gruppe ID E_ITS
 5        Dato start 2015-08-01
 6        Dato slutt 2016-06-30
 7             Rolle
 8  Beskrivende navn Elever ved It-Senteret
 [ OK   ]  MUST contain 4 or 8 items, contains 8
 [ OK   ]  Group type b MUST be one of [b, u, a]
 [ info ]  Grep code is
 [ OK   ]  Org nr NO974566176 MUST match /NO\d{9}/
 [ info ]  Group identifier (scope: skoleeier) E_ITS
 [ OK   ]  Dato fra 2015-08-01 MUST match /\d{4}-\d{2}-\d{2}/
 [Failed]  Role  MUST be one of ["student", "member", "faculty", "employee", "staff"]
 [ info ]  Beskrivende navn Elever ved It-Senteret
 [ OK   ]  GroupID urn:mace:feide.no:go:groupid:b:NO974566176:E_ITS:2015-08-01:2016-06-30 should be present

Inspecting GO Group a:NO974566176:12127044552:student:KontaktgruppeFRBO
 [ info ]  Skipping this, because it most likely is remaining from the group pilot. (exactly 5 elements detected)

...
```
