import React from 'react';
import {
    Avatar,
    Box,
    CardContent,
    Grid,
    IconButton,
    Typography,
    Tooltip,
    Button,
    Stack
} from '@mui/material';

// componentes
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import { IconCirclePlus, IconCreditCard, IconPackage, IconPencilMinus } from '@tabler/icons';

const BillsTab = () => {
    return (
        <>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} lg={9}>
                    <BlankCard>
                        <CardContent>
                            <Typography variant="h4" mb={2}>
                                Informações de Cobrança
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-bname">
                                        Nome da Empresa*
                                    </CustomFormLabel>
                                    <CustomTextField
                                        id="text-bname"
                                        value="Visitor Analytics"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-bsector">
                                        Setor da Empresa*
                                    </CustomFormLabel>
                                    <CustomTextField
                                        id="text-bsector"
                                        value="Artes, Mídia e Entretenimento"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-baddress">
                                        Endereço da Empresa*
                                    </CustomFormLabel>
                                    <CustomTextField id="text-baddress" value="" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-bcy">
                                        País*
                                    </CustomFormLabel>
                                    <CustomTextField id="text-bcy" value="Romênia" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-fname">
                                        Nome*
                                    </CustomFormLabel>
                                    <CustomTextField id="text-fname" value="" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel sx={{ mt: 0 }} htmlFor="text-lname">
                                        Sobrenome*
                                    </CustomFormLabel>
                                    <CustomTextField id="text-lname" value="" variant="outlined" fullWidth />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </BlankCard>
                </Grid>

                {/* 2 */}
                <Grid item xs={12} lg={9}>
                    <BlankCard>
                        <CardContent>
                            <Typography variant="h4" display="flex" mb={2}>
                                Plano Atual:
                                <Typography variant="h4" component="div" ml="2px" color="success.main">
                                    Executivo
                                </Typography>
                            </Typography>
                            <Typography color="textSecondary">
                                Obrigado por ser um membro premium e apoiar nosso desenvolvimento.
                            </Typography>

                            {/* lista 1 */}
                            <Stack direction="row" spacing={2} mt={4} mb={2}>
                                <Avatar
                                    variant="rounded"
                                    sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                                >
                                    <IconPackage size="22" />
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        Plano Atual
                                    </Typography>
                                    <Typography variant="h6" mb={1}>
                                        750.000 Visitas Mensais
                                    </Typography>
                                </Box>
                                <Box sx={{ ml: 'auto !important' }}>
                                    <Tooltip title="Adicionar">
                                        <IconButton>
                                            <IconCirclePlus size="22" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>

                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" color="primary">
                                    Alterar Plano
                                </Button>
                                <Button variant="outlined" color="error">
                                    Redefinir Plano
                                </Button>
                            </Stack>
                        </CardContent>
                    </BlankCard>
                </Grid>

                {/* 3 */}
                <Grid item xs={12} lg={9}>
                    <BlankCard>
                        <CardContent>
                            <Typography variant="h4" mb={2}>
                                Método de Pagamento
                            </Typography>
                            <Typography color="textSecondary">Em 26 de dezembro de 2023</Typography>
                            {/* lista 1 */}
                            <Stack direction="row" spacing={2} mt={4}>
                                <Avatar
                                    variant="rounded"
                                    sx={{ bgcolor: 'grey.100', color: 'grey.500', width: 48, height: 48 }}
                                >
                                    <IconCreditCard size="22" />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" mb={1}>
                                        Visa
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        *****2102
                                    </Typography>
                                </Box>
                                <Box sx={{ ml: 'auto !important' }}>
                                    <Tooltip title="Editar">
                                        <IconButton>
                                            <IconPencilMinus size="22" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>
                            <Typography color="textSecondary" my={1}>
                                Se você atualizou seu método de pagamento, ele só será exibido aqui após o próximo ciclo de faturamento.
                            </Typography>
                            <Button variant="outlined" color="error">
                                Cancelar Assinatura
                            </Button>
                        </CardContent>
                    </BlankCard>
                </Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
                <Button size="large" variant="contained" color="primary">
                    Salvar
                </Button>
                <Button size="large" variant="text" color="error">
                    Cancelar
                </Button>
            </Stack>
        </>
    );
};

export default BillsTab;
