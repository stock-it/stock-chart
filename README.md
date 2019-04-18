# Stock-Chart

> Project description

## Related Projects

  - https://github.com/stock-it/buysell
  - https://github.com/stock-it/earnings
  - Placeholder: last team member

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 8.15.0

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
npm run build
npm run dataGen
npm run seed
npm run start:server
```

## CRUD Routes

The stock-chart module supports CRUD operations to the two main data sources it uses to support its operations:

| Data Source             | Sub-fields                                    | Base API                 |
|-----------------------|:----------------------------------------------|:----------------:|
| Ticker Information      | Company name, Average price, owners, etc.     | /api/:stockId/info/CRUD  |
| Price Quotes            | Time-stamped price quotes across set intervals| /api/:stockId/quotes|

The CRUD operations supported for each data source are below:

### Ticker Information

| CRUD Operation | API | Notes |
|----------------|:---:| ----- |
| CREATE | /api/stocks/create| |
| READ | /api/:stockId | |
| UPDATE | /api/:stockId/:field| If a specific field is not desired, /:field can be dropped from the api route|
| DELETE | /api/stockId/: field| If a specific field is not desired, /:field can be dropped from the api route|

