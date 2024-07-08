# Running the Project Manually

Create a `server/.env` file:

```
NOTION_SECRET=
NOTION_DATABASE_ID=
PORT=8000
```

## Run the server

From the `/server` directory:

```
yarn
yarn dev
```

## Run the app

From the `/sample-app` directory:

```
yarn
yarn start
```

Connect on [http://localhost:3000/]()

# Running the Project using Docker

Create a `server/.env` file:

```
NOTION_SECRET=
NOTION_DATABASE_ID=
PORT=8000
```

From root directory:

```
docker-compose up --build
```

# Features

- 1: Complete with Table View, Sorting, Rearrangement.
- 2b - compound filters: finish UI, but calling API is buggy in nested case. Need to enhance `toNotionFilters()` util.
- Stretch goals: all NOT operators are included for `rich_text` and `select`.

# Not-Implemented/Half-Done Features

- 2a: currently, only `rich_text` and `select` filters are implemented. Other filters can be added easily.
- 2c - unit tests: added template for test cases but not implemented.
