# apidox-cli

`apidox-cli` is an api-blueprint-friendly command line interface which can

- start a **document server** (use `-p` option), serving generated html from api blueprint files (`*.apib`).

- start a **mock server** (use `-P` option), using data in api blueprint files as response payload.

You can start up both document server and mock server in one command.

## Install

  `npm i -g apidox`

## Usage

  `apidox [options]`

| options | description | required | default |
| ---- | ---- | --- | --- |
| `-f <apiDir>` | folder with api blueprint files (`*.apib`) | :heavy_check_mark: | -- |
| `-p <docPort>` | document server port | -- | `4002` |
| `-P <mockPort>` |  mock server port | -- | `3000` |
| `-t <theme>` | document theme can be one of `default`, `cyborg`, `flatly`, `slate`, `streak` | -- | `default` |


## License

MIT

