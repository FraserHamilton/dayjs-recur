# dayjs-recur

## Getting Started

The following guide will help you install and use this plugin with Day.js

### Prerequisites

Day.js installed

### Installation

You can install via Yarn or npm

```bash
yarn add dayjs-recur
```

```bash
npm install dayjs-recur
```

## Usage Guide

You will need to import the plugin and activate it via the Day.js `.extend()` function

### ES6

```javascript
import dayjs from 'dayjs'
import dayjsRecur from 'dayjs-recur'

dayjs.extend(dayjsRecur)
```

### Node

```javascript
const dayjs = require('dayjs')
const dayjsRecur = require('dayjs-recur')

dayjs.extend(dayjsRecur)
```

## Local Development and Contributing

We are more than happy to accept PRs for bugs, improvements or new features.
Developing your own changes locally is easy, you just need to clone the repo

```bash
git clone git@github.com/FraserHamilton/dayjs-recur

cd dayjs-recur
```

and install the dependencies with either `npm` or `yarn`

```bash
npm i
```

```bash
yarn
```

Tests can be ran with the `test` script

```bash
npm run test
```

```bash
yarn test
```
