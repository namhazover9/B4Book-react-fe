import Img1 from "../../assets/images/Banner/banner1.jpg";
function Banner() {
  const banner = {
    id: 1,
    sologan: "Enter your email and receive a 10% discount on your next order!",
    detail: "Get 10% Off Your Order",
  };
  return (
    <div className="scroll-py-2 relative mb-10 px-24 items-center">
      <img src={Img1} alt="Banner" className="w-full h-full rounded-2xl" />
      <div className="absolute inset-2 flex text-white p-6 items-center ">
        <div className="md:w-full w-1/4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{banner.detail}</h2>
          <h3 className="text-lg mb-2>{}">{banner.sologan}</h3>
          <div className="flex justify-center items-center">
            <input
              type="email"
              placeholder="Your email address..."
              className="mr-1 1 w-1/2 border border-gray-300 p-2 rounded-2xl"
            />

            <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
