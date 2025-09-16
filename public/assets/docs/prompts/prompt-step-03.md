## LAB STEP CONTEXT
- Lab Step: `step-03`
- Lab Guide Name: `get-auth0-configured`
- Implementation Code:
  - `.env`

Reference snippet `.env` applicable to this step:
```dotenv
# .env
# ========== Auth0 ==========
# Auth0 tenant domain (*without* https://)
# AUTH0_DOMAIN=

# Client ID for your lab app
# AUTH0_CLIENT_ID=

# Normally secrets should go in .env.local, but for the sake of the lab
# we are including them here so you only have one file to edit.
# AUTH0_CLIENT_SECRET=

# A session secret (generate one yourself!)
# openssl rand -base64 32
# AUTH0_SECRET=
# =================================================
```

Expected Outcome:
- Running application at `http://localhost:3000`
- User can authenticate.