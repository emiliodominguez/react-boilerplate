# 🚀 **React** boilerplate

# Table of contents

-   [General overview](#general-overview)
-   [Project structure](#project-structure)
-   [Available scripts](#available-scripts)
-   [UI components](#ui-components)
-   [Helpers](#helpers)
    -   [Common](#common)
    -   [Colors](#colors)
    -   [Date](#date)
    -   [Math](#math)
    -   [Strings](#strings)
    -   [Type utilities](#type-utilities)
-   [Hooks](#hooks)
-   [Services](#services)
-   [Styles](#styles)

<br>

## General overview

The project was bootstrapped by using `Create React App` and `Yarn` (with `Typescript`), if eventually `npm` is needed, `yarn.lock` file should be deleted. Once the `npm i` command is executed a `package-lock` file will be generated automatically.

<br>

## Project structure

There are configuration files in the root of the project for CRACO, Husky, Prettier, ESLint, Stylelint Prettier.
Besides those files this is a detailed view of the main project structure.

    .
    └── .husky              # Husky configuration files
    └── .storybook          # Storybook configuration files
    └── .vscode             # VS Code configuration files
    └── public              # Static files folder
    └── src                 # Source files folder
    │   └── components      # Application components
    │   │   └── App         # Main entry component
    │   │   └── Library     # UI library components (See UI Components section)
    │   └── helpers         # Application helpers (See Helpers section)
    │   └── hooks           # Application hooks (See Hooks section)
    │   └── styles          # Application styles (See Styles section)
    │   └── ...
    └── ...                 # Project files

<br>

## Available scripts

There are more scripts listed within the `package.json` file, but these are the most used ones.

<details style="margin-bottom: 15px">
<summary><code>yarn install</code></summary>
<p style="font-size: 14px; padding: 5px 0 0 10px">
	Installs project dependencies.<br>
	<small><b>Note:</b> Might need to add <code>--legacy-peer-deps</code> flag for CRACO. Currently configured by using the <code>.npmrc</code> file.</small>
</p>
</details>

<details style="margin-bottom: 15px">
<summary><code>yarn start</code></summary>
<p style="font-size: 14px; padding: 5px 0 0 10px">
    Runs the app in development mode.<br>
    Open <a target="_blank" href="http://localhost:3000/">http://localhost:3000/</a> to view it in the browser.
</p>
</details>

<details style="margin-bottom: 15px">
<summary><code>yarn build</code></summary>
<p style="font-size: 14px; padding: 5px 0 0 10px">Builds the app in production mode.</p>
</details>

<details style="margin-bottom: 15px">
<summary><code>yarn test</code></summary>
<p style="font-size: 14px; padding: 5px 0 0 10px">Launches the test runner in the interactive watch mode.</p>
</details>

<details style="margin-bottom: 15px">
<summary><code>yarn storybook</code></summary>
<p style="font-size: 14px; padding: 5px 0 0 10px">
    Runs Storybook.<br>
    Open <a target="_blank" href="http://localhost:6006/">http://localhost:6006/</a> to view it in the browser.
</p>
</details>

<br>

## UI components

A set of the commonly used components, all custom made, each including its own story for visual testing purposes.

These are the ones available:

-   Grid (includes Col)
-   Select
-   Toast

<br>

## Hooks

`useEventListener`: Sets and removes event listeners

`useClickOutside`: When a user clicks somewhere checks if the event was triggered within the target element or not

`useFetch`: A hook to handle requests

`useWindowWidth`: Checks if the window size matches any given width

<br>

## Services

TBD

<br>

## Styles

TBD

<br>

## Helpers

### Common

`className`:
A helper function to handle class names easily

`getFromObjectByKeys`:
Gets a nested (or not) value by its key

---

### Colors

`rgbToHex`:
Converts a RGB color to hexadecimal

`hexToRgb`:
Converts an hexadecimal color to RGB

`getContrastColor`:
Gets the contrast color of a base color

`generateColorScale`:
Generates a color scale from a single color

---

### Date

`getDateFrom`
Gets a date from today until any given amount of days

`daysBetweenDates`
Gets a range of date between two dates

`getDatesInRange`
Gets an array of dates within a range

`getWeekDates`
Gets both the start and end days of a week

#### Constants

`today`
Today's date

`oneDayMS`
A day in milliseconds

`yesterday`
Yesterday's date

`tomorrow`
Tomorrow's date

`twoDaysFromToday`
Two days from today's date

`sevenDaysFromToday`
Seven days from today's date

---

### Math

`clamp`: Clamps a number between min and max values

`normalize`: Normalizes a value

`linearRegression`: The simple linear regression is a predictive algorithm that provides a linear relationship between one input (x) and a predicted result (y)

---

### Strings

`slugify`: Creates a slug from a string

`capitalize`: Capitalizes a string

`camelCase`: Converts a regular string to camel case

`replaceAll`: Returns a new string with all matches of a pattern replaced by a replacement

`generateRandomHash`: Generates a random hash

---

### Type utilities

`NestedKeyOf`: Allows typing the keys of an object independently of its nesting level

`NestedPick`: Allows picking keys of an object independently of its nesting level

<br>
