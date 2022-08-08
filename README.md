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

* If the snapshots haven been created it will be necessary to run the following command two times, the first one will create the snapshots and the second one will compare them, and it is important to keep in mind you have to run the commands for every browser separatedly

```
    playwright test --config=visual.config.ts --project=Chromium"
```

* Also if the snapshots were already created and they mus be updated we can use the following flag

```
    playwright test --config=visual.config.ts --project=Chromium --update-snapshots
```

* You can add an additional flag to set the number of retries

```
    playwright test --config=tips.config.ts --project=Chromium --retries=3
```

* We can use playwright to simulate different enviroments including different devices

```
    npx playwright open --device="iPhone 11" wikipedia.org
```

* We can use playwright to convert any given web to a pdf file

```
    npx playwright pdf https://www.example.com my-file.pdf
```
