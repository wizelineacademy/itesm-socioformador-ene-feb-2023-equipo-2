import React from "react";
import Image from "next/image";

//images
import imgExample from "src/images/wizeline_bckground.png";

const perfil = () => {
  return (
    <div className="container mt-5">
      <div className="row  vh-100 position-relative ali">
        <div className="col-3">
          <div className="card align-items-center">
            <div className="card-body">
              <Image
                src={imgExample}
                alt="Wizeline Background"
                loading="eager"
                width={200}
                height={200}
                className="makeImageCircular mt-4"
              />
              <br />
              <br />
              <h5 className="card-title">Andres Fuentes Alanis</h5>
              <p className="card-text">Gerente de Ingeniería</p>
              <br />
              <br />
            </div>
          </div>

          <button type="button" className="btn btn-primary w-100 mt-3 p-3">
            Ver Roadmap
          </button>
          <button type="button" className="btn btn-secondary w-100 mt-3 p-3">
            Editar perfil
          </button>
        </div>
        <div className="col-9">
          <div className="container">
            <div className="row vh-25 m-2">
              <div id="profileCardSize1" className="col-6">
                <div className="card w-100 h-100 align-items-center">
                  <div className="card-body">ANDRES SE LA PELA</div>
                </div>
              </div>
              <div id="profileCardSize1" className="col-6">
                <div className="card w-100 h-100 align-items-center">
                  <div className="card-body">ANDRES SE LA PELA</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row m-3">
            <div id="profileCardSize2" className="col-12">
              <div className="card w-100 h-100 align-items-center">
                <div className="card-body">ANDRES SE LA PELA</div>
              </div>
            </div>
          </div>
          <div className="row m-3">
            <div id="profileCardSize2" className="col-12">
              <div className="card w-100 h-100 align-items-center">
                <div className="card-body">MARIO SE LA PELA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default perfil;
