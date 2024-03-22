# playwright-maps
 Few playwright-based tests for google maps search.

 ## How to run
 After cloning, install dependencies by running:
```
yarn
```
then all tests can be run with following command:
```
yarn playwright test
```
By default tests are running in headless mode, to see browser please use playwright's UI by running:
```
yarn playwright test --ui
```
In there you can pick which test / test file to run and see results for each step:
<img width="1270" alt="playwrightUI" src="https://github.com/Szpytech-gh/playwright-maps/assets/164514669/8a340fa2-9285-4fd8-aaed-b52d658668b8">

## Reporting
After the tests are done results can be found in:
- ```./playwright-report``` to see html report
- ```./test-results``` to see videos
- ```./test-results.json``` to see json results
