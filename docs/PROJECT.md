# Guidelines for adding a new Project

We will be following certain set of rules before adding new projects so that it allows to make the repository easily manageable and accessible.
The project is initialised with create-react-app with TypeScript, so no need to initialise each individual project with frameworks.

1. If you are a new user and want to contribute to the repository, clone the repository and make a branch from master `<username>/<project-name>` (eg. demondaddy22/tic-tac-toe), then start making changes in your branch.
2. Let's assume the project is creating a game of tic-tac-toe, then create a sub-directory with the name Tic-Tac-Toe under the **src** directory.
3. Now under the Tic-Tac-Toe directory, create another sub-directory with the name as your GitHub username (eg. DemonDaddy22). This directory will contain your implementation(s) of the project.
4. It is expected of you to implement the project in VanillaJS first and then in frameworks of your choice. Under the sub-directory of your GitHub username, create another sub-directory of VanillaJS which would include all the relevant files necessary for VanillaJS implementation. Similarly, for any framework (eg. ReactJS), create another sub-directory and necessary files inside that sub-directory.
5. Create a README.md file under the directory with your username, which must contain the project's description, resources and screenshots.

```bash
src
|____index.tsx
|____index.scss
|____App.tsx
|____App.scss
|____Tic-Tac-Toe
| |____DemonDaddy69
| | |____README.md
| | |____VanillaJS
| | | |____index.html
| | | |____styles.css
| | | |____index.js
| | |____ReactJS
| | | |____index.js
| | | |____components
```
