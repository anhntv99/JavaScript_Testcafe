import { ClientFunction } from "testcafe";

class GetScreenSize {

    async getDefaultScreenSize() {
        const fn = ClientFunction(() => {
            return {
                width: $(window).width(),
                height: $(window).height()
            };
        });        
        return fn();
    }

    async getCurrentScreenSize() {
        let screenSize = await this.getDefaultScreenSize();
        console.log(screenSize)
        let width;
        let height;
        if(process.env.SCREEN_WIDTH != null && process.env.SCREEN_HEIGHT != null)
        {
            width = process.env.SCREEN_WIDTH
            height = process.env.SCREEN_HEIGHT
        }
        else if(process.env.SCREEN_WIDTH != null && process.env.SCREEN_HEIGHT == null)
        {
            width = process.env.SCREEN_WIDTH
            height = screenSize.height
        }
        else if(process.env.SCREEN_WIDTH == null && process.env.SCREEN_HEIGHT != null)
        {
            width = screenSize.width
            height = process.env.SCREEN_HEIGHT
        }
        else
        {
            width = screenSize.width
            height = screenSize.height
        }

        return {
            width: width,
            height: height
        }

    }
}
export default GetScreenSize;
    