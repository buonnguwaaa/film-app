const Header = () => {
    return (
        <div className="p-4 bg-black flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <h1 className="text-red-700 text-[40px] uppercase font-bold">Movie</h1>
                <nav className="flex items-center space-x-4">
                    <a href="/" className="text-white text-lg font-semibold mx-2">Home</a>
                    <a href="/" className="text-white text-lg font-semibold mx-2">About</a>
                    <a href="/" className="text-white text-lg font-semibold mx-2">Contact</a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <input type="text" className="bg-amber-50 text-black"/>
                <button className="text-white bg-red-700 p-3 rounded">Search</button>
            </div>
        </div>
    );
};

export default Header;