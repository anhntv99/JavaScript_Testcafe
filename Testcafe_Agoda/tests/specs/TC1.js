import HomePage from "../pages/HomePage"
import SearchResultsPage from "../pages/SearchResultsPage"

const homePage = new HomePage()
const searchResultsPage = new SearchResultsPage()
const data = require('../data/testdata.json')

fixture('TC_01 Fixture')
test('Search and sort hotel', async t => {
     await homePage.closeAds()
     await homePage.searchDestination(data.Destination)
     await homePage.selectBookingDate(data.CheckInDate,data.CheckOutDate)
     await homePage.selectTravalerOpiton(data.Traveler, data.RoomNumber, data.AdultNumber)
     await homePage.clickButton(homePage.SearchBtn)
     await searchResultsPage.verifyDestinationDisplayedCorrectly(data.NumberOfHotel, data.Destination)
     await searchResultsPage.clickButton(searchResultsPage.SortByPrice)
     await searchResultsPage.verifyDestinationDisplayedCorrectly(data.NumberOfHotel, data.Destination)
     await searchResultsPage.verifyPriceSorted(data.NumberOfHotel)
})