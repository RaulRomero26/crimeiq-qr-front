import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export const CrearTarea = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  console.log("ERRORES DEL FORM", errors);

    const handleCreateTarea = async(data) => {
        console.log("Datos a enviar al backend:", data);
        try {
            const response = await fetch("http://127.0.0.1:5000/crear_tarea", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
      
            if (response.ok) {
              console.log("Datos enviados correctamente al backend");
              const responseData = await response.json();
              console.log(responseData)
              
            } else {
              console.error("Error al enviar los datos al backend");
            }
          } catch (error) {
            console.error("Error de red:", error);
          }
    }

  return (
    <>
    <div className="row justify-content-center">
        <div className="col-md-8">
            <form onSubmit={handleSubmit(handleCreateTarea)}>
                <div className="form-group">
                    <label className="form-label" htmlFor="usuario">Usuario:</label>
                    <select
                        className="form-control"
                        id="usuario"
                        name="usuario"
                        {...register("usuario", {
                            required: "El usuario es requerido",
                        })}
                    >
                        <option value="">Seleccionar usuario</option>
                        <option value="usuario1">Usuario 1</option>
                        <option value="usuario2">Usuario 2</option>
                        <option value="usuario3">Usuario 3</option>
                    </select>
                    <ErrorMessage
                        errors={errors}
                        name="usuario"
                        render={({ message }) => <p className="invalid-form">{message}</p>}
                    />
                </div>
                <div className="form-group">
                <label className="form-label" htmlFor="nombre">Nombre de la tarea:</label>
                <input
                    className="form-control"
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
                <label className="form-label" htmlFor="mensaje">Mensaje:</label>
                <input
                    className="form-control"
                    type="text"
                    id="mensaje"
                    name="mensaje"
                    {...register("mensaje", {
                    required: "El mensaje es requerida",
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="mensaje"
                    render={({ message }) => <p className="invalid-form">{message}</p>}
                />
                </div>
                <div className="form-group">
                <label className="form-label" htmlFor="descripcion">Descripcion/Instucciones de la Tarea:</label>
                <textarea
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    {...register("descripcion", {
                    required: "La descripción es requerida",
                    })}
                />
                <ErrorMessage
                    errors={errors}
                    name="descripcion"
                    render={({ message }) => <p className="invalid-form">{message}</p>}
                />
                </div>
                <div className="form-group">
                <label className="form-label" htmlFor="notas_adicionales">Notas adicionales:</label>
                <textarea
                    className="form-control"
                    id="notas_adicionales"
                    name="notas_adicionales"
                    {...register("notas_adicionales")}
                />
                </div>
                <button className="btn btn-success my-2" type="submit">CREAR TAREA</button>
            </form>
        </div>
    </div>
    </>
  );
};
