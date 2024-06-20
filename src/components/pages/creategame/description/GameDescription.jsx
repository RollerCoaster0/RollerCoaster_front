import React, {useEffect, useRef, useState} from 'react';
import {Box, Paper, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const GameDescription = ({gameInfo, setGameInfo}) => {
    const [name, setName] = useState(gameInfo?.name);
    const [description, setDescription] = useState(gameInfo?.description);
    const [preview, setPreview] = useState(gameInfo?.preview);
    const hasPreview = preview !== null;
    const previewUploadRef = useRef(null);

    const handlePreviewUpload = (e) => {
        setPreview(e.target.files?.[0]);
    }
    return (
        <Paper sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifySelf:'center',
            marginRight:'auto',
            marginLeft:'auto',
            width: '80%',
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '5%',
            justifyContent:'center',
            '@media screen and (width < 1050px)':{
                width: '50%',
                marginLeft:'10%'
            },
            '@media screen and (width < 900px)':{
                width: '40%',
                marginLeft:'9%'
            },
            '@media screen and (width < 1500px) and (width > 1050px)':{
                width: '50%',
                marginLeft:'25%'
            },
            '@media screen and (width < 1300px) and (width > 900)':{
                width: '50%',
                marginLeft:'15%'
            },
        }}>
            <TextField defaultValue={name} onChange={e => setGameInfo({...gameInfo, name: e.target.value})}
                       sx={{width: '80%', fontSize: '40px',}} variant='outlined'
                       InputProps={{disableUnderline: true}}></TextField>
            <div style={{fontSize: 40, marginTop: '100px'}}>
                Preview:
            </div>
            {!hasPreview
                ? <Box sx={{
                    position: 'relative',
                    width: '55%',
                    height: '400px',
                    backgroundColor: 'lightgrey',
                    borderRadius: '10px',
                    opacity: '70%',
                    marginTop: '60px',
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <input style={{display: 'none'}} type='file' accept='img/*' ref={previewUploadRef}
                           onChange={e => handlePreviewUpload(e)}/>
                    <AddCircleIcon sx={{
                        position: 'absolute',
                        left: '270px',
                        top: '180px',
                        fontSize: '60px',
                        opacity: '80%',
                        margin: 'auto',
                        cursor: 'pointer',
                        '@media screen and (width < 1503px)':{
                            width: '50%',
                            left:'85px',

                        }
                    }} onClick={() => previewUploadRef.current.click()}/>
                </Box>
                : <img style={{marginTop: '60px', height: '400px'}} src={URL.createObjectURL(preview)} alt='x'/>}
            <div style={{fontSize: 40, marginTop: '100px'}}>
                Description:
            </div>
            <TextField defaultValue={description} onChange={e => setGameInfo({...gameInfo, description: e.target.value})}
                       sx={{width: '80%', marginTop: '60px'}} variant='outlined' multiline={true} maxRows={16}
                       minRows={16}/>
        </Paper>

    );
}

export default GameDescription;