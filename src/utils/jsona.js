import Jsona from "jsona";

export const dataFormatter = new Jsona({
  // If you want camelCase attributes instead of snake_case:
  keyForAttribute: "camelCase",
});