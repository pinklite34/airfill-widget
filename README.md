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

# Usage in React

## Widget

```javascript
import Widget from '@bitrefill/airfill-widget';

render() {
  return <Widget/>;
}
```

## Components

```javascript
import {
  OperatorList
  Country,
  CountryList,
  PhoneNumber,
} from '@bitrefill/airfill-widget';

render() {
  return (
    <div>
      <OperatorList filter={["DTH", "VOIP"]}>
        {({ operators, setOperator }) =>
          operators.map(operator => (
            <p onClick={() => setOperator(operator)}>
              {operator.name}
            </p>
          )
        )}
      </OperatorList>
      <Country>
        {({country}) => <p>Current country is {country.name}</p>}
      </Country>
      <CountryList>
        {countryList => countryList.map(country => <p>{country.name}</p>)}
      </CountryList>
      <PhoneNumber>
        {({ number, setNumber, recentNumbers }) => <p>{number}</p>}
      </PhoneNumber>
    </div>
  );
}

