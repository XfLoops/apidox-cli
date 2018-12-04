# apidox-cli

`apidox-cli` provides a document server, serving generated html from api blueprint files (`*.apib`).

`apidox-cli` also provides a mock server, using data in api blueprint file as response payload.

## usage

`apidox -f <apiDir> [options]`

options:
  
  - `-f <apiDir>`: folder with api blueprint files (`*.apib`). (**required**)
  - `-p <docPort>`:  api document server port
  - `-P <mockPort>`:  api mock server port
  - `-t <theme>`:  following themes are avaiable:
      - `default`
      - `cyborg`
      - `flatly`
      - `slate`
      - `streak`

