import React, { useEffect, useState } from "react";
import * as clientService from "./ClientService";
import ClientItem from "./ClientItem";
import { Client } from "./Client";

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const loadClients = async () => {
    const res = await clientService.getClients();
    const order = res.data.sort((a: any, b: any) => {
      return a.nombre.localeCompare(b.nombre);
    });
    setClients(order);
    setLoading(false);
  };

  const standardDeviation = (data: any[]) => {
    const avg = average(data);
    const squareDiffs = data.map((value) => {
      const diff = parseInt(value.edad) - avg;
      const sqrDiff = diff * diff;
      return sqrDiff;
    });
    const avgSquareDiff = averageStandar(squareDiffs);

    return Math.sqrt(avgSquareDiff);
  };

  const averageStandar = (data: any[]) => {
    const sum = data.reduce((a: any, b: any) => {
      return a + b;
    }, 0);

    const avg = sum / data.length;
    return avg;
  };

  const average = (data: any[]) => {
    const sum = data.reduce((a: any, b: any) => {
      return a + parseInt(b.edad);
    }, 0);

    const avg = sum / data.length;
    return Math.round(avg);
  };

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="row">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Edad</th>
                <th scope="col">Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <ClientItem client={client} key={client.id} />
              ))}
            </tbody>
          </table>
          <h4>
            Promedio de Edad:{" "}
            <span className="badge text-bg-success">{average(clients)}</span>
          </h4>
          <h4>
            Desviación Estándar:{" "}
            <span className="badge text-bg-success">
              {standardDeviation(clients)}
            </span>
          </h4>
        </div>
      )}
    </>
  );
};

export default ClientList;
