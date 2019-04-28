# Stock-Chart

> Project description

## Related Projects

  - https://github.com/stock-it/buysell
  - https://github.com/stock-it/earnings
  - Placeholder: last team member

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
1. [CRUD Routes](#crud-routes)


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 8.15.0

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
npm run build
npm run generate
npm run seed:postgres
npm run start:server
```

## CRUD Routes

The stock-chart module supports CRUD operations to the two main data sources it uses to support its operations:

| Data Source             | Sub-fields                                    | Base API                 |
|-----------------------|:----------------------------------------------|:----------------:|
| Ticker Information      | Company name, Average price, owners, etc.     | /api/stocks/:stockId  |
| Price Quotes            | Time-stamped price quotes across set intervals| /api/quotes/:stockId |

The CRUD operations supported for each data source are below:

### Ticker Information

| CRUD Operation | API | Notes |
|----------------|:---:| ----- |
| CREATE | /api/stocks| |
| READ | /stocks/:stockId | |
| UPDATE | /api/stocks/:stockId| |
| DELETE | /api/stocks/:stockId| |

### Price Quotes

| CRUD Operation | API | Notes |
|----------------|:---:| ----- |
| CREATE | /api/quotes| |
| READ | /api/quotes/:stockId/:label | If a specific time-interval (e.g., daily, weekly, monthly) can be dropped from the endpoint and all quotes will be returned|
| UPDATE | /api/quotes/:stockId/:quoteId| If a specific quoteId is not desired, /:quoteId can be dropped from the path|
| DELETE | /api/quotes/:stockId/:quoteId| If a specific quoteId is not desired, /:quoteId can be dropped from the api route|



