const CareerIntro = () => {
  return (
    <>
      <div className="Careerhero relative w-full h-screen" id="abouthero">
        <div
          className="absolute bottom-24 flex flex-col justify-end p-5 overflow-hidden w-full"data-aos="fade-up"
          
        >
          {/* text */}
          <h1 className="lg:text-7xl text-5xl py-5 text-background">
            Career
          </h1>
          <h1 className="text-2xl lg:text-4xl font-sans text-background">
            We are always on the lookout
          </h1>
          <h1 className="text-2xl lg:text-4xl font-sans text-background">
            for new and proposing Talent
          </h1>
        </div>
      </div>

    </>
  );
};

export default CareerIntro;
