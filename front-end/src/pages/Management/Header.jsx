import { GoBellFill } from "react-icons/go"
import image_placeholder from "../../assets/default_dish_card.jpg"

const Header = () => {
    return (
        <div className="flex justify-between items-center p-2 md:p-4 m-1 md:m-2 rounded-lg bg-sky-400">
            <div className="text-xs md:text-base">
                <span>Welcome, </span>
                <span className="font-bold">Manh</span>
            </div>
            <div className="flex items-center space-x-5">
                <div className="hidden md:flex">
                    <input type="text" placeholder="Tìm kiếm"
                        className="bg-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-300"
                    />
                </div>
                <div className="flex items-center space-x-5">
                    <button className="relative text-2xl text-gray-400">
                        <GoBellFill size={32} className="text-amber-400 hidden md:block" />
                        <GoBellFill size={24} className="text-amber-400 block md:hidden" />
                        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-red-600 text-white font-semibold text-xs w-4 h-4 md:w-5 md:h-5 rounded-full">
                            2
                        </span>
                    </button>
                    <img style={{ width: "2.25rem", aspectRatio: 1, backgroundSize: "cover" }} className="rounded-full" src={image_placeholder} />
                </div>
            </div>
        </div>
    )
}

export default Header