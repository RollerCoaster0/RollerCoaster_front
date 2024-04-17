import React, {useState} from 'react';
import {
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    ClickAwayListener,
    Collapse,
    IconButton
} from "@mui/material";
import avatar from '../../../../devassets/the_rock.jpg'
import back from '../../../../devassets/dagestan.jpg'
import './NPCs.css'
import DeleteIcon from "@mui/icons-material/Delete";
import NPCcardInfo from "./NPCcardInfo";

const NPCcard = () => {
    const [editMode, setEditMode] = useState(false);
    const onCancel = () => {
        setEditMode(false);
    }
    const onClick = (e) => {
        e.stopPropagation();
        setEditMode(true);
    }
    return (
        <>
            <ClickAwayListener onClickAway={onCancel}>
                <Badge badgeContent={editMode ? <IconButton> <DeleteIcon color='error'/></IconButton> : null}>
                    <div className='npcs__npc-card-wrapper'  onClick={e => onClick(e)}>
                        <Card sx={{
                            position: 'relative',
                            backgroundImage: `url(${back})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
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
                            }} component='img' src={avatar} title='avatar'/>
                            <CardContent>
                                <div className='npcs__npc-card__npc-info__background'/>
                                <NPCcardInfo editMode={editMode}/>
                            </CardContent>
                            <Collapse in={editMode} unmountOnExit={false} timeout='auto'>
                                <Button
                                    style={{
                                        zIndex: 100,
                                        marginBottom: 10,
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        display: 'block'
                                    }}
                                    variant='contained' color='success'>Save</Button>
                            </Collapse>
                        </Card>
                    </div>
                </Badge>
            </ClickAwayListener>
        </>
    );
};

export default NPCcard;