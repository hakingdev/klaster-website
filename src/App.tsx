import { AudioPlayerProvider } from './context/AudioPlayerContext'
import { event } from './data/event'
import Hero from './components/Hero'
import Atmosphere from './components/Atmosphere'
import EventDetails from './components/EventDetails'
import AudioTeaser from './components/AudioTeaser'
import HowToEnter from './components/HowToEnter'
import ApplicationForm from './components/ApplicationForm'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import LegalOverlay from './components/LegalOverlay'
import ThankYou from './components/ThankYou'

export default function App() {
  return (
    <AudioPlayerProvider src={event.audioSrc}>
      <Hero />
      <main>
        <Atmosphere />
        <EventDetails />
        <AudioTeaser />
        <HowToEnter />
        <ApplicationForm />
        <FinalCta />
      </main>
      <Footer />
      <LegalOverlay />
      <ThankYou />
    </AudioPlayerProvider>
  )
}
