import HomePage from "../pages/HomePage"
import SearchResultsPage from "../pages/SearchResultsPage"

const homePage = new HomePage()
const searchResultsPage = new SearchResultsPage()
const data = require('../data/testdata.json')

fixture('TC_02 Fixture')
test('Search and filter hotel', async t => {
     await homePage.closeAds()
     await homePage.searchDestination(data.Destination)
     await homePage.selectBookingDate(data.CheckInDate,data.CheckOutDate)
     await homePage.selectTravalerOpiton(data.Traveler, data.RoomNumber, data.AdultNumber)
     await homePage.clickButton(homePage.SearchBtn)
     await searchResultsPage.verifyDestinationDisplayedCorrectly(data.NumberOfHotel, data.Destination)
     let defaultPrice = await searchResultsPage.getCurrentPriceRange()
     await searchResultsPage.filterHotelByPrice(data.MinPriceFilter, data.MaxPriceFilter)
     await searchResultsPage.filterHotelByStarrating(data.Starrating)
     await searchResultsPage.verifyDestinationDisplayedCorrectly(data.Destination)
     await searchResultsPage.verifyFilterByPriceCorrectly(data.MinPriceFilter, data.MaxPriceFilter, data.NumberOfHotel)
     await searchResultsPage.verifyFilterByStarratingCorrectly(data.NumberOfHotel,data.Starrating)
     await searchResultsPage.removePriceFilter(defaultPrice.min, defaultPrice.max)
     
})
