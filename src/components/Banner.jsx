const Banner = () => {
    return (
        <div className="w-full h-[700px] bg-[url(/banner.png)] bg-center bg-no-repeat bg-cover relative">
            <div className="absolute w-full h-full top-0 left-0 opacity-30 bg-black"></div>
            <div className="flex w-full h-full items-center justify-center space-x-[30px] p-4">
                <div className="flex flex-col w-[50%] h-[50%] space-y-4">
                    <button className="text-white bg-gradient-to-r from-red-600 to-white">TV Show</button> 
                    <h2 className="text-amber-50">Nghe nói em thích tôi</h2>
                    <div>Content3</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore commodi dolor id reiciendis rerum dolore, minima praesentium vel eos veritatis, laboriosam earum perspiciatis doloribus provident minus amet maiores consectetur doloremque.</div>
                </div>
                <div>Image</div>
            </div>
        </div>
    );
    };

export default Banner;