import React, {useEffect, useRef, useState} from 'react';
import {
    Badge,
    Button,
    Card,
    CardContent,
    CardMedia,
    ClickAwayListener,
    Collapse,
    IconButton
} from "@mui/material";
import './NPCs.css'
import DeleteIcon from "@mui/icons-material/Delete";
import NPCcardInfo from "./NPCcardInfo";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NPClocationPickModal from "./NPClocationPickModal";

const NPCcard = ({NPC, setNPCs, NPCs, locations}) => {
    const [editMode, setEditMode] = useState(false);
    const uploadImageRef = useRef(null);
    const [NPCname, setNPCname] = useState(NPC?.name);
    const [NPClocation, setNPClocation] = useState(NPC?.location);
    const [NPCavatar, setNPCavatar] = useState(NPC?.avatar);
    const [openLocationsPickModal, setOpenLocationsPickModal] = useState(false);
    const [errorShown, setErrorShown] = useState(false);
    const currentError = useRef('');
    useEffect(() => {
        setEditMode(NPC?.name === '');
    }, []);
    console.log(NPC)
    const onCancel = (NPC) => {
        if (NPC.name === '' || NPC.location === null) {
            console.log('FIRES')
            onDelete();
            return;
        }
        setEditMode(false);
    }
    const onClick = (e) => {
        e.stopPropagation();
        setEditMode(true);
    }

    const onDelete = () => {
        console.log('DELETES')
        setNPCs(NPCs.filter(npc => npc.id !== NPC.id));
    }
    const onSave = (e) => {
        e.stopPropagation();
        const res = validateNPCname(NPCname);
        if (!res.ok) {
            showError(res.message);
            return;
        }
        setNPCs(NPCs.map(npc => {
            if (npc.id === NPC.id) {
                return {name: NPCname, location: NPClocation, avatar: NPCavatar, id: NPC.id};
            }
            return npc;
        }));
        setEditMode(false);
    }

    const handleMapUpload = (e) => {
        setNPCavatar(e.target.files?.[0]);
    }

    const getBackgroundImage = () => {
        if (NPClocation === null || NPClocation.map === null) return null;
        return `url(${URL.createObjectURL(NPClocation.map)})`;
    }

    const showError = (message) => {
        currentError.current = message;
        setErrorShown(true);
        setTimeout(() => {
            setErrorShown(false);
        }, 1000);
    }

    return (
        <>
            <ClickAwayListener onClickAway={() => onCancel(NPC)}>
                <Badge badgeContent={editMode ?
                    <IconButton onClick={onDelete}> <DeleteIcon color='error'/></IconButton> : null}>
                    <div className='npcs__npc-card-wrapper' onClick={e => onClick(e)}>
                        <Card sx={{
                            position: 'relative',
                            backgroundImage: getBackgroundImage(),
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '10px'
                        }}>
                            <CardMedia sx={{
                                position: 'relative',
                                zIndex: 200,
                                display: 'block',
                                marginTop: '20px',
                                borderRadius: '20px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: 200,
                                height: 250
                            }} component='img' src={NPCavatar !== null ? URL.createObjectURL(NPCavatar) : null}
                                       title='avatar'/>
                            {editMode
                                ? <div className='npcs__npc-card__new-npc-avatar-wrapper'>
                                    <input type='file' accept='image/*' style={{display: "none"}} ref={uploadImageRef}
                                           onChange={e => handleMapUpload(e)}/>
                                    <AddCircleIcon className='npcs__npc-card__new-npc-avatar-wrapper__add-button'
                                                   sx={{fontSize: 60}} onClick={() => uploadImageRef.current.click()}/>
                                </div>
                                : null}
                            <CardContent>
                                {!editMode ? <div className='npcs__npc-card__npc-info__background'/> : null}
                                <NPCcardInfo name={NPC?.name} location={NPC?.location} setName={setNPCname}
                                             setLocation={setNPClocation} editMode={editMode}
                                             setOpenLocationPickModal={setOpenLocationsPickModal}/>
                            </CardContent>
                            <Collapse in={editMode} unmountOnExit={false} timeout='auto'>
                                <p style={{
                                    textAlign: 'center',
                                    marginBottom: 10,
                                    color: errorShown ? 'red' : 'black',
                                    zIndex: 100,
                                    fontSize: 15,
                                }}>{currentError.current}</p>
                                <Button onClick={e => onSave(e)}
                                        style={{
                                            zIndex: 100,
                                            marginBottom: 10,
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            display: 'block'
                                        }}
                                        variant='contained' color='success'>Save</Button>
                            </Collapse>
                            <NPClocationPickModal  locations={locations}
                                                  setLocation={setNPClocation} open={openLocationsPickModal}
                                                  setOpen={setOpenLocationsPickModal}/>
                        </Card>
                    </div>
                </Badge>
            </ClickAwayListener>
        </>
    );
};

function validateNPCname(name) {
    if (name.length === 0) {
        return {ok: false, message: 'Name must contain at least one symbol'};
    }
    return {ok: true, message: null};
}

export default NPCcard;