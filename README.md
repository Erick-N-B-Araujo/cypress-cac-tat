# Cypress Automation

[![main](https://github.com/wlsf82/cy-data-test/actions/workflows/ci.yml/badge.svg)](https://github.com/wlsf82/cy-data-test/actions)

Sample project to demonstrate a `cy.dataTest` Cypress custom command.

## Pre-requirements

Before you begin, ensure that the following systems are installed on your computer.

- [git](https://git-scm.com/) (I'm using version `2.34.1` as I write this class)
- [Node.js](https://nodejs.org/en/) (I'm using version `v16.13.2` while writing this class)
- npm (I'm using version `8.3.2` as I write this class)
- [Google Chrome](https://www.google.com/intl/pt_br/chrome/) (I'm using version `98.0.4758.80 (Official Build) (x86_64)` while writing this class)
- [Visual Studio Code](https://code.visualstudio.com/) (I'm using version `1.64.0` as I write this class) or some other IDE of your choice

> **Note:** I recommend using the same versions, or more recent versions, of the systems listed above.
>
> **Note. 2:** When installing Node.js, npm is installed together. 🎉
>
> **Note. 3:** To check the versions of git, Node.js, and npm installed on your computer, run the command `git --version && node --version && npm --version` in your command-line terminal.
>
> **Note. 4:** I left links to the installers in the list of requirements above, if you don't have them installed yet.

## Installation

Run `npm install` (or `npm i` for the short version) to install the dev dependencies.

## Tests

You can run the tests simulation a desktop or mobile viewport.

#### Desktop

Run `npm test` to run the test in headless mode on a desktop viewport.

Or, run `npm run cy:open` to open Cypress in interactive mode on a desktop viewport.

#### Mobile

Run `npm test:mobile` to run the test in headless mode on a mobile viewport.

Or, run `npm run cy:open:mobile` to open Cypress in interactive mode on a mobile viewport.

## Support this project

If you want to support this project, leave a ⭐.

___

This project was created with 💚 by [Erick](https://erickaraujo.com).
