import INTFileUploader from "@/components/Forms/FileUpload";
import INTForm from "@/components/Forms/Form";
import INTInput from "@/components/Forms/Input";
import INTModal from "@/components/shared/INTModal/INTModal";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateStateModal = ({ open, setOpen }: TProps) => {
  const submitHandler = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <INTModal
      sx={{ width: "450px", mx: "auto", textAlign: "center" }}
      open={open}
      setOpen={setOpen}
      title="Create States"
    >
      <INTForm onSubmit={submitHandler}>
        <Grid
          container
          spacing={2}
          sx={{ marginTop: 1, justifyContent: "center" }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {/* <INTAutoComplete name='state' label='State' options={state} /> */}
            <INTInput name="city" label="State" sx={{ width: "300px" }} />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <INTFileUploader name="file" />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Create a State
            </Button>
          </Grid>
        </Grid>
      </INTForm>
    </INTModal>
  );
};

export default CreateStateModal;
