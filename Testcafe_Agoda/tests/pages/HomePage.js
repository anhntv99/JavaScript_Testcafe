import { Selector,t } from "testcafe";
import BasePage from "../commons/BasePage";
import DateHelper from "../helper/DateHelper";
import XPathSelector from "../helper/xpath-selector";
import moment from "moment";

const constant = require('../data/constant.json')


class HomePage extends BasePage {
    constructor() {
        super()
        this.SearchBox = Selector('#textInput')
        this.Destination = 'li[data-element-value="destination"]'
        this.nextMonthBtn = Selector('[aria-label="Next Month"]')
        this.DatePickerDialog = Selector('div[class="DayPicker"]');
        this.TravalerOpitonBox = Selector('div[data-selenium="occupancyBox"]')
        this.TravalerOption = '//div[@class="TravellerSegment__row TravellerSegment__title"][text()="option"]'
        //Old
        this.SubstractRoomBtn = Selector('[data-element-name="occupancy-selector-panel-rooms"][data-selenium="minus"]')
        this.AddRoomBtn = Selector('[data-element-name="occupancy-selector-panel-rooms"][data-selenium="plus"]')
        this.SubstractAdultBtn = Selector('[data-element-name="occupancy-selector-panel-adult"][data-selenium="minus"]')
        this.AddAdultsBtn = Selector(' [data-element-name="occupancy-selector-panel-adult"][data-selenium="plus"]')
        this.NumberOfRooms = Selector('span[data-component="desktop-occ-room-value"]')
        this.NumberOfAdults = Selector('span[data-component="desktop-occ-adult-value"]')
        this.NumberOfChildren = Selector('span[data-component="desktop-occ-children-value"]')

        //New
        this.addRoomButton = Selector("div[data-element-name='occupancy-selector-panel-rooms']>svg").withAttribute('aria-label', 'Add')
        this.subtractRoomButton = Selector("div[data-element-name='occupancy-selector-panel-rooms']>svg").withAttribute('aria-label', 'Subtract')
        this.addAdultsButton = Selector("[data-element-name='occupancy-selector-panel-adult'][data-selenium='plus']")
        this.subtractAdultsButton = Selector("[data-element-name='occupancy-selector-panel-adult'][data-selenium='plus']")
        this.newUXNumberOfRoom = Selector("[data-component='desktop-occ-room-value'] > h3")
        this.newUXNumberOfAdults = Selector("[data-component='desktop-occ-adult-value'] > h3")


        this.SearchBtn = Selector('span').withText('SEARCH')
        this.CloseAdsBtn = Selector('button.ab-message-button').withText('No thanks')
        this.DateSelector = 'div[aria-label="date"]';

    }



    async closeAds() {
        await this.clickButton(this.CloseAdsBtn)

    }
    async searchDestination(value) {
        let desOption = await this.replaceValue(this.Destination, 'destination', value)
        await this.inputValueToFieldTextBox(this.SearchBox, value)
        await this.clickButton(Selector(desOption))
    }

    async selectDate(date) {
        let formattedDate = moment(date).format(constant.FormatDate)
        let dateSelector = Selector(await this.replaceValue(this.DateSelector, 'date', formattedDate));
        // TODO: If/Else here to nexth month
        // Click next month and check if present
        // NOTE: Next month btn is not pressed
        if (! await dateSelector.exists) {
            await this.clickButton(this.nextMonthBtn)
            await this.selectDate(date)

        }
        else {
            await this.clickButton(dateSelector);
        }
        

    }

    async selectBookingDate(startDate, EndDate) {
        await this.selectDate(startDate)
        await this.selectDate(EndDate)
    }

    // async selectBookingDate(startDow, days) {
    //     let checkInDate = Selector('div').withAttribute('aria-label', await DateHelper.getNextDayOfWeek(startDow))
    //     let checkOutDate = Selector('div').withAttribute('aria-label', await DateHelper.getDayFromNextDay(startDow, days));
    //     await this.clickButton(checkInDate)
    //     await this.clickButton(checkOutDate)
    // }




    //#region Old 
    async selectNumberOfRooms(diff) {
        if (diff > 0) {
            await this.clickUntilEqual(diff, this.AddRoomBtn)
        }
        else if (diff < 0) {
            await this.clickUntilEqual(diff, this.SubstractRoomBtn)
        }
    }

    async selectNumberOfAdults(diff) {
        if (diff > 0) {
            await this.clickUntilEqual(diff, this.AddAdultsBtn)
        }
        else if (diff < 0) {
            await this.clickUntilEqual(diff, this.SubstractAdultBtn)
        }
    }


    //#endregion

    //#region New
    async selectRoomNumber(diff) {
        if (diff > 0) {
            await this.clickUntilEqual(diff, this.addRoomButton)
        }
        else if (diff < 0) {
            await this.clickUntilEqual(diff, this.subtractRoomButton)
        }
    }

    async selectAdultNumber(diff) {
        if (diff > 0) {
            await this.clickUntilEqual(diff, this.addAdultsButton)
        }
        else if (diff < 0) {
            await this.clickUntilEqual(diff, this.subtractAdultsButton)
        }
    }
    //#endregion


    async selectTravalerOpiton(option, roomNumber, adultNumber) {
        let diffRoom
        let diffAdult

        if (await this.addRoomButton.exists) {
            diffRoom = roomNumber - parseInt(await this.newUXNumberOfRoom.textContent)
            diffAdult = adultNumber - parseInt(await this.newUXNumberOfAdults.textContent)
            await this.selectAdultNumber(diffAdult)
            await this.selectRoomNumber(diffRoom)
        }
        else {
            let travelerOpiton = XPathSelector(await this.replaceValue(this.TravalerOption, 'option', option))
            await this.clickButton(travelerOpiton)
            if (await this.NumberOfRooms.exists) {
                diffRoom = roomNumber - parseInt(await this.NumberOfRooms.textContent)
                diffAdult = adultNumber - parseInt(await this.NumberOfAdults.textContent)
                await this.selectNumberOfAdults(diffAdult)
                await this.selectNumberOfRooms(diffRoom)
            }
        }
        await this.clickButton(this.TravalerOpitonBox)
    }
}

export default HomePage;