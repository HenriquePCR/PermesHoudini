import React, { useState, useEffect } from 'react'
import SortTable from '../components/table.js'
import axios from "axios"
import styles from '../styles/estoque.module.css'
import ModalMateriais from '../components/modal/ModalMateriais'
import Header from '../components/header/HeaderGerente'
import ModalDelete from '../components/modal/ModalDelete'
import Button from '@mui/material/Button';
import LoaderSpinner from '../components/LoaderSpinner';

function GerenteMateriais() {

    const [dados, setDados] = useState([]);
    const [deleteID, setDeleteID] = useState('');
    const [type, setType] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [dadosMat, setDadosMat] = useState([]);
    const [helperEffect, setHelperEffect] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/materiais`)
            .then((c) => {
                setDados(c.data.rows);
                setHelperEffect(false)
            }
            )
    }, [helperEffect]);

    const handleClickAdd = (material) => {
        const id = Math.floor(Math.random() * 100 + 20);
        console.log('add')
        console.log(material)
        axios.post(`http://localhost:3001/postMateriais`, {
            nome: material.nome,
            quantidade: material.quantidade,
            id_material: id,
        })
            .then(function (response) {
                console.log(response);
                setHelperEffect(true)
            })
    }

    const handleClickEdit = (material) => {
        console.log('edit')
        console.log(material)
        axios.put(`http://localhost:3001/putMateriais/${material.id_material}`, {
            nome: material.nome,
            quantidade: material.quantidade,
        })
            .then(function (response) {
                console.log(response);
                setHelperEffect([])
            })
    }

    const handleDeleteClick = (id) => {
        console.log('delete')
        console.log(id)
        axios.delete(`http://localhost:3001/deleteMateriais/${id[1]}`)
            .then(function (response) {
                console.log(response);
                setHelperEffect([])
            })

    }


    const handleEdit = (material) => {
        console.log(material);
        setDadosMat({
            nome: material[1],
            quantidade: material[2],
            id_material: material[0]
        })
        setType(false);
        handleOpen()

    }
    const handleAdd = () => {
        setDadosMat([])
        setType(true);
        handleOpen()
    }

    const handleDelete = (id) => {
        setDeleteID(id)
        handleOpenDelete(true)
    }


    const handleOpen = () => setOpen(true);

    const handleOpenDelete = () => setOpenDelete(true);

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID_material',
                accessor: '0',
            },
            {
                Header: 'Nome',
                accessor: '1',
            },
            {
                Header: 'Quantidade',
                accessor: '2',
            },
            {
                Header: 'Opções',
                accessor: 'options',
                Cell: (value) => {
                    return (
                        <>
                            <span className="buttons">
                                <button
                                    className="TableButton"
                                    type="button"
                                    onClick={() => handleEdit(value.cell.row.original)}
                                >
                                    Editar
                                </button>{' '}
                                <div>

                                </div>
                                <button
                                    className="TableButton"
                                    onClick={() => handleDelete(value.cell.row.original)}
                                >
                                    Excluir
                                </button>
                                <style jsx>{`
                                .TableButton{
                                    background-color:#791E94;
                                    color: white;
                                    border-radius: 10px;
                                    padding: 5px;
                                    border-color: #791E94;
                                }
                                .buttons{
                                display: flex;
                                justify-content: space-around;
                                }
                                `}</style>
                            </span>


                        </>
                    );
                }
            }
        ],
        []
    );


    return (
        <div >
            <Header />
            <div className={styles.estoque}>
                <h1 className={styles.titulo}>Estoque</h1>
                <div className={styles.cimaDaTabela}>
                    <ModalDelete open={openDelete} setOpen={setOpenDelete} id={deleteID} confirmModal={(id) => handleDeleteClick(id)}></ModalDelete>
                    <Button className={styles.button} onClick={handleAdd}>Solicitar novo teste</Button>
                    <ModalMateriais open={open} setOpen={setOpen} dados={dadosMat} setDados={setDadosMat} type={type} confirmModal={(material) => {
                        type ? handleClickAdd(material) : handleClickEdit(material)
                    }} />
                </div>
                <>
                    {
                        helperEffect ? <LoaderSpinner></LoaderSpinner> :
                            <SortTable InitialPageSize={10} columns={columns} data={dados}></SortTable>
                    }
                </ >
            </div>
        </div >

    )
}

export default GerenteMateriais;
