## Playwright tests

This was a repository created following the **Automated Software Testing with Playwright** Udemy course

### Notes

There are too many ways to invoke the test, because of this i will put some of the ways in this file in order to clean the scripts on the package.json

* This will allow to run test in all available browsers when there is no configuration file created

```
    "test": "npx playwright test --browser=all",
    "test:open": "npx playwright test --headed --browser=all",
```

* This way you can run tests that match a particular tag, in this case MyTag

```
    "tag:myTag": "npx playwright test --grep @myTag",
    "tag:-myTag": "npx playwright test --grep-invert @myTag",
```
