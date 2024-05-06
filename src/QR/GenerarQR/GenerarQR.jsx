import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import "./GenerarQR.css";

export const GenerateQR = () => {
  const [generatedSuccessfully, setGeneratedSuccessfully] = useState(false);
  const [qrImagePath, setQrImagePath] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  console.log("ERRORES DEL FORM", errors);
  const handleClose = () => {
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    reset();
    setGeneratedSuccessfully(false);
    setQrImagePath(null);
  };

  const handleCreateQRCode = async (data) => {
    console.log("Datos a enviar al backend:", data);

    try {
      const response = await fetch("http://127.0.0.1:5000/generar_qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Datos enviados correctamente al backend");
        const responseData = await response.json();

        if (responseData.mensaje && responseData.ruta) {
          setGeneratedSuccessfully(true);
          setQrImagePath(responseData.ruta);
        }
      } else {
        console.error("Error al enviar los datos al backend");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Generador de QR</Modal.Title>
      </Modal.Header>
      <Modal.Body className="form-container">
        <form onSubmit={handleSubmit(handleCreateQRCode)}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              {...register("nombre", {
                required: "El nombre es requerido",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="nombre"
              render={({ message }) => <p className="invalid-form">{message}</p>}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ubicacion">
              Ubicación: (Dirección/Local/Casa):
            </label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              {...register("ubicacion", {
                required: "La ubicación es requerida",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="ubicacion"
              render={({ message }) => <p className="invalid-form">{message}</p>}
            />
          </div>
          <div className="form-group">
            <label htmlFor="coordenadas">Coordenadas:</label>
            <input
              type="text"
              id="lat"
              name="lat"
              placeholder="Lat"
              {...register("lat", {
                required: "La latitud es requerida",
                pattern: {
                  value: /^-?\d+\.\d+$/,
                  message: "Formato de latitud incorrecto",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="lat"
              render={({ message }) => <p className="invalid-form">{message}</p>}
            />
            <input
              type="text"
              id="log"
              name="log"
              placeholder="Log"
              {...register("log", {
                required: "La longitud es requerida",
                pattern: {
                  value: /^-?\d+\.\d+$/,
                  message: "Formato de longitud incorrecto",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="log"
              render={({ message }) => <p className="invalid-form">{message}</p>}
            />
          </div>
          <div className="form-group">
            <label htmlFor="observaciones">Recomendaciones del punto:</label>
            <textarea
              id="observaciones"
              name="observaciones"
              {...register("observaciones")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombreArchivo">Nombre del Archivo Qr:</label>
            <input
              type="text"
              id="nombreArchivo"
              name="nombreArchivo"
              {...register("nombreArchivo", {
                required: "El nombre es requerido",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="nombreArchivo"
              render={({ message }) => <p className="invalid-form">{message}</p>}
            />
          </div>
          <button type="submit">CREAR</button>
          <button type="button" onClick={handleClose}>
            CERRAR
          </button>
        </form>

        {generatedSuccessfully && qrImagePath && (
          <div className="success-message-container">
            <p style={{ color: "black" }}>
              ¡Tu código se ha generado correctamente!
            </p>
            <a href={qrImagePath} download style={{ color: "black" }}>
              Descargar aquí
            </a>
          </div>
        )}
      </Modal.Body>
    </>
  );
};
