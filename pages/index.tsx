import { useState } from 'react'
import { Footer } from '@components/common'
import { ToastContainer, toast } from 'react-toastify'
import LandingNavbar from '@components/common/LandingNavbar'
import 'react-toastify/dist/ReactToastify.css'
import Link from '@components/ui/Link'
import { ESPA_BACKEND_API_URL, ESPA_BACKEND_API_KEY } from '@constants/index'

const endpoint = `${ESPA_BACKEND_API_URL}save-drip-emails`
const API_KEY = ESPA_BACKEND_API_KEY

const Home = () => {
  const [email, setEmail] = useState('')
  const addEmail = () => {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
      body: JSON.stringify({ email }),
    }).then((res) => {
      if (res.status === 200) {
        toast.success("You're successfully registered!", {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      } else {
        toast.error('Email already exists!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    })
  }

  return (
    <>
      <div className="relative bg-black">
        <video className="w-full hidden md:block" autoPlay muted loop>
          <source src="/Web Fashion Week.mp4" type="video/mp4" />
        </video>
        <div className="relative md:absolute top-0 w-full">
          <LandingNavbar />
          <div className="mx-0 my-0 py-10 md:mx-20 md:my-20 md:w-1/3">
            <div className="mx-10 md:m-0">
              <img src="/landing-logo.png" className="relative m-0" />
              <h1 className="text-white font-bold text-center md:text-left xl:text-2xl 2xl:text-3xl relative my-3">
                {' '}
                Crossover Into The Digi-Fizzy Realms.
                <br />
                Rep Your DRIP IRL.{' '}
              </h1>
            </div>
            <video className="w-screen block md:hidden" autoPlay muted loop>
              <source src="/Web Fashion Week.mp4" type="video/mp4" />
            </video>
            <div className="bg-transparent text-center text-center py-10 md:mt-2 md:mb-20 md:text-left md:p-0">
              <Link href="/marketplace">
                <a
                  type="button"
                  className="bg-white text-black rounded py-4 px-5 font-bold border-black"
                >
                  {' '}
                  {'REP YOUR STYLE IRL >'}{' '}
                </a>
              </Link>
            </div>
            <div className="text-white py-2 font-bold"> Stay Up to Date! </div>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <img
                  src="/landing-send.png"
                  className="cursor-pointer"
                  style={{ width: '1rem' }}
                  onClick={addEmail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer pages={[]} />
    </>
  )
}

export default Home
