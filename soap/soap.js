import soap from "soap";

// Create SOAP Client
export default async ({ wsdl, options = {}, authorization = {} }) => {
  try {
    const client = await soap.createClientAsync(wsdl, options);

    if (authorization.type || authorization.params) {
      const security = new soap.BasicAuthSecurity(
        authorization.username,
        authorization.password
      );
      client.setSecurity(security);
    }
    return client;
  } catch (err) {
    throw new Error("Error al crear el cliente SOAP");
  }
};
