import Header from '../components/Header'
import Hero from '../components/Hero'
import Programmation from '../components/Programmation'
import Films from '../components/Films'
import Festival from '../components/Festival'
import Forfaits from '../components/Forfaits'
import Actualites from '../components/Actualites'
import Contact from '../components/Contact'
import Partenaires from '../components/Partenaires'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Programmation />
        <Films />
        <Festival />
        <Forfaits />
        <Actualites />
        <Contact />
        <Partenaires />
      </main>
      <Footer />
    </>
  )
}
