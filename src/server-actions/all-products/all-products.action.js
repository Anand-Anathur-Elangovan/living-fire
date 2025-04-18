"use server";

import { responsePayload } from "@/src/constants/reponse-payload";
import {
  getAllProducts,
  getFuelTypesRepo,
  getGlassOrientationTypesRepo,
  getInstallationTypesRepo,
  getProductTypesRepo,
  getRangeRepo,
  getSubTypesRepo,
  // searchProducts,
} from "@/src/repo/all-products/all-products.repo";

export const getAllProductsPageDataAction = async ({
  type_id,
  fireplaceType,
  brandType,
  bestSelling,
  searchText,
  subType,
  rangeType,
  installationType,
  glassOrientationType,
}) => {
  const allProducts = await getAllProducts({
    type_id,
    fireplaceType,
    brandType,
    bestSelling,
    searchText,
    subType,
    rangeType,
    installationType,
    glassOrientationType,
  })
    .then((res) =>
      res.map((val) => {
        return val;
      })
    )
    .catch((err) => []);

  return {
    ...responsePayload,
    success: true,
    message: "Fetched All Produucts data",
    result: allProducts,
  };
};

export const getMasterValuesAction = async () => {
  const ranges = await getRangeRepo()
    .then((res) => res)
    .catch((err) => []);
  const fuelTypes = await getFuelTypesRepo()
    .then((res) => res)
    .catch((err) => []);
  const productTypes = await getProductTypesRepo()
    .then((res) => res)
    .catch((err) => []);
  const subTypes = await getSubTypesRepo()
    .then((res) => res)
    .catch((err) => []);
  const installationTypes = await getInstallationTypesRepo()
    .then((res) => res)
    .catch((err) => []);
  const glassOrientationTypes = await getGlassOrientationTypesRepo()
    .then((res) => res)
    .catch((err) => []);

  return {
    ...responsePayload,
    success: true,
    message: "Fetched All Firetypes data",
    result: {
      ranges,
      fuelTypes,
      productTypes,
      subTypes,
      installationTypes,
      glassOrientationTypes,
    },
  };
};
