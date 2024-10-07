const PhoneScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-[22%] h-[95%] bg-black rounded-[50px] shadow-phoneMockup ">
        <div className="absolute top-4 left-4 right-4 bottom-4 bg-black rounded-[30px] overflow-hidden">
          <iframe
            className="w-[108%] h-full bg-transparent rounded-[30px]"
            src="/"
          />
        </div>

        <div className="absolute top-[5px] left-[50%] translate-x-[-50%] h-2 w-12 bg-gray-900 rounded"></div>

        <div className="absolute top-[100px] -rigth-1 h-16 w-1 bg-gray-900 rounded"></div>
        <div className="absolute top-[180px] rigth-1 h-40 w-1 bg-gray-900 rounded"></div>
      </div>
    </div>
  );
};

export default PhoneScreen;
