import LandingPageHeader from "./Header";
import Hero from "./Hero";
import NewCollection from "./NewCollection";
import AboutUs from "./AboutUs";
import BestSeller from "./BestSeller";
import OurProduct from "./OurProduct";
import Discount from "./Discount";
import Footer from "../../components/Footer";
import OrderPopup from "../../components/Popup/OrderPopup";
function LandingPage(props) {
  return (
    <div style={{ backgroundColor: "white", marginTop: "25px" }}>
      <LandingPageHeader />
      <Hero />
      <NewCollection />
      <AboutUs />
      <BestSeller />
      <OurProduct />
      <Discount />
      <Footer />
      <OrderPopup />
    </div>
  );
}
export default LandingPage;
