import { Selector, t } from "testcafe";
import BasePage from "../commons/BasePage";
import XPathSelector from '../helper/xpath-selector';
import ArrayHelper from "../helper/ArrayHelper";

class ProductPage extends BasePage {
    constructor() {
        super()
        this.HotelName = Selector('[data-selenium="hotel-header-name"]')
        this.HotelDestination = Selector('div.HeaderCerebrum__Location')
        this.HotelFacilities = '//div[@data-element-name="room-grid-filter-item"]//*[text()="fac"]'
        this.ReviewCard = Selector('[class="ReviewRating__text"]')
        this.ReviewPoint = '//span[@class="Typographystyled__TypographyStyled-sc-j18mtu-0 kksGcu kite-js-Typography "][text() = "rvname"]//parent::div//p'
    }


    async verifyHotelDetailedPageDisplayedCorrectly(hotelName, destination, arrFac, arrReviewName, arrPoint) {
        await t.maximizeWindow()
        await this.verifycontainText(this.HotelName, hotelName)
        await this.verifycontainText(this.HotelDestination, destination)
        
        for (let i = 0; i < arrFac.length; i++) {
            let path = await this.replaceValue(this.HotelFacilities, 'fac', arrFac[i])
            await this.verifyElementExisted(XPathSelector(path))
        } 

        await t.hover(this.ReviewCard)
        let arrPointProductPage = []
        for (let i = 0; i < arrReviewName.length; i++) {
            let rvPointPath = await this.replaceValue(this.ReviewPoint, 'rvname', arrReviewName[i])
            arrPointProductPage[i] = parseFloat(await XPathSelector(rvPointPath).innerText)
        }
        console.log(arrPointProductPage)
        await t.expect(arrPointProductPage).eql(arrPoint)       
    }
}

export default ProductPage;