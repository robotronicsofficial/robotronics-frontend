import AppImage from "./AppImage";
import python from "../assets/images/python.webp"
import time from "../assets/logo/time-svgrepo-com 1.svg"
import download from "../assets/logo/download.svg"
import sale from "../assets/logo/sales.svg" 
import img7 from "../assets/logo/shopStars.svg"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
const ShopItems = () => {
  return (
    <div>
        <div className="flex-1 xl:w-1/4 md:w-1/2 p-4"  >
            <div>
              <Card className="rounded-xl p-0">
                <CardContent className="p-6">
                <AppImage
                  className="h-50 rounded-xl w-full object-cover object-center"
                  src={python}
                  alt="content"
                />
                {/* name price AI */}
                <div className="flex flex-row">
                  <h3 className="tracking-widest text-muted-foreground text-lg font-bold title-font  py-5">
                    Artificial Intelligence <br />
                    and Machine Learning{" "}
                  </h3>
                  <div className="flex flex-col p-5 px-16 ">
                  <img  className="flex p-2 " src={img7}/>
                  <p className="flex text-primary font-bold">PKR 50,000</p>
                  </div>
                </div>
                {/*doted line */}
                <Separator className="border border-dotted border-foreground" />
                <div className="flex justify-center items-center">
                  <div className="flex m-5">
                    <img className="p-1" src={time} />
                    22hr 30min
                  </div>
                  <div className="flex m-5">
                    <img className="p-1" src={download} />
                    34 Course
                  </div>
                  <div className="flex m-5">
                    <img className="p-1" src={sale} />
                    250 Sales
                  </div>
                </div>
                </CardContent>
              </Card>
            </div>
            <Button className="mt-4 h-auto rounded bg-primary p-4 px-40 text-xl font-bold" data-aos="fade-up" >
              Join Course
            </Button>
          </div> 
    </div>
  )
}

export default ShopItems;
