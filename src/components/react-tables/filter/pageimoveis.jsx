'use client';
import * as React from 'react';
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    Typography,
    TableHead,
    Chip,
    Box,
    Grid, MenuItem,
    Button,
    Divider,
    IconButton, LinearProgress,
} from '@mui/material';
import { Stack } from '@mui/system';
import DownloadCard from 'src/components/shared/DownloadCard';
import { basicsTableData } from './FilterTableDataImoveis';

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    createColumnHelper
} from '@tanstack/react-table'
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconEye, IconMessage } from '@tabler/icons';
import Badge from '@mui/material/Badge';
import Gallery from 'src/components/lightbox/lightbox';

const basics = basicsTableData;

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('imgsrc', {
        header: () => 'Galeria',
        cell: info => {
            const [isGalleryOpen, setIsGalleryOpen] = React.useState(false);
            return (
                <>
                    <Box
                        component="div"
                        onClick={() => setIsGalleryOpen(true)}
                        sx={{
                            width: 200,
                            height: 200,
                            backgroundImage: `url(${info.getValue()})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <Typography variant="body2" color="white">
                            Ver Galeria
                        </Typography>
                    </Box>
                    {isGalleryOpen && <Gallery onClose={() => setIsGalleryOpen(false)} />}
                </>
            );
        },
        enableColumnFilter: false,
    }),
    columnHelper.accessor('endereco', {
        header: () => 'Endereço',
        cell: info => (
            <Typography variant="subtitle1" color="textPrimary">
                {info.getValue()}
            </Typography>
        ),
    }),
    columnHelper.accessor('preco', {
        header: () => 'Preço',
        cell: info => (
            <Typography variant="h6" fontWeight="600">
                R$ {info.getValue().toLocaleString('pt-BR')}
            </Typography>
        ),
    }),
    columnHelper.accessor('id', {
        header: () => 'Ações',
        cell: info => {
            const [anchorEl2, setAnchorEl2] = React.useState(null);

            const handleClick2 = (event) => {
                setAnchorEl2(event.currentTarget);
            };

            return (
                <>
                    <IconButton color="primary" onClick={() => console.log(`Detalhes do imóvel ${info.getValue()}`)}>
                        <IconEye />
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="mostrar 3 novas notificações"
                        color="inherit"
                        aria-controls="msgs-menu"
                        aria-haspopup="true"
                        sx={{
                            ...(anchorEl2 && {
                                color: 'primary.main',
                            }),
                        }}
                        onClick={handleClick2}
                    >
                        <Badge variant="dot" color="primary">
                            <IconMessage size="21" stroke="1.5" />
                        </Badge>
                    </IconButton>
                </>
            );
        },
        enableColumnFilter: false,
    }),
];

const ReactFilterTable = () => {
    const [data, _setData] = React.useState(() => [...basics]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const rerender = React.useReducer(() => ({}), {})[1];

    const table = useReactTable({
        data,
        columns,
        filterFns: {},
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    const handleDownload = () => {
        const headers = ["Galeria", "Endereço", "Preço", "ID"];
        const rows = data.map(item => [
            item.imgsrc,
            item.endereco,
            item.preco,
            item.id,
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(e => e.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "imoveis-data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <DownloadCard title="Tabela de Imóveis" onDownload={handleDownload}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box>
                        <TableContainer>
                            <Table
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <TableHead>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableCell key={header.id} >
                                                    <Typography variant="h6" {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                        onClick: header.column.getToggleSortingHandler(),
                                                    }}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                                    </Typography>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableHead>
                                <TableBody>
                                    {table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Divider />
                        <Stack gap={1} p={3} alignItems="center" direction="row" justifyContent="space-between">
                            <Box display="flex" alignItems="center" gap={1}>
                                <Button variant="contained" color="primary" onClick={() => rerender()}>Forçar Atualização</Button>
                                <Typography variant="body1">{table.getPrePaginationRowModel().rows.length} Linhas</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    <Typography variant="body1">Página</Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {table.getState().pagination.pageIndex + 1} de{' '}
                                        {table.getPageCount()}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" alignItems="center" gap={1}>
                                    | Ir para página:
                                    <CustomTextField
                                        type="number"
                                        min="1"
                                        max={table.getPageCount()}
                                        defaultValue={table.getState().pagination.pageIndex + 1}
                                        onChange={(e) => {
                                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                                            table.setPageIndex(page)
                                        }}
                                    />
                                </Stack>
                                <CustomSelect
                                    value={table.getState().pagination.pageSize}
                                    onChange={(e) => {
                                        table.setPageSize(Number(e.target.value))
                                    }}
                                >
                                    {[10, 15, 20, 25].map(pageSize => (
                                        <MenuItem key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </MenuItem>
                                    ))}
                                </CustomSelect>

                                <IconButton size='small'
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <IconChevronsLeft />
                                </IconButton>
                                <IconButton size='small'
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <IconChevronLeft />
                                </IconButton>
                                <IconButton size='small'
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <IconChevronRight />
                                </IconButton>
                                <IconButton size='small'
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <IconChevronsRight />
                                </IconButton>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </DownloadCard>
    );
};

export default ReactFilterTable;
