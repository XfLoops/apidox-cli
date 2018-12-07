# APIDOX-CLI

[![npm](https://img.shields.io/npm/v/apidox-cli.svg)](https://www.npmjs.com/package/apidox-cli)
[![NpmLicense](https://img.shields.io/npm/l/apidox-cli.svg)](https://www.npmjs.com/package/apidox-cli)

## What it is?

#### Background

Under the api-blueprint spec to define project apis, we use [aglio](https://github.com/danielgtaylor/aglio) to convert `.apib` files into `.html` page for sharing purpose. We also use [drakov](https://github.com/Aconex/drakov) to mock data in `.apib` files during early developing stage. 

But there're drawbacks:

- Aglio isn't friendly to big api base. We have to split big api base into small ones to achieve a proper html page size.

- Drakov is slow to run on big api base. It faces the same problem as the aglio.

- We have to use different commands to obtain the api document and the mock server. It's tedious.

Here we have `apidox-cli`.

#### Apidox-cli

It is an api-blueprint-friendly tooling which can

- start a **document server** (use `-p` option), serving generated html from api blueprint files (`*.apib`).

- start a **mock server** (use `-P` option), using data in api blueprint files as response payload.

We treat sub-folder as modules. If sub-folder is detected, a menu will be automatically generated. 

Eventually, all you have to do is focuing on writing api-blueprint docs, leaving the rest things to `apidox-cli`. 


## Notes

> - Each sub-folder (we call it module) requires a header-file, which configs the `BASE_URI` and the module title.
> - Api definations should all be grouped.


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


## License

MIT

