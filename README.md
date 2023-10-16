<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://github.com/hive-one/calcom">
   <img src="https://user-images.githubusercontent.com/8019099/210054112-5955e812-a76e-4160-9ddd-58f2c72f1cce.png" alt="Logo">
  </a>

  <h3 align="center">Borg ID (Forked from cal.com - We expect not to maintain feature parity)</h3>

  <p align="center">
    The open-source platform for discovering and speaking with experts.
    <br />
    <a href="https://borg.id"><strong>Learn more »</strong></a>
    <br />
    <br />    ·
    <a href="https://borg.id">Website</a>
    ·
    <a href="https://github.com/hive-one/calcom/issues">Issues</a>
    ·
  </p>
</p>

<p align="center">
   <a href="https://status.borg.id"><img height="20px" src="https://betteruptime.com/status-badges/v1/monitor/a9kf.svg" alt="Uptime"></a>
   <a href="https://github.com/hive-one/calcom/stargazers"><img src="https://img.shields.io/github/stars/calcom/borg.id" alt="Github Stars"></a>
   <a href="https://github.com/hive-one/calcom/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-purple" alt="License"></a>
   <a href="https://github.com/hive-one/calcom/pulse"><img src="https://img.shields.io/github/commit-activity/m/calcom/borg.id" alt="Commits-per-month"></a>
   <a href="https://github.com/hive-one/calcom/issues?q=is:issue+is:open+label:%22%F0%9F%99%8B%F0%9F%8F%BB%E2%80%8D%E2%99%82%EF%B8%8Fhelp+wanted%22"><img src="https://img.shields.io/badge/Help%20Wanted-Contribute-blue"></a>
   <a href="https://contributor-covenant.org/version/1/4/code-of-conduct/ "><img src="https://img.shields.io/badge/Contributor%20Covenant-1.4-purple" /></a>
</p>

<!-- ABOUT THE PROJECT -->

## About the Project

<img width="100%" alt="booking-screen" src="https://github.com/hive-one/calcom/assets/8019099/407e727e-ff19-4ca4-bcae-049dca05cf02">

# The open-source platform for discovering and speaking with experts

The open source expert network. You are in charge
of your own data, workflow, and appearance.


### Built With

- [Next.js](https://nextjs.org/?ref=borg.id)
- [tRPC](https://trpc.io/?ref=borg.id)
- [React.js](https://reactjs.org/?ref=borg.id)
- [Tailwind CSS](https://tailwindcss.com/?ref=borg.id)
- [Prisma.io](https://prisma.io/?ref=borg.id)
- [Cal.com](https://cal.com)


<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need to be able to run borg.id.

- Node.js (Version: >=18.x)
- PostgreSQL
- Yarn _(recommended)_

> If you want to enable any of the available integrations, you may want to obtain additional credentials for each one. More details on this can be found below under the [integrations section](#integrations).

## Development

### Setup

1. Clone the repo into a public GitHub repository (or fork https://github.com/hive-one/calcom/fork). If you plan to distribute the code, keep the source code public to comply with [AGPLv3](https://github.com/hive-one/calcom/blob/main/LICENSE). To clone in a private repository, [acquire a commercial license](https://cal.com/sales))

   ```sh
   git clone https://github.com/hive-one/calcom.git
   ```

   > If you are on Windows, run the following command on `gitbash` with admin privileges: <br> > `git clone -c core.symlinks=true https://github.com/hive-one/calcom.git` <br>
   > See [docs](https://borg.id/docs/how-to-guides/how-to-troubleshoot-symbolic-link-issues-on-windows#enable-symbolic-links) for more details.

1. Go to the project folder

   ```sh
   cd borg.id
   ```

1. Install packages with yarn

   ```sh
   yarn
   ```

1. Set up your `.env` file
   - Duplicate `.env.example` to `.env`
   - Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the `.env` file.
   - Use `openssl rand -base64 24` to generate a key and add it under `CALENDSO_ENCRYPTION_KEY` in the `.env` file.

#### Quick start with `yarn dx`

> - **Requires Docker and Docker Compose to be installed**
> - Will start a local Postgres instance with a few test users - the credentials will be logged in the console

```sh
yarn dx
```

#### Development tip

> Add `NEXT_PUBLIC_DEBUG=1` anywhere in your `.env` to get logging information for all the queries and mutations driven by **tRPC**.

```sh
echo 'NEXT_PUBLIC_DEBUG=1' >> .env
```

#### Gitpod Setup

1. Click the button below to open this project in Gitpod.

2. This will open a fully configured workspace in your browser with all the necessary dependencies already installed.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/hive-one/calcom)

#### Manual setup

1. Configure environment variables in the `.env` file. Replace `<user>`, `<pass>`, `<db-host>`, and `<db-port>` with their applicable values

   ```
   DATABASE_URL='postgresql://<user>:<pass>@<db-host>:<db-port>'
   ```

   <details>
   <summary>If you don't know how to configure the DATABASE_URL, then follow the steps here to create a quick local DB</summary>

   1. [Download](https://www.postgresql.org/download/) and install postgres in your local (if you don't have it already).

   2. Create your own local db by executing `createDB <DB name>`

   3. Now open your psql shell with the DB you created: `psql -h localhost -U postgres -d <DB name>`

   4. Inside the psql shell execute `\conninfo`. And you will get the following info.  
      ![image](https://user-images.githubusercontent.com/39329182/236612291-51d87f69-6dc1-4a23-bf4d-1ca1754e0a35.png)

   5. Now extract all the info and add it to your DATABASE_URL. The url would look something like this
      `postgresql://postgres:postgres@localhost:5432/Your-DB-Name`.

   </details>

   If you don't want to create a local DB. Then you can also consider using services like railway.app or render.

   - [Setup postgres DB with railway.app](https://arctype.com/postgres/setup/railway-postgres)
   - [Setup postgres DB with render](https://render.com/docs/databases)

1. Copy and paste your `DATABASE_URL` from `.env` to `.env.appStore`.

1. Set a 32 character random string in your `.env` file for the `CALENDSO_ENCRYPTION_KEY` (You can use a command like `openssl rand -base64 24` to generate one).
1. Set up the database using the Prisma schema (found in `packages/prisma/schema.prisma`)

   In a development environment, run:

   ```sh
   yarn workspace @calcom/prisma db-migrate
   ```

   In a production environment, run:

   ```sh
   yarn workspace @calcom/prisma db-deploy
   ```

1. Run [mailhog](https://github.com/mailhog/MailHog) to view emails sent during development
   > **_NOTE:_** Required when `E2E_TEST_MAILHOG_ENABLED` is "1"

   ```sh
   docker pull mailhog/mailhog
   docker run -d -p 8025:8025 -p 1025:1025 mailhog/mailhog
   ```

1. Run (in development mode)

   ```sh
   yarn dev
   ```

#### Setting up your first user

1. Open [Prisma Studio](https://prisma.io/studio) to look at or modify the database content:

   ```sh
   yarn db-studio
   ```

1. Click on the `User` model to add a new user record.
1. Fill out the fields `email`, `username`, `password`, and set `metadata` to empty `{}` (remembering to encrypt your password with [BCrypt](https://bcrypt-generator.com/)) and click `Save 1 Record` to create your first user.
   > New users are set on a `TRIAL` plan by default. You might want to adjust this behavior to your needs in the `packages/prisma/schema.prisma` file.
1. Open a browser to [http://localhost:3000](http://localhost:3000) and login with your just created, first user.

### E2E-Testing

Be sure to set the environment variable `NEXTAUTH_URL` to the correct value. If you are running locally, as the documentation within `.env.example` mentions, the value should be `http://localhost:3000`.

```sh
# In a terminal just run:
yarn test-e2e

# To open the last HTML report run:
yarn playwright show-report test-results/reports/playwright-html-report
```

### Upgrading from earlier versions

1. Pull the current version:

   ```sh
   git pull
   ```

1. Check if dependencies got added/updated/removed

   ```sh
   yarn
   ```

1. Apply database migrations by running <b>one of</b> the following commands:

   In a development environment, run:

   ```sh
   yarn workspace @calcom/prisma db-migrate
   ```

   (This can clear your development database in some cases)

   In a production environment, run:

   ```sh
   yarn workspace @calcom/prisma db-deploy
   ```

1. Check for `.env` variables changes

   ```sh
   yarn predev
   ```

1. Start the server. In a development environment, just do:

   ```sh
   yarn dev
   ```

   For a production build, run for example:

   ```sh
   yarn build
   yarn start
   ```

1. Enjoy the new version.
<!-- DEPLOYMENT -->

## Deployment

### Docker

The Docker configuration for borg.id is an effort powered by people within the community.

If you want to contribute to the Docker repository, [reply here](https://github.com/calcom/docker/discussions/32).

The Docker configuration can be found [in our docker repository](https://github.com/calcom/docker).

Issues with Docker? Find your answer or open a new discussion [here](https://github.com/calcom/docker/discussions) to ask the community.

borg.id, Inc. does not provide official support for Docker, but we will accept fixes and documentation. Use at your own risk.

### Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/cal)

You can deploy borg.id on [Railway](https://railway.app) using the button above. The team at Railway also have a [detailed blog post](https://blog.railway.app/p/calendso) on deploying borg.id on their platform.

### Vercel

Currently Vercel Pro Plan is required to be able to Deploy this application with Vercel, due to limitations on the number of serverless functions on the free plan.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcalcom%2Fborg.id&env=DATABASE_URL,NEXT_PUBLIC_WEBAPP_URL,NEXTAUTH_URL,NEXTAUTH_SECRET,CRON_API_KEY,CALENDSO_ENCRYPTION_KEY&envDescription=See%20all%20available%20env%20vars&envLink=https%3A%2F%2Fgithub.com%2Fcalcom%2Fborg.id%2Fblob%2Fmain%2F.env.example&project-name=cal&repo-name=borg.id&build-command=cd%20../..%20%26%26%20yarn%20build&root-directory=apps%2Fweb%2F)

### Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/calcom/docker)

<!-- ROADMAP -->

## Roadmap

<a href="https://borg.id/roadmap"><img src="https://user-images.githubusercontent.com/8019099/176388295-25081ca4-207e-4468-8079-37b195fa8e59.png" alt="borg.id Roadmap" /></a>

See the [roadmap project](https://borg.id/roadmap) for a list of proposed features (and known issues). You can change the view to see planned tagged releases.

<!-- RORADMAP -->

## Repo Activity

<img width="100%" src="https://repobeats.axiom.co/api/embed/6bfca2f20f39738048b6e70ca205efde46352c3d.svg" />

<!-- CONTRIBUTING -->

## Contributing

Please see our [contributing guide](/CONTRIBUTING.md).

### Good First Issues

We have a list of [help wanted](https://github.com/hive-one/calcom/issues?q=is:issue+is:open+label:%22%F0%9F%99%8B%F0%9F%8F%BB%E2%80%8D%E2%99%82%EF%B8%8Fhelp+wanted%22) that contain small features and bugs which have a relatively limited scope. This is a great place to get started, gain experience, and get familiar with our contribution process.

<!-- BOUNTIES -->

### Bounties

<a href="https://console.algora.io/org/cal/bounties?status=open">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://console.algora.io/api/og/cal/bounties.png?p=0&status=open&theme=dark">
    <img alt="Bounties of cal" src="https://console.algora.io/api/og/cal/bounties.png?p=0&status=open&theme=light">
  </picture>
</a>

<!-- CONTRIBUTORS -->

### Contributors

<a href="https://github.com/hive-one/calcom/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=calcom/borg.id" />
</a>

<!-- TRANSLATIONS -->

### Translations

![ar translation](https://img.shields.io/badge/dynamic/json?color=blue&label=ar&style=flat&logo=crowdin&query=%24.progress.0.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![bg translation](https://img.shields.io/badge/dynamic/json?color=blue&label=bg&style=flat&logo=crowdin&query=%24.progress.1.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![cs translation](https://img.shields.io/badge/dynamic/json?color=blue&label=cs&style=flat&logo=crowdin&query=%24.progress.2.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![de translation](https://img.shields.io/badge/dynamic/json?color=blue&label=de&style=flat&logo=crowdin&query=%24.progress.3.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![el translation](https://img.shields.io/badge/dynamic/json?color=blue&label=el&style=flat&logo=crowdin&query=%24.progress.4.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![en translation](https://img.shields.io/badge/dynamic/json?color=blue&label=en&style=flat&logo=crowdin&query=%24.progress.5.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![es translation](https://img.shields.io/badge/dynamic/json?color=blue&label=es&style=flat&logo=crowdin&query=%24.progress.6.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![es-419 translation](https://img.shields.io/badge/dynamic/json?color=blue&label=es-419&style=flat&logo=crowdin&query=%24.progress.7.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![fr translation](https://img.shields.io/badge/dynamic/json?color=blue&label=fr&style=flat&logo=crowdin&query=%24.progress.8.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![he translation](https://img.shields.io/badge/dynamic/json?color=blue&label=he&style=flat&logo=crowdin&query=%24.progress.9.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![hu translation](https://img.shields.io/badge/dynamic/json?color=blue&label=hu&style=flat&logo=crowdin&query=%24.progress.10.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![it translation](https://img.shields.io/badge/dynamic/json?color=blue&label=it&style=flat&logo=crowdin&query=%24.progress.11.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![ja translation](https://img.shields.io/badge/dynamic/json?color=blue&label=ja&style=flat&logo=crowdin&query=%24.progress.12.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![ko translation](https://img.shields.io/badge/dynamic/json?color=blue&label=ko&style=flat&logo=crowdin&query=%24.progress.13.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![nl translation](https://img.shields.io/badge/dynamic/json?color=blue&label=nl&style=flat&logo=crowdin&query=%24.progress.14.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![no translation](https://img.shields.io/badge/dynamic/json?color=blue&label=no&style=flat&logo=crowdin&query=%24.progress.15.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![pl translation](https://img.shields.io/badge/dynamic/json?color=blue&label=pl&style=flat&logo=crowdin&query=%24.progress.16.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![pt translation](https://img.shields.io/badge/dynamic/json?color=blue&label=pt&style=flat&logo=crowdin&query=%24.progress.17.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![pt-BR translation](https://img.shields.io/badge/dynamic/json?color=blue&label=pt-BR&style=flat&logo=crowdin&query=%24.progress.18.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![ro translation](https://img.shields.io/badge/dynamic/json?color=blue&label=ro&style=flat&logo=crowdin&query=%24.progress.19.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![ru translation](https://img.shields.io/badge/dynamic/json?color=blue&label=ru&style=flat&logo=crowdin&query=%24.progress.20.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![sr translation](https://img.shields.io/badge/dynamic/json?color=blue&label=sr&style=flat&logo=crowdin&query=%24.progress.21.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![sv translation](https://img.shields.io/badge/dynamic/json?color=blue&label=sv&style=flat&logo=crowdin&query=%24.progress.22.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![tr translation](https://img.shields.io/badge/dynamic/json?color=blue&label=tr&style=flat&logo=crowdin&query=%24.progress.23.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![uk translation](https://img.shields.io/badge/dynamic/json?color=blue&label=uk&style=flat&logo=crowdin&query=%24.progress.24.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![vi translation](https://img.shields.io/badge/dynamic/json?color=blue&label=vi&style=flat&logo=crowdin&query=%24.progress.25.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![zh-CN translation](https://img.shields.io/badge/dynamic/json?color=blue&label=zh-CN&style=flat&logo=crowdin&query=%24.progress.26.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json) ![zh-TW translation](https://img.shields.io/badge/dynamic/json?color=blue&label=zh-TW&style=flat&logo=crowdin&query=%24.progress.27.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-200011276-1.json)

## Enabling Content Security Policy

- Set CSP_POLICY="non-strict" env variable, which enables [Strict CSP](https://web.dev/strict-csp/) except for unsafe-inline in style-src . If you have some custom changes in your instance, you might have to make some code change to make your instance CSP compatible. Right now it enables strict CSP only on login page and on other SSR pages it is enabled in Report only mode to detect possible issues. On, SSG pages it is still not supported.

## Integrations

### Obtaining the Google API Credentials

1. Open [Google API Console](https://console.cloud.google.com/apis/dashboard). If you don't have a project in your Google Cloud subscription, you'll need to create one before proceeding further. Under Dashboard pane, select Enable APIS and Services.
2. In the search box, type calendar and select the Google Calendar API search result.
3. Enable the selected API.
4. Next, go to the [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent) from the side pane. Select the app type (Internal or External) and enter the basic app details on the first page.
5. In the second page on Scopes, select Add or Remove Scopes. Search for Calendar.event and select the scope with scope value `.../auth/calendar.events`, `.../auth/calendar.readonly` and select Update.
6. In the third page (Test Users), add the Google account(s) you'll using. Make sure the details are correct on the last page of the wizard and your consent screen will be configured.
7. Now select [Credentials](https://console.cloud.google.com/apis/credentials) from the side pane and then select Create Credentials. Select the OAuth Client ID option.
8. Select Web Application as the Application Type.
9. Under Authorized redirect URI's, select Add URI and then add the URI `<borg.id URL>/api/integrations/googlecalendar/callback` and `<borg.id URL>/api/auth/callback/google` replacing borg.id URL with the URI at which your application runs.
10. The key will be created and you will be redirected back to the Credentials page. Select the newly generated client ID under OAuth 2.0 Client IDs.
11. Select Download JSON. Copy the contents of this file and paste the entire JSON string in the `.env` file as the value for `GOOGLE_API_CREDENTIALS` key.

#### _Adding google calendar to borg.id App Store_

After adding Google credentials, you can now Google Calendar App to the app store.
You can repopulate the App store by running

```
cd packages/prisma
yarn seed-app-store
```

You will need to complete a few more steps to activate Google Calendar App.
Make sure to complete section "Obtaining the Google API Credentials". After that do the
following

1. Add extra redirect URL `<borg.id URL>/api/auth/callback/google`
1. Under 'OAuth consent screen', click "PUBLISH APP"

### Obtaining Microsoft Graph Client ID and Secret

1. Open [Azure App Registration](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) and select New registration
2. Name your application
3. Set **Who can use this application or access this API?** to **Accounts in any organizational directory (Any Azure AD directory - Multitenant)**
4. Set the **Web** redirect URI to `<borg.id URL>/api/integrations/office365calendar/callback` replacing borg.id URL with the URI at which your application runs.
5. Use **Application (client) ID** as the **MS_GRAPH_CLIENT_ID** attribute value in .env
6. Click **Certificates & secrets** create a new client secret and use the value as the **MS_GRAPH_CLIENT_SECRET** attribute

### Obtaining Zoom Client ID and Secret

1. Open [Zoom Marketplace](https://marketplace.zoom.us/) and sign in with your Zoom account.
2. On the upper right, click "Develop" => "Build App".
3. On "OAuth", select "Create".
4. Name your App.
5. Choose "User-managed app" as the app type.
6. De-select the option to publish the app on the Zoom App Marketplace.
7. Click "Create".
8. Now copy the Client ID and Client Secret to your `.env` file into the `ZOOM_CLIENT_ID` and `ZOOM_CLIENT_SECRET` fields.
9. Set the Redirect URL for OAuth `<borg.id URL>/api/integrations/zoomvideo/callback` replacing borg.id URL with the URI at which your application runs.
10. Also add the redirect URL given above as an allow list URL and enable "Subdomain check". Make sure, it says "saved" below the form.
11. You don't need to provide basic information about your app. Instead click on "Scopes" and then on "+ Add Scopes". On the left, click the category "Meeting" and check the scope `meeting:write`.
12. Click "Done".
13. You're good to go. Now you can easily add your Zoom integration in the borg.id settings.

### Obtaining Daily API Credentials

1. Visit our [Daily.co Partnership Form](https://go.borg.id/daily) and enter your information
2. From within your dashboard, go to the [developers](https://dashboard.daily.co/developers) tab.
3. Copy your API key.
4. Now paste the API key to your `.env` file into the `DAILY_API_KEY` field in your `.env` file.
5. If you have the [Daily Scale Plan](https://daily.co/pricing) set the `DAILY_SCALE_PLAN` variable to `true` in order to use features like video recording.

### Obtaining Basecamp Client ID and Secret

1. Visit the [37 Signals Integrations Dashboard](launchpad.37signals.com/integrations) and sign in.
2. Register a new application by clicking the Register one now link.
3. Fill in your company details.
4. Select Basecamp 4 as the product to integrate with.
5. Set the Redirect URL for OAuth `<borg.id URL>/api/integrations/basecamp3/callback` replacing borg.id URL with the URI at which your application runs.
6. Click on done and copy the Client ID and secret into the `BASECAMP3_CLIENT_ID` and `BASECAMP3_CLIENT_SECRET` fields.
7. Set the `BASECAMP3_CLIENT_SECRET` env variable to `{your_domain} ({support_email})`. 
For example, `borg.id (support@borg.id)`.


### Obtaining HubSpot Client ID and Secret

1. Open [HubSpot Developer](https://developer.hubspot.com/) and sign into your account, or create a new one.
2. From within the home of the Developer account page, go to "Manage apps".
3. Click "Create app" button top right.
4. Fill in any information you want in the "App info" tab
5. Go to tab "Auth"
6. Now copy the Client ID and Client Secret to your `.env` file into the `HUBSPOT_CLIENT_ID` and `HUBSPOT_CLIENT_SECRET` fields.
7. Set the Redirect URL for OAuth `<borg.id URL>/api/integrations/hubspot/callback` replacing borg.id URL with the URI at which your application runs.
8. In the "Scopes" section at the bottom of the page, make sure you select "Read" and "Write" for scope called `crm.objects.contacts`
9. Click the "Save" button at the bottom footer.
10. You're good to go. Now you can see any booking in borg.id created as a meeting in HubSpot for your contacts.

### Obtaining Webex Client ID and Secret

[See Webex Readme](./packages/app-store/webex/)

### Obtaining ZohoCRM Client ID and Secret

1. Open [Zoho API Console](https://api-console.zoho.com/) and sign into your account, or create a new one.
2. From within the API console page, go to "Applications".
3. Click "ADD CLIENT" button top right and select "Server-based Applications".
4. Fill in any information you want in the "Client Details" tab
5. Go to tab "Client Secret" tab.
6. Now copy the Client ID and Client Secret to your `.env` file into the `ZOHOCRM_CLIENT_ID` and `ZOHOCRM_CLIENT_SECRET` fields.
7. Set the Redirect URL for OAuth `<borg.id URL>/api/integrations/zohocrm/callback` replacing borg.id URL with the URI at which your application runs.
8. In the "Settings" section check the "Multi-DC" option if you wish to use the same OAuth credentials for all data centers.
9. Click the "Save"/ "UPDATE" button at the bottom footer.
10. You're good to go. Now you can easily add your ZohoCRM integration in the borg.id settings.

### Obtaining Zoho Bigin Client ID and Secret

[Follow these steps](./packages/app-store/zoho-bigin/)

## Workflows

### Setting up SendGrid for Email reminders

1. Create a SendGrid account (https://signup.sendgrid.com/)
2. Go to Settings -> API keys and create an API key
3. Copy API key to your `.env` file into the `SENDGRID_API_KEY` field
4. Go to Settings -> Sender Authentication and verify a single sender
5. Copy the verified E-Mail to your `.env` file into the `SENDGRID_EMAIL` field
6. Add your custom sender name to the `.env` file into the `NEXT_PUBLIC_SENDGRID_SENDER_NAME` field (fallback is borg.id)

### Setting up Twilio for SMS reminders

1. Create a Twilio account (https://twilio.com/try-twilio)
2. Click ‘Get a Twilio phone number’
3. Copy Account SID to your `.env` file into the `TWILIO_SID` field
4. Copy Auth Token to your `.env` file into the `TWILIO_TOKEN` field
5. Copy your Twilio phone number to your `.env` file into the `TWILIO_PHONE_NUMBER` field
6. Add your own sender ID to the `.env` file into the `NEXT_PUBLIC_SENDER_ID` field (fallback is borg.id)
7. Create a messaging service (Develop -> Messaging -> Services)
8. Choose any name for the messaging service
9. Click 'Add Senders'
10. Choose phone number as sender type
11. Add the listed phone number
12. Leave all other fields as they are
13. Complete setup and click ‘View my new Messaging Service’
14. Copy Messaging Service SID to your `.env` file into the `TWILIO_MESSAGING_SID` field
15. Create a verify service
16. Copy Verify Service SID to your `.env` file into the `TWILIO_VERIFY_SID` field

<!-- LICENSE -->

## License

Distributed under the [AGPLv3 License](https://github.com/hive-one/calcom/blob/main/LICENSE). See `LICENSE` for more information.

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

Special thanks to these amazing projects which help power borg.id:

- [Cal.com](https://cal.com/?utm_source=borg.id)
- [Vercel](https://vercel.com/?utm_source=borg.id-so&utm_campaign=oss)
- [Next.js](https://nextjs.org/)
- [Day.js](https://day.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://prisma.io/)

[Jitsu](https://github.com/jitsucom/jitsu) (an open-source Segment alternative) helps us to track most of the usage metrics.
