import { layoutState } from "./modules/layout";

const getters = {
  elementSize: (state: layoutState) => state.elementSize,
}

export default getters;