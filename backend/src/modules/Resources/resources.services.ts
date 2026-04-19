import { Resource } from "./resources.models";
import { parseCreateResourceBody } from "./resources.validation";

export const getAll = () => Resource.findAll({ order: [["id", "ASC"]] });

export const create = (body: unknown) => {
  const data = parseCreateResourceBody(body);
  return Resource.create(data);
};

export const resourcesService = {
  getAll,
  create,
};
