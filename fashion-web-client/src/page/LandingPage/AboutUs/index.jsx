import AboutUsItem from "./Item";
import Vecto from "../../../components/Vecto";
import "../../../assets/css/AboutUs.css";

function AboutUs() {
  const vecto = { top: "20%", left: "42%", zIndex: "3" };
  return (
    <div className="container-1139 aboutus-container">
      <div className="aboutus-img-container">
        <img
          src={require("../../../assets/img/aboutus-img.jpg")}
          alt="aboutus-img"
        />
      </div>
      <div className="container-1139 aboutus-infor">
        <p className="aboutus-heading">Best Fashion Since 2024</p>
        <p className="aboutus-bdesc">
          Chúng tôi cam kết đem lại những sản phẩm chất lượng cao, thân thiện
          với môi trường và dịch vụ tận tâm. Với đội ngũ đam mê sáng tạo, chúng
          tôi luôn nỗ lực để đáp ứng nhu cầu và đồng hành cùng phong cách của
          khách hàng.
        </p>
        <div className="container-1139 aboutus-list-container">
          <AboutUsItem heading="2014" content="FiFash Founded" />
          <div className="line"></div>
          <AboutUsItem heading="8900" content="Product Sold" />
          <div className="line"></div>
          <AboutUsItem heading="3105+" content="Best Reviews" />
        </div>
      </div>
      <Vecto style={vecto} />
    </div>
  );
}
export default AboutUs;
