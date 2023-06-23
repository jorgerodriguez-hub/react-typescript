import { Client } from "./Client";

interface Props {
  client: Client;
}

const ClientItem = ({ client }: Props) => {
  return (
    <tr>
      <th scope="row"></th>
      <td>{client.nombre}</td>
      <td>{client.apellido}</td>
      <td>{client.edad}</td>
      <td>{client.fecha_nacimiento}</td>
    </tr>
  );
};

export default ClientItem;
