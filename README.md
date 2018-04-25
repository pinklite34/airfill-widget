# Airfill/Bitrefill Widget

![circleci](https://img.shields.io/circleci/project/github/bitrefill/airfill-widget.svg?maxAge=2592000)
![npm](https://img.shields.io/npm/dm/@bitrefill/airfill-widget.svg?maxAge=2592000)
![npm](https://img.shields.io/npm/v/@bitrefill/airfill-widget.svg?maxAge=2592000)

#### Get started

Runs on localhost:8000

```sh
$ git clone git@github.com:bitrefill/airfill-widget.git && cd airfill-widget
$ yarn
$ yarn start
```

#### Run tests

```sh
yarn test:watch
```

#### Build the production bundle

```sh
# build production bundles (standalone with dependencies bundled and npm bundle with no deps)
$ yarn build

# build standalone bundle with stats.json
$ yarn build standalone

# build npm bundle with no dps
$ yarn build dist
```

#### Run locally in production mode

```sh
$ yarn serve:dist
```

# Components

#### OperatorList

```javascript
import { OperatorList } from '@bitrefill/airfill-widget';
....
<OperatorList filter={["DTH", "VOIP"]}>
  {({ operators, setOperator }) =>
    operators.map(operator => (
      <p onClick={() => setOperator(operator)}>
        {operator.name}
      </p>
    )
  )}
</OperatorList>
```

#### Country

```javascript
import { Country } from '@bitrefill/airfill-widget';
....
<Country>
  {({country}) => <p>Current country is {country.name}</p>}
</Country>
```

#### CountryList

```javascript
import { CountryList } from '@bitrefill/airfill-widget';
....
<CountryList>
  {countryList => countryList.map(country => <p>{country.name}</p>)}
</CountryList>
```