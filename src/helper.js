import { v4 as uuidv4 } from "uuid";
import { INITIAL_FIELD_VALUES, INITIAL_FORM_VALUES } from "./constants";

export const getInitialFormValues = () => ({
  ...INITIAL_FORM_VALUES,
  id: uuidv4(),
  fields: [{ ...INITIAL_FIELD_VALUES, id: uuidv4() }],
});

export const getInitialFieldValues = () => ({
  ...INITIAL_FIELD_VALUES,
  id: uuidv4(),
});
