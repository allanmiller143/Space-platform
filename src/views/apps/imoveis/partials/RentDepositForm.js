import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  rentValue: yup
    .number()
    .typeError("O valor do aluguel deve ser um número")
    .min(1, "O valor do aluguel deve ser maior que zero")
    .required("O valor do aluguel é obrigatório"),
  wantsDeposit: yup.boolean(),
  depositInstallments: yup
    .number()
    .nullable()
    .when("wantsDeposit", {
      is: true,
      then: (schema) =>
        schema.required("O número de parcelas é obrigatório").min(1).max(10),
    }),
  depositMultiplier: yup
    .number()
    .nullable()
    .when("wantsDeposit", {
      is: true,
      then: (schema) =>
        schema.required("A quantidade de caução é obrigatória").min(1).max(3),
    }),
});

const RentDepositForm = ({ open, onClose, formData, setFormData }) => {
  const [depositValue, setDepositValue] = useState(0);
  const [step, setStep] = useState(1);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rentValue: "",
      wantsDeposit: false,
      depositMultiplier: 1,
      depositInstallments: 1,
    },
  });

  useEffect(() => {
    if (formData?.precoDeAluguel) {
      reset({
        rentValue: formData.precoDeAluguel,
        wantsDeposit: !!formData.caucao,
        depositMultiplier: formData.caucao?.multiplicador || 1,
        depositInstallments: formData.caucao?.maximoParcelas || 1,
      });
    }
  }, [formData, reset]);

  const watchWantsDeposit = watch("wantsDeposit");
  const watchRentValue = watch("rentValue");
  const watchDepositMultiplier = watch("depositMultiplier");

  useEffect(() => {
    if (watchWantsDeposit && watchRentValue && watchDepositMultiplier) {
      setDepositValue(watchRentValue * watchDepositMultiplier);
    }
  }, [watchRentValue, watchDepositMultiplier, watchWantsDeposit]);

  const onSubmit = (data) => {
    const caucao = {
      valorTotal: data.rentValue * data.depositMultiplier,
      aluguel: data.rentValue,
      multiplicador: data.depositMultiplier,
      maximoParcelas: data.depositInstallments,
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      precoDeAluguel: data.rentValue,
      caucao: caucao,
    }));

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Configurar Caução</DialogTitle>
      <DialogContent>
        {step === 1 && (
          <>
            <Typography variant="body1" mb={2}>
              A caução é uma garantia financeira baseada no valor do aluguel. Ela serve para
              cobrir possíveis inadimplências ou danos ao imóvel.
            </Typography>
            <Typography variant="body2" mb={2}>
              Deseja configurar caução para este aluguel?
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                onClick={() => {
                  setStep(2);
                  reset({ wantsDeposit: false });
                }}
              >
                Não
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setStep(2);
                  reset({ wantsDeposit: true });
                }}
              >
                Sim
              </Button>
            </Box>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="rentValue"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Valor do Aluguel (R$)"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.rentValue}
                  helperText={errors.rentValue?.message}
                />
              )}
            />

            {watchWantsDeposit && (
              <>
                <Controller
                  name="depositMultiplier"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      fullWidth
                      margin="normal"
                      error={!!errors.depositMultiplier}
                      displayEmpty
                    >
                      <MenuItem value={1}>1x o aluguel</MenuItem>
                      <MenuItem value={2}>2x o aluguel</MenuItem>
                      <MenuItem value={3}>3x o aluguel</MenuItem>
                    </Select>
                  )}
                />
                <Controller
                  name="depositInstallments"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      fullWidth
                      margin="normal"
                      error={!!errors.depositInstallments}
                      displayEmpty
                    >
                      {Array.from({ length: 10 }, (_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>
                          {i + 1} parcela{`${i > 0 ? "s" : ""}`}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <Box mt={2}>
                  <Typography variant="body2">
                    Valor total da caução: <strong>R$ {depositValue.toFixed(2)}</strong>
                  </Typography>
                </Box>
              </>
            )}
          </form>
        )}
      </DialogContent>
      <DialogActions>
        {step === 2 && (
          <>
            <Button onClick={() => setStep(1)} color="secondary">
              Voltar
            </Button>
            <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
              Confirmar
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RentDepositForm;
