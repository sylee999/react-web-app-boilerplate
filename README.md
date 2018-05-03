### Quick Start

#### 1. Get the latest version

You can start by cloning the latest version of React Web App Boilerplate on your local machine by running:

```shell
$ git clone -o react-web-app-boilerplate -b master --single-branch \
      https://github.com/sylee999/react-web-app-boilerplate.git MyApp
$ cd MyApp
```

#### 2. Run `yarn install`

#### 3. Run `yarn start`

Note that the `yarn start` command launches the app in `development` mode,
the compiled output files are not optimized and minimized in this case.
You can use `--release` command line argument to check how your app works
in release (production) mode:

```shell
$ yarn start -- --release
```

### How to Build, Test, Deploy

If you need just to build the app (without running a dev server), simply run:

```shell
$ yarn run build
```

or, for a production build:

```shell
$ yarn run build -- --release
```

or, for a production docker build:

```shell
$ yarn run build -- --release --docker
```

After running this command, the `/build` folder will contain the compiled
version of the app. For example, you can launch Node.js server normally by
running `node build/server.js`.

To check the source code for syntax errors and potential issues run:

```shell
$ yarn run lint
```

To deploy the app, run:

```shell
$ yarn run deploy
```

### How to Update

If you need to keep your project up to date with the recent changes,
you can always fetch and merge them from [this repo](https://github.com/sylee999/react-web-app-boilerplate)
back into your own project by running:

```shell
$ git checkout master
$ git fetch react-web-app-boilerplate
$ git merge react-web-app-boilerplate/master
$ yarn install
```
