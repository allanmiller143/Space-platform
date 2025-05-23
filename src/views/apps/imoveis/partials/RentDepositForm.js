/* eslint-disable react/prop-types */
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
      wantsDeposit: true, // Garante que "wantsDeposit" seja verdadeiro ao abrir o formulário
      depositMultiplier: 1,
      depositInstallments: 1,
    },
  });

  useEffect(() => {
    if (formData?.caucao) {
      reset({
        rentValue: formData.precoDeAluguel || "",
        wantsDeposit: true,
        depositMultiplier: formData.caucao.multiplicador || 1,
        depositInstallments: formData.caucao.maximoParcelas || 1,
      });
      setStep(2); // Avança para o passo 2 se já houver caução configurada
    } else if (formData?.precoDeAluguel) {
      reset({
        rentValue: formData.precoDeAluguel,
        wantsDeposit: true,
        depositMultiplier: 1,
        depositInstallments: 1,
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
                  reset({ wantsDeposit: false });
                  onClose();
                }}
              >
                Não
              </Button>
              <Button
                variant="contained"
                onClick={() => setStep(2)}
              >
                Sim
              </Button>
            </Box>
          </>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" mb={2}>
              Detalhes da Caução
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>
              Informe o valor do aluguel para calcular o valor da caução.
            </Typography>
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
                <Typography variant="body2" color="textSecondary" mt={1}>
                  Escolha quantas vezes o valor do aluguel será usado para calcular a caução.
                </Typography>
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
                      <MenuItem value={1}>1x o aluguel : {watchRentValue}</MenuItem>
                      <MenuItem value={2}>2x o aluguel : {watchRentValue * 2}</MenuItem>
                      <MenuItem value={3}>3x o aluguel : {watchRentValue * 3}</MenuItem>
                    </Select>
                  )}
                />

                <Typography variant="body2" color="textSecondary" mt={2}>
                  Escolha em quantas parcelas o valor da caução será dividido.
                </Typography>
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
