# Organizations feature

From the [Original RFC](https://github.com/hive-one/calcom/issues/7142):

> We want to create organisations within Cal.com to enable people to easily and effectively manage multiple teams. An organisation will live above the current teams layer.

## App setup

 1. Log in as admin and in Settings, turn on Organizations feature flag under Features section. Organizations feature has an operational feature flag in order to turn on the entire feature.

 2. Set the following environment variables as described:
    1. **`CALCOM_LICENSE_KEY`**: Since Organizations is an EE feature, a license key should be present, either as this environment variable or visiting as an Admin `/auth/setup`. To get a license key you should visit Cal Console ([prod](https://console.cal.com) or [dev](https://console.cal.dev))
    2. **`NEXT_PUBLIC_WEBAPP_URL`**: In case of local development, this variable should be set to `https://app.cal.local:3000` to be able to handle subdomains correctly in terms of authentication and cookies
    3. **`NEXTAUTH_URL`**: Should be equal to `NEXT_PUBLIC_WEBAPP_URL` which is `https://app.cal.local:3000`
    4. **`NEXTAUTH_COOKIE_DOMAIN`**: In case of local development, this variable should be set to `.cal.local` to be able to accept session cookies in subdomains as well otherwise it should be set to the corresponding environment such as `.cal.dev`, `.cal.qa` or `.cal.com`. If you choose another subdomain, the value for this should match the apex domain of `NEXT_PUBLIC_WEBAPP_URL` with a leading dot (`.`)
    5. **`ORGANIZATIONS_ENABLED`**: Should be set to `1` or `true`
    6. **`STRIPE_ORG_MONTHLY_PRICE_ID`**: For dev and all testing should be set to your own testing key. Or ask for the shared key if you're a core member.
    7. **`ORGANIZATIONS_AUTOLINK`**: Optional. Set to `1` or `true` to let new signed-up users using Google external provider join the corresponding organization based on the email domain name.

 3. Add `app.cal.local` to your host file, either:  
    1. `sudo npx hostile app.cal.local`  
    2. Add it yourself

 4. Add `acme.cal.local` to host file given that the org create for it will be `acme`, otherwise do this for whatever slug will be assigned to the org. This is needed to test org-related public URLs, such as sub-teams, members and event-types.

 5. Be sure to be logged in with any type of user and visit `/settings/organizations/new` and follow setup steps with the slug matching the org slug from step 3

 6. Log in as admin and go to Settings and under Organizations you will need to accept the newly created organization in order to be operational

 7. After finishing the org creation, you will be automatically logged in as the owner of the organization, and the app will be shown in organization mode

## DNS setup

When a new organization is created, other than not being verified up until the admin accepts it in settings as explained in step 6, a flag gets created that marks the organization as missing DNS setup. That flag get auto-checked by the system upon organization creation when the Cal instance is deployed in Vercel and the subdomain registration was successful. Logging in as admin and going to Settings > Organizations section, you will see that flag as a badge, designed to give admins a glimpe on what is pending in terms of making an organization work. Alongside the mentioned badge, an email gets sent to admins in order to warn them there is a pending action about setting up DNS for the newly created organization to work.
