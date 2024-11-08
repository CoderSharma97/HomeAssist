import Banner from "../components/Banner";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopProfessionals from "../components/TopProfessionals";

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopProfessionals />
      <Banner />
    </div>
  );
};

export default Home;
