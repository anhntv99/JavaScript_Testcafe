const constant = require('../Testcafe_Agoda/tests/data/constant.json');

module.exports = {
    hooks: {       
        test: {
            before: async t => {
                await t.navigateTo(constant.BaseUrl)
                await t.maximizeWindow() 

            }
        },
    }, 

    browsers: "chrome",
    src: "test",
    reporter: "list",
    screenshots: {
        path: "assets/Failed_Screenshots",
        takeOnFails: true,
        fullPage: true
    },
    videoPath: "assets/Failed_Videos",
        videoOptions: {
        singleFile: true,
        failedOnly: true
    },
    concurrency: 1,
    selectorTimeout: 30000,
    assertionTimeout: 30000,
    pageLoadTimeout: 30000,
    speed: 1,
    skipJsErrors: true
}