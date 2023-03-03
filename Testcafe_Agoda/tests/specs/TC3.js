import HomePage from "../pages/HomePage"
import SearchResultsPage from "../pages/SearchResultsPage"
import ProductPage from "../pages/ProductPage"

const homePage = new HomePage()
const searchResultsPage = new SearchResultsPage()
const productPage = new ProductPage()
const data = require('../data/testdata.json')

fixture('TC_03 Fixture')
test('Search and select hotel', async t => {
     await homePage.closeAds()
     await homePage.searchDestination(data.Destination)
     await homePage.selectBookingDate(data.CheckInDate,data.CheckOutDate)
     await homePage.selectTravalerOpiton(data.Traveler, data.RoomNumber, data.AdultNumber)
     await homePage.clickButton(homePage.SearchBtn)
     await searchResultsPage.verifyDestinationDisplayedCorrectly(data.NumberOfHotel, data.Destination)
     await searchResultsPage.selectHotelFacilities(data.Facilitites)
     await searchResultsPage.verifyDetailedReviewDisplayed(data.HotelNo, data.ReviewName)
     let reviewPoint = await searchResultsPage.getReviewPoint(data.ReviewName)
     let firstHotelName = await searchResultsPage.getHotelName(data.HotelNo)
     await searchResultsPage.selectHotel(data.HotelNo)
     await productPage.verifyHotelDetailedPageDisplayedCorrectly(firstHotelName, 
          data.Destination, data.Facilitites, data.ReviewName, reviewPoint)

})
