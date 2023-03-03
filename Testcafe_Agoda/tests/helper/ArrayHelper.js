import XPathSelector from '../helper/xpath-selector';
import { t } from 'testcafe';

class ArrayHelper {

    async getArrayString(xpathList, expNum) {
        let arr = []
        let path = `(${xpathList})[number]`
        for (let i = 1; i < expNum + 1; i++) {
            let element = XPathSelector(path.replace('number', i))
            await t
                .scrollIntoView(element)
            arr[i - 1] = (await element.innerText)
        }
        console.log(arr)
        return arr;
    }

    async getArrayNumber(xpathList, expNum) {
        let arr = []
        let path = `(${xpathList})[number]`
        for (let i = 1; i < expNum + 1; i++) {
            let element = XPathSelector(path.replace('number', i))
            await t
                .scrollIntoView(element)
            arr[i - 1] = parseFloat((await element.innerText).replace(/,/g, ''))
        }
        console.log(arr)
        return arr;
    }

    async verifyArrayNumberSorted(arr) {
        let result = false
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] <= arr[i + 1]) {
                result = true
            }
        }
        console.log(result)
        return result
    }

    async verifyArrayNumberFiltered(minValue, maxValue, arr) {
        let result = false
        for (let i = 0; i < arr.length; i++) {
            if (parseFloat(minValue) <= arr[i] <= parseFloat(maxValue)) {
                result = true
            }
        }
        return result
    }
}

export default new ArrayHelper();