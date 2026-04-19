import { Resource } from "./resources.models";

export const getAll = () => Resource.findAll();
export const create = (data: any) => Resource.create(data);

export const resourcesService = {
  getAll,
  create,
};
