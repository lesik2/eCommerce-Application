import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { IAboutUs } from '../data/aboutData';

export default function AboutUsCard(props: IAboutUs) {
    const { name, roles, bio, img, GitHub } = props;
    return (
        <Card sx={{ width: 340, backgroundColor: '#D9D9D9' }}>
            <CardMedia
                sx={{
                    height: '150px',
                    maxWidth: '50%',
                    width: 'auto',
                    margin: 'auto',
                }}
                image={img}
                title="face"
            />
            <CardContent sx={{ textAlign: 'justify' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {bio}
                </Typography>
                <List>
                    {roles.map((el) => (
                        <ListItem>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary={el} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions>
                <Button size="small">{GitHub}</Button>
            </CardActions>
        </Card>
    );
}
