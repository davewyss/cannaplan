import type { Place } from "../types";

export const categories = ["Educación", "Noticias", "Recursos", "Asociaciones", "Salud"];

export const mapPlaces: Place[] = [
  {
    id: 1,
    slug: "asociacion-centro",
    name: "Asociación Centro",
    type: "Asociación",
    area: "Madrid Centro",
    country: "España",
    description: "Espacio informativo y comunitario con enfoque responsable.",
    address: "Centro, Madrid",
    hours: "L–V · 10:00–19:00",
  },
  {
    id: 2,
    slug: "recurso-retiro",
    name: "Recurso Retiro",
    type: "Recurso",
    area: "Retiro",
    country: "España",
    description: "Punto de referencia con información práctica y actualizada.",
    address: "Retiro, Madrid",
    hours: "L–S · 11:00–20:00",
  },
  {
    id: 3,
    slug: "guia-chamberi",
    name: "Guía Chamberí",
    type: "Educación",
    area: "Chamberí",
    country: "España",
    description: "Contenido útil y orientación pensada para el día a día.",
    address: "Chamberí, Madrid",
    hours: "Cita previa",
  },
];
