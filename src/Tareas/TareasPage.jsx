import React from "react";
import "./TareasPage.css";
import { CrearTarea } from "./CrearTarea";
import { ReadTareas } from "./ReadTareas";

export const TareasPage = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center titulo">
              ADMINISTRAR <span className="resaltar">TAREAS</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="container container-space">
        <div className="row">
          <div className="col-md-12">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Agregar Tareas
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Tareas Agregadas
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <CrearTarea/>
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <ReadTareas/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
