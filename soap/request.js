import Soap from "./soap.js";
import dotenv from "dotenv";
dotenv.config();

export default async function (queryData) {
  // Json (XML) for the request in SOAP service
  const xmlJson = { ...queryData };

  try {
    const {
      SOAP_USER: username,
      SOAP_PASSWORD: password,
      SOAP_WSDL: wsdl,
    } = process.env;

    if (!username || !password || !wsdl)
      throw new Error(
        "No existe la configuración para consultar al servicio SOAP",
        400
      );

    // * Conexión SOAP
    const soapConnection = await Soap({
      wsdl,
      authorization: { username, password },
    });

    // * Consultas de la conexión SOAP
    const value = await soapConnection
      .SayHelloAsync(xmlJson)
      .then((result) => result[0])
      .catch((err) => {});

    if (!value)
      throw new Error(`Error al consultar al DINARDAP la identificación`);

    return value;
  } catch (err) {
    throw new Error(err);
  }
}
