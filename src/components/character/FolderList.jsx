import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Box, Button, Modal} from "@mui/material";
import Typography from '@mui/material/Typography';

export default function FolderList({game}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        backgroundImage:"url('logo/paper.png')",
        borderRadius:"10px",
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    console.log("game", game)

    // var result = Object.keys(game).map(function(key){
    //     return game[key].classes;
    // });


return (
    <List sx={{width: '100%', maxWidth: "360px"}}>

                {game.skills.map((skill, index) =>
                        <ListItem>
                    <ListItemText primary={skill.name} key={skill.id} >></ListItemText>

                    </ListItem>
                    )}
        <Button onClick={handleOpen}
        sx={{
            backgroundColor: "darkolivegreen",
            color: "red"
        }}
        >Description</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Skills
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {game.skills.map((skill, index) =>
                        <div className="skill_bar">
                            {skill.name}: {skill.name ? skill.description : ''}</div>

                        )}

                </Typography>
            </Box>
        </Modal>
    </List>
);
}
