import IconRating from "../../assets/rating.png"
import IconRatingHalf from "../../assets/rating-half.png"
import MainPoster from "../../assets/temp-1.jpeg"
import IconPlay from "../../assets/play-button.png"

const Banner = () => {
    return (
        <div className="w-full h-[700px] bg-[url(/banner.png)] bg-center bg-no-repeat bg-cover relative">
            <div className="absolute w-full h-full top-0 left-0 opacity-30 bg-black"></div>
            <div className="flex w-full h-full items-center justify-center space-x-[30px] p-4">
                <div className="flex flex-col w-[50%] space-y-5 z-10 p-4">
                    <button className="text-white bg-gradient-to-r from-red-600 to-red-300 w-[90px] h-[40px] text-md">TV Show</button> 
                    <h2 className="text-white font-bold text-3xl">Nghe nói em thích tôi</h2>
                    <div className="flex items-center space-x-3">
                        <img src={IconRating} alt="rating" className="w-8 h-8" />
                        <img src={IconRating} alt="rating" className="w-8 h-8" />
                        <img src={IconRating} alt="rating" className="w-8 h-8" />
                        <img src={IconRating} alt="rating" className="w-8 h-8" />
                        <img src={IconRatingHalf} alt="rating" className="w-8 h-8" />
                    </div>
                    <div className="text-white w-[50%]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore commodi dolor id reiciendis rerum dolore, minima praesentium vel eos veritatis, laboriosam earum perspiciatis doloribus provident minus amet maiores consectetur doloremque.</div>
                    <div className="flex items-center space-x-4 font-bold text-sm">
                        <button className="bg-black text-white p-2">Chi tiết</button>
                        <button className="bg-red-600 text-white p-2">Xem thêm</button>
                    </div>
                </div>
                <div className="w-[50%] flex items-center justify-center z-10">
                    <div className="w-[300px] h-[400px] relative group cursor-pointer">
                        <img src={MainPoster} alt="poster" className="w-full h-full object-cover"/> 
                        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"> 
                            <img src={IconPlay} alt="play" className="w-16 h-16"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;