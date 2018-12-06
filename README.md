# apidox-cli

`apidox-cli` is an api-blueprint-friendly tooling which can

- start a **document server** (use `-p` option), serving generated html from api blueprint files (`*.apib`).

- start a **mock server** (use `-P` option), using data in api blueprint files as response payload.

Besides, both document server and mock server can be started in one command. 


## Install

  `npm i apidox-cli`

## Usage

  `apidox <folder> [options]`

| options | description | required | default |
| ---- | ---- | --- | --- |
| `-p <docPort>` | document server port | -- | `4002` |
| `-P <mockPort>` | mock server port | -- | -- |
| `-t <theme>` | one of `default`, `cyborg`, `flatly`, `slate`, `streak` or `0-4` | -- | `default` |

## Example


- start a document server: `apidox ./docs`
- start a mock server: `apidox ./docs -P 3000`
- start document server and mock server: `apidox ./docs -p 4002 -P 3000`
- change document theme: `apidox ./docs -t 2`


## NOTE

> `apidox-cli` requires only **one** folder input. 

> If **nested folder structure** is detected, a **menu** will be automatically generated. 


## License

MIT

