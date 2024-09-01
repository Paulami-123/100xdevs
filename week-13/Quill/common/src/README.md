******************

- npm init -y
- npx tsc --init
- mkdir src, dist
- outDir- ./dist, rootDir- ./src, declaration- true

******************

- npm login
- in  package.json change name
- in package.json main should have exact location of index.js (here, dist/index.js)
- add a .npmignore file and add src to avoid publishing the .ts files
- npm publish --access=public