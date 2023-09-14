import { useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IAboutUs } from '../data/aboutData';

export default function AboutUsCard(props: IAboutUs) {
    const { name, roles, bio, img, GitHub } = props;
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

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
                <Link href={GitHub} color="inherit" underline="hover">
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="center"
                        fontFamily="Poiret One, ui-sans-serif"
                        fontWeight="600"
                    >
                        {name}
                        <GitHubIcon sx={{ marginLeft: 2 }} />
                    </Typography>
                </Link>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    fontFamily="Poiret One, ui-sans-serif"
                    fontSize="1rem"
                    fontWeight="600"
                    sx={
                        expanded
                            ? {}
                            : {
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 4,
                                  WebkitBoxOrient: 'vertical',
                              }
                    }
                >
                    {bio}
                </Typography>
                <Button
                    color="primary"
                    onClick={toggleExpand}
                    sx={{ fontFamily: 'Russo One, ui-serif', color: 'rgba(0, 0, 0, 0.6)' }}
                >
                    {expanded ? 'Show Less' : 'Show More'}
                </Button>

                <List>
                    {roles.map((el) => (
                        <ListItem key={el}>
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <RamenDiningIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={el}
                                disableTypography
                                sx={{ fontFamily: 'Russo One, ui-serif', color: 'rgba(0, 0, 0, 0.6)' }}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
