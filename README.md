# citadel-lib
## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Adding a method
```
1. Add to public actions of one of the groups
2. Add to Vue test wrapper
3. Add tests for method to ./tests folder
4. Add documentation to confluence
```
### Autotest structure
```
.config.js:
  - argument collections for all cases
.test.js:
  - success testing
  - error testing:
    - wrong argument types
    - not supported
    - walletListError
  ```
