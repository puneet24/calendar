# Harbor Take Home Project

Welcome to the Harbor take home project. We hope this is a good opportunity for you to showcase your skills.

## The Challenge

Build us a REST API for calendly. Remember to support

- Setting own availability
- Showing own availability
- Finding overlap in schedule between 2 users

It is up to you what else to support.

## Expectations

We care about

- Have you thought through what a good MVP looks like? Does your API support that?

**According to me Good MVP for calendly APP:**
1. Book any type of event 1:1, 1:many, reminders [Supported]
2. Book recurring events with no limitation on rule [Supported]
3. Update event before meeting starts (Both recurring & No recurring) [Supported]
4. Setting up the availibility (should be able to customize for specific date) [Supported]
5. Updating the availibility in calendar [Supported]
6. Set Timezone in calendar [Supported]
7. Add status to event like (Accept, Decline, Maybe) [NotSupported]
8. Set notification alert setting for event reminders [NotSupported]

- What trade-offs are you making in your design?

**For recurring events, some end date is necessary for notification service if extension is done**

- Working code - we should be able to pull and hit the code locally. Bonus points if deployed somewhere.

**Application is deployed on AWS & this is swagger link (http://ec2-54-89-71-237.compute-1.amazonaws.com/docs#/)**

- Any good engineer will make hacks when necessary - what are your hacks and why?

We don't care about

- Authentication [Supported]
- UI
- Perfection - good and working quickly is better

It is up to you how much time you want to spend on this project. There are likely diminishing returns as the time spent goes up.

## Submission

Please fork this repository and reach out to Prakash when finished.

## Next Steps

After submission, we will conduct a 30 to 60 minute code review in person. We will ask you about your thinking and design choices.

## Quick run

```bash
cd calendly-app/
cp env-example .env
docker compose up -d
```

For check status run

```bash
docker compose logs
```

## Comfortable development

```bash
cd calendly-app/
cp env-example .env
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run additional container:

```bash
docker compose up -d postgres adminer maildev
```

```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

## Links

- Swagger: http://localhost:3000/docs
- Adminer (client for DB): http://localhost:8080
- Maildev: http://localhost:1080

## Automatic update of dependencies

If you want to automatically update dependencies, you can connect [Renovate](https://github.com/marketplace/renovate) for your project.

## Database utils

Generate migration

```bash
npm run migration:generate -- src/database/migrations/CreateNameTable 
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Tests in Docker

```bash
docker compose -f docker-compose.ci.yaml --env-file env-example -p ci up --build --exit-code-from api && docker compose -p ci rm -svf
```

## Test benchmarking

```bash
docker run --rm jordi/ab -n 100 -c 100 -T application/json -H "Authorization: Bearer USER_TOKEN" -v 2 http://<server_ip>:3000/api/v1/users
```
