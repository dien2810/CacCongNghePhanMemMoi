import LandingPageHeader from "./Header";
import Hero from "./Hero";
import NewCollection from "./NewCollection";
import AboutUs from "./AboutUs";
import BestSeller from "./BestSeller";
function LandingPage(props) {
  return (
    <div style={{ backgroundColor: "white", marginTop: "25px" }}>
      <LandingPageHeader />
      <Hero />
      <NewCollection />
      <AboutUs />
      <BestSeller />
    </div>
  );
}
export default LandingPage;
