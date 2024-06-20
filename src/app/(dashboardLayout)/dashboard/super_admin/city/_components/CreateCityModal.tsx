
import INTDynamicSelect from "@/components/Forms/DynamicSelect";
import INTFileUploader from "@/components/Forms/FileUpload";
import INTForm from "@/components/Forms/Form";
import INTInput from "@/components/Forms/Input";
import INTModal from "@/components/shared/INTModal/INTModal";
import { state } from "@/utils/state";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCityModal = ({ open, setOpen }: TProps) => {
  const submitHandler = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <INTModal
      sx={{ width: "450px", mx: "auto", textAlign: "center" }}
      open={open}
      setOpen={setOpen}
      title="Create City "
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
            sm={12}
            md={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <INTDynamicSelect
              name="state"
              label="Select State"
              options={state}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <INTInput
              name="city"
              label="Name Of City"
              sx={{ width: "300px" }}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <INTFileUploader name="file" />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" color="primary">
              Create a City
            </Button>
          </Grid>
        </Grid>
      </INTForm>
    </INTModal>
  );
};

export default CreateCityModal;
