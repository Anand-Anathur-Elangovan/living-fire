"use client";
import Image from "next/image";
import paulLogo from "@/public/assets/homePage/ourBrands/paulLogo.png";
import cocoonLogo from "@/public/assets/homePage/ourBrands/cocoonLogo.png";
import stovaxLogo from "@/public/assets/homePage/ourBrands/stovaxLogo.png";
import charnLogo from "@/public/assets/homePage/ourBrands/charnLogo.png";
import hergomLogo from "@/public/assets/homePage/ourBrands/hergomLogo.png";
import regencyLogo from "@/public/assets/homePage/ourBrands/regencyLogo.png";
import kaloraLogo from "@/public/assets/homePage/ourBrands/kaloraLogo.png";
import austroLogo from "@/public/assets/homePage/ourBrands/austroLogo.png";
import esseLogo from "@/public/assets/homePage/ourBrands/esseLogo.png";
import morsoLogo from "@/public/assets/homePage/ourBrands/morsoLogo.png";
import adfLogo from "@/public/assets/homePage/ourBrands/adfLogo.png";
import heatLogo from "@/public/assets/homePage/ourBrands/heatLogo.png";
import fireLogo from "@/public/assets/homePage/ourBrands/fireLogo.png";
import "./ourBrands.css";
const OurBrands = () => {
  return (
    <section>
      <div className="our-brands">
        <div className="brands-col">
          <div className="heading">
            <p>Our Brands</p>
          </div>
          <div className="rowlogo">
            <div className="gridlogo">
              <Image src={paulLogo} alt="Paul Logo" className="logo" />
              <Image src={cocoonLogo} alt="Cocoon Logo" className="logo" />
              <Image src={stovaxLogo} alt="Stovax Logo" className="logo" />
              <div className="charnwood">
                <Image
                  src={charnLogo}
                  alt="Charnwood Logo"
                  className="charnwoodlogo"
                />
              </div>
              <Image src={hergomLogo} alt="Hergom Logo" className="logo" />
              <Image src={regencyLogo} alt="Regency Logo" className="logo" />
              <div className="columnlogobb">
                <div>
                  <Image src={kaloraLogo} alt="Kalora Logo" className="logo" />
                </div>
                <div>
                  <Image
                    src={austroLogo}
                    alt="Austroflamm Logo"
                    className="logo"
                  />
                </div>
              </div>
              <div className="austroflamm">
                <Image src={esseLogo} alt="Esse Logo" className="logo" />
              </div>
              <div className="austroflamm">
                <Image src={morsoLogo} alt="Morso Logo" className="logo" />
              </div>
              <div className="austroflamm">
                <Image src={adfLogo} alt="ADF Logo" className="logo" />
              </div>
              <div className="austroflamm">
                <Image src={heatLogo} alt="Heat Logo" className="logo" />
              </div>
              <div className="austroflamm">
                <Image
                  src={fireLogo}
                  alt="Fire Logo"
                  className="heatmasterlogo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurBrands;
