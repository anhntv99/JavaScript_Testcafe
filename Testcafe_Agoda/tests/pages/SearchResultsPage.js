import { Selector, t } from "testcafe";
import BasePage from "../commons/BasePage";
import XPathSelector from '../helper/xpath-selector';
import ArrayHelper from "../helper/ArrayHelper";

const constant = require('../data/constant.json')

class SearchResultsPage extends BasePage {
    constructor() {
        super()
        this.Destination = '(//*[@data-selenium="area-city-text"])[number]'
        this.SortByPrice = Selector('[data-element-name="search-sort-price"]')
        this.finalPrice = '//span[@data-selenium="display-price"]'
        this.MinPrice = Selector('[aria-label="Minimum price filter"]')
        this.MaxPrice = Selector('[aria-label="Maximum price filter"]')
        this.StarratingCheckBox = '[aria-label=" number-Star rating "]'
        this.StarratingPath = '(//div[@class="sc-bdfBwQ sc-gsTCUz  jZvduX"])[number]//*[@href="#StarSymbolFillIcon"]'
        this.ShowMoreFacilities = Selector('div[data-value="Facilities"]')
        this.ShowMoreFacilities2 = Selector('a[data-value="Facilities"]')
        this.HotelFacilities = '[aria-label="fac"]'
        this.ReviewCard = '(//div[@data-element-name="property-card-review"])[number]'
        this.ReviewName = '//span[@data-selenium="review-name"][text() = "rvname"]'
        this.ReviewPoint = '//span[@data-selenium="review-name"][text() = "rvname"]//parent::li//strong'
        this.HotelName = '(//h3[@data-selenium="hotel-name"])[number]'
        this.HrefHotel = '(//div[@data-selenium="selectedHotelContainer"])[number]//a'
    }



    async verifyDestinationDisplayedCorrectly(expNum, expValue) {
        for (let i = 1; i < expNum + 1; i++) {
            let destination = XPathSelector(await this.replaceValue(this.Destination, 'number', i))
            await this.verifycontainText(destination, expValue)
        }

    }

    async verifyPriceSorted(expNum) {
        let arrPrice = await ArrayHelper.getArrayNumber(this.finalPrice, expNum)
        await t
            .expect(await ArrayHelper.verifyArrayNumberSorted(arrPrice)).ok()
    }



    async filterHotelByPrice(minPrice, maxPrice) {
        await this.inputValueToFieldTextBox(this.MinPrice, minPrice)
        await this.inputValueToFieldTextBox(this.MaxPrice, maxPrice)

    }

    async filterHotelByStarrating(arrstar) {
        for (let i = 0; i < arrstar.length; i++) {
            let path = await this.replaceValue(this.StarratingCheckBox, 'number', arrstar[i])
            await this.clickButton(Selector(path))
        }

    }

    async verifyFilterByStarratingCorrectly(expNum, arrstar) {
        let result = false
        for (let i = 1; i < expNum + 1; i++) {
            let path = await this.replaceValue(this.StarratingPath, 'number', i)
            let number = await XPathSelector(path).count
            console.log(number)
            for (let j = 0; j < arrstar.length; j++) {
                if (number == arrstar[j]) {
                    result = true
                }
                else {
                    result = false
                }
            }
        }
        await t
            .expect(result).ok()

    }

    async verifyFilterByPriceCorrectly(minPrice, maxPrice, expNum) {
        let arrPrice = await ArrayHelper.getArrayNumber(this.finalPrice, expNum)
        await t.expect(await ArrayHelper.verifyArrayNumberFiltered(minPrice, maxPrice, arrPrice)).ok()

    }

    async getCurrentPriceRange() {
        let minPriceDefault = (await this.MinPrice.getAttribute('value')).replace(/,/g, '')
        let maxPriceDefault = (await this.MaxPrice.getAttribute('value')).replace(/,/g, '')
        return {
            min: minPriceDefault,
            max: maxPriceDefault
        }
    }


    async removePriceFilter(minPriceDefault, maxPriceDefault) {
        await this.inputValueToFieldTextBox(this.MinPrice, minPriceDefault)
        await this.inputValueToFieldTextBox(this.MaxPrice, maxPriceDefault)
        await t.pressKey('enter')
    }

    async selectHotelFacilities(arrFac) {
        if (await this.ShowMoreFacilities.exists) {
            await this.clickElement(this.ShowMoreFacilities)
        }
        else if (await this.ShowMoreFacilities2.exists) {
            await this.clickElement(this.ShowMoreFacilities2)
        }
        else {
            for (let i = 0; i < arrFac.length; i++) {
                let path = await this.replaceValue(this.HotelFacilities, 'fac', arrFac[i])
                await this.clickButton(Selector(path))
            }
        }
    }

    async verifyDetailedReviewDisplayed(hotelNo, arrReviewName) {
        let rvCardPath = await this.replaceValue(this.ReviewCard, 'number', hotelNo)
        await t.hover(XPathSelector(rvCardPath))
        for (let i = 0; i < arrReviewName.length; i++) {
            let rvNamePath = await this.replaceValue(this.ReviewName, 'rvname', arrReviewName[i])
            await this.verifyElementExisted(XPathSelector(rvNamePath))
        }
    }

    async getReviewPoint(arrReviewName) {
        let arrPoint = []
        for (let i = 0; i < arrReviewName.length; i++) {
            let rvPointPath = await this.replaceValue(this.ReviewPoint, 'rvname', arrReviewName[i])
            arrPoint[i] = parseFloat(await XPathSelector(rvPointPath).innerText)

        }
        console.log(arrPoint)
        return arrPoint
    }

    async selectHotel(hotelNo) {
        let href = await XPathSelector(await this.replaceValue(this.HrefHotel, 'number', hotelNo)).getAttribute('href')
        let UrlHotel = `${constant.BaseUrl}${href}`
        await t.openWindow(UrlHotel)

    }

    async getHotelName(hotelNo) {
        let hotelPath = await this.replaceValue(this.HotelName, 'number', hotelNo)
        let hotelName = await XPathSelector(hotelPath).innerText
        console.log(hotelName)
        return hotelName
    }

    




}

export default SearchResultsPage;