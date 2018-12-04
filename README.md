# apidox-cli

apidox-cli is an api-blueprint-friendly tooling which can

- start a **document server** (use `-p` option), serving generated html from api blueprint files (`*.apib`).

- start a **mock server** (use `-P` option), using data in api blueprint files as response payload.

You can start up both document server and mock server in one command.

## Install

  `npm i -g apidox-cli`

## Usage

  `apidox [options]`

| options | description | required | default |
| ---- | ---- | --- | --- |
| `-f <apiDir>` | `<apiDir>` is folder with api blueprint files (`*.apib`) | :heavy_check_mark: | -- |
| `-p <docPort>` | `<docPort>` is document server port | -- | `4002` |
| `-P <mockPort>` | `<mockPort>` is mock server port | -- | -- |
| `-t <theme>` | `<theme>` can be one of `default`, `cyborg`, `flatly`, `slate`, `streak` | -- | `default` |

## Example


- start a document server: `apidox -f ./docs`
- start a mock server: `apidox -f ./docs -P 3000`
- change document theme: `apidox -f ./docs -t cyborg`


## License

MIT

