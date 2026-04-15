import type { Place } from "../types";

export const categories = ["Educación", "Noticias", "Recursos", "Asociaciones", "Salud"];

const empty = { bio: "", address1: "", address2: "", city: "", province: "", postalCode: "", phone: undefined, email: undefined };

export const mapPlaces: Place[] = [
  {
    id: 1, slug: "asociacion-centro", ...empty,
    name: "Asociación Centro", type: "Asociación", area: "Madrid Centro", country: "España",
    description: "Espacio informativo y comunitario con enfoque responsable.",
    address: "Centro, Madrid", hours: "L–V · 10:00–19:00",
  },
  {
    id: 2, slug: "recurso-retiro", ...empty,
    name: "Recurso Retiro", type: "Recurso", area: "Retiro", country: "España",
    description: "Punto de referencia con información práctica y actualizada.",
    address: "Retiro, Madrid", hours: "L–S · 11:00–20:00",
  },
  {
    id: 3, slug: "guia-chamberi", ...empty,
    name: "Guía Chamberí", type: "Educación", area: "Chamberí", country: "España",
    description: "Contenido útil y orientación pensada para el día a día.",
    address: "Chamberí, Madrid", hours: "Cita previa",
  },
];
