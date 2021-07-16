import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response) {
  if (request.method === "POST") {
    const TOKEN = "15ee2a255543a99aeed471bd2350c9";
    const client = new SiteClient(TOKEN);
    const registroCriado = await client.items.create({
      itemType: "973654", //id do model de "communities" criado pelo dato
      ...request.body,
      // title: "Madruga665",
      // imageUrl: "http://github.com/madruga665.png",
      // creatorSlug: "madruga665",
    });
    response.json({
      dados: "xablau",
      registroCriado: registroCriado,
    });
    return;
  }
  response.status(404).json({
    message: "Ainda não temos nada no GET, mas no POST tem!",
  });
}
