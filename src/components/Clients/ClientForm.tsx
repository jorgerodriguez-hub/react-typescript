import React, { ChangeEvent, FormEvent, useState } from "react";
import * as clientService from "./ClientService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Client } from "./Client";
import moment from "moment";

const ClientForm = () => {
  const navigate = useNavigate();

  const initialState = {
    nombre: "",
    apellido: "",
    edad: "",
    fecha_nacimiento: "",
  };

  const [client, setClient] = useState<Client>(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "fecha_nacimiento") {
      let formatDate = moment(e.target.value).format("D/MM/YYYY");
      setClient({ ...client, [e.target.name]: formatDate });
    } else {
      setClient({ ...client, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await clientService.createClient(client);
    toast.success("Cliente agregado!");
    setClient(initialState);
    navigate("/");
  };

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card my-auto">
          <div className="card-body">
            <h4>Nuevo Cliente</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  placeholder="¿Cuál es tu nombre?"
                  className="form-control"
                  onChange={handleInputChange}
                  value={client.nombre}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="apellido"
                  placeholder="¿Cuál es tu apellido?"
                  className="form-control"
                  onChange={handleInputChange}
                  value={client.apellido}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="edad"
                  placeholder="¿Cúantos años tienes?"
                  className="form-control"
                  onChange={handleInputChange}
                  value={client.edad}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="fecha_nacimiento"
                  placeholder="¿Tu fecha de nacimiento?"
                  className="form-control"
                  onChange={handleInputChange}
                  onFocus={(e) => (e.target.type = "date")}
                  required
                />
              </div>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-dark mt-4">Crear Cliente</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientForm;
