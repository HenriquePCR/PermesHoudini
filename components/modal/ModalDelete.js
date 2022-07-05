import * as React from 'react';
import { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '../../styles/modalDelete.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30vw',
    height: '20vh',
    bgcolor: '#F7FFF7',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalDelete({ confirmModal, open, setOpen }) {

    const handleClose = () => setOpen(false);

    const [dados, setDados] = useState();


    const handleChange = (value) => {
        console.log(dados)
        setDados((prevValues) => ({
            ...prevValues,
            [value.target.name]: value.target.value,
        }));

    };


    return (
        <div>
            {/* <Button className={styles.button} onClick={handleOpen}>Solicitar novo teste</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={styles.box}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h1 className={styles.titulo}>Deseja mesmo excluir?</h1>
                    </Typography>
                    <div >
                        <button className={styles.buttons}>Sim</button>
                        <button className={styles.buttons}>Não</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}