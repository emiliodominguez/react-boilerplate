# 🚀 **React** boilerplate

# Table of contents

-   [General overview](#general-overview)
-   [Project structure](#project-structure)
-   [Available scripts](#available-scripts)

## General overview

The project was bootstrapped by using `Create React App` and `Yarn`, if eventually `npm` is needed, `yarn.lock` file should be deleted. Once the `npm i` command is executed a `package-lock` file will be generated automatically.

## Project structure

There are configuration files in the root of the project for CRACO, Husky, Prettier, ESLint, Stylelint Prettier.
Besides those files this is a detailed view of the main project structure.

    .
    └── .husky              # Husky configuration files
    └── .storybook          # The storybook configuration files
    └── .vscode             # VS Code configuration files
    └── public              # The public folder
    └── src                 # The source files folder
    │   └── components      # Application components
    │   │   └──App          # The main entry component
    │   └── hooks           # Application hooks
    │   └── styles          # Application styles
    │   └── helpers         # Application helpers
    │   └── ...
    └── ...                 # Project files

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
