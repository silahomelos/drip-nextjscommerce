import { Footer } from '@components/common'
import LandingNavbar from '@components/common/LandingNavbar'

const Home = () => {
  return (
    <>
      <div className="relative bg-black">
        <img src="/landing.png" className="w-full hidden md:block" />
        <div className="relative md:absolute top-0 w-full">
          <LandingNavbar />
          <div className="mx-0 my-0 py-10 md:mx-20 md:my-20 md:w-1/3">
            <div className="mx-10 md:m-0">
              <img src="/landing-logo.png" className="relative mx-auto" />
              <h1 className="text-white font-bold text-center md:text-left xl:text-2xl 2xl:text-3xl relative my-3">
                {' '}
                Crossover Into The Digi-Fizzy Realms.
                <br />
                Rep Your DRIP IRL.{' '}
              </h1>
            </div>
            <img src="/landing.png" className="w-screen block md:hidden" />
            <div className="bg-transparent text-center text-center py-10 md:text-left md:p-0">
              <button
                type="button"
                className="bg-white text-black rounded py-1 px-4 md:mt-2 md:mb-20 font-bold"
              >
                {' '}
                {'READ MORE >'}{' '}
              </button>
            </div>
            <div className="md:bg-transparent py-10 text-center md:p-0 bg-mobile-contact">
              <div
                className="flex items-center mx-auto md:ml-0 py-2 px-4 border border-white border-solid rounded-lg"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.23) 0%, #000000 100%)',
                  width: '300px',
                }}
              >
                <input
                  className="flex-grow bg-transparent border-0 outline-none text-white placeholder-white"
                  placeholder="EMAIL ADDRESS"
                />
                <img
                  src="/landing-send.png"
                  className="cursor-pointer"
                  style={{ width: '1rem' }}
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer pages={[]} />
    </>
  )
}

export default Home
