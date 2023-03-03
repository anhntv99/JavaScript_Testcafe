import moment from "moment/moment";
const constant = require('../data/constant.json')

class DateHelper{

    async getNextDayOfWeek(dayOfWeek) {
        let resultDate;
        if (moment().isoWeekday() < dayOfWeek){ 
            resultDate = moment().isoWeekday(dayOfWeek);
        }
        else{
            resultDate = moment().add(1, 'weeks').isoWeekday(dayOfWeek);
        }
        return moment(resultDate).format(constant.FormatDate);
    }

    async getDayFromNextDay(startDow, days) {
        const dayINeed = moment(await this.getNextDayOfWeek(startDow)).add(days, 'days');
        return moment(dayINeed).format(constant.FormatDate);
    }

}
    

export default new DateHelper();