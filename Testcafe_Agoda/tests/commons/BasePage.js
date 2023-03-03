
import { t } from "testcafe";

class BasePage {

    async inputValueToFieldTextBox(field, value) {
        await this.verifyElementExisted(field)
        await t
            .selectText(field)
            .pressKey('delete')
            .typeText(field, value)

    }
    async clickButton(locator) {
        await this.verifyElementExisted(locator)
        await t.click(locator)
    }
    async clickElement(locator) {
        await this.verifyElementExisted(locator)
        await t.click(locator)
    }
    async selectOptionFromDropDownList(locator, value) {
        const option = locator.find('option')
        await this.verifyElementExisted(locator)
        await t
            .click(locator)
            .click(option.withText(value));
    }
    async clickHyperLink(link) {
        await this.verifyElementExisted(link)
        await t.click(link)
    }
    async checkCheckBoxOrRadio(locator) {
        await this.verifyElementExisted(locator)
        await t.click(locator)
    }
    async verifycontainText(element, expect) {
        await t
            .scrollIntoView(element)
            .expect(element.textContent).contains(expect)
    }
    async verifyElementExisted(element) {
        await t
            .scrollIntoView(element)
            .expect(element.exists).ok()
    }
    async verifyElementNotExisted(element) {

        await t
            .scrollIntoView(element)
            .expect(element.exists).notOk()
    }
    async clickUntilEqual(difference, element) {
        for (let i = 0; i < difference; i++) {
            await this.clickButton(element)
        }
    }
    async replaceValue(desString, key, value) {
        let text = desString.replace(key, value)
        return text
    }
}

export default BasePage;