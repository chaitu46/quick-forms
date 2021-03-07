import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function FieldCornerControls({
  deleteFieldValues,
  fieldDetails,
  updateFieldValues,
}) {
  return (
    <div className="field-corner">
      <button
        className="button button--link"
        onClick={() => deleteFieldValues(fieldDetails.id)}
      >
        <RiDeleteBinLine size="30px" />
      </button>
      <FormControlLabel
        control={
          <Switch
            checked={fieldDetails.required}
            color="primary"
            onChange={() =>
              updateFieldValues(
                {
                  ...fieldDetails,
                  required: !fieldDetails.required,
                },
                true
              )
            }
            name="required"
            inputProps={{
              "aria-label": `Make ${fieldDetails.title} required if you wanted to.`,
            }}
          />
        }
        label="Required"
      />
    </div>
  );
}
