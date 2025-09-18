## LAB STEP CONTEXT
- Lab Step: `step-03`
- Lab Guide Name: `get-auth0-configured`
- Static Aiya response auto-sent: `aiya-post-auth`
- Implementation Code:
  - `.env`

Reference snippet `.env` applicable to this step:
```env
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

Completion Criteria:
- [x] User successfully authenticated.
- [x] 'Successfully authenticated' message sent.