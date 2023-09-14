import { Container, Link, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AboutUsCard from './components/AboutCart';
import { aboutUsData, collaborationData } from './data/aboutData';
import Image from '../../components/ui/Image';
import RSlogo from '../../assets/img/rs_school.svg';

function About() {
    return (
        <div style={{ background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)' }}>
            <h1 className="py-4 text-2xl text-center">Development Team</h1>
            <Container maxWidth="xl">
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    useFlexGap
                    spacing={{ xs: 1, sm: 2, md: 4, xl: 10 }}
                    flexWrap="wrap"
                >
                    {aboutUsData.map((el) => (
                        <AboutUsCard {...el} key={el.name} />
                    ))}
                </Stack>
            </Container>
            <Container maxWidth="xl" sx={{ marginTop: '40px' }}>
                <h2 className="py-2 text-2xl text-center">How we did it?</h2>
                <Stack
                    direction={{ xs: 'column-reverse', sm: 'row' }}
                    justifyContent="center"
                    useFlexGap
                    spacing={{ sm: 1, md: 1, xl: 10 }}
                    marginTop={2}
                >
                    <Stack direction="row" alignItems="center" justifyContent="center">
                        <Link
                            href="https://rs.school/index.html"
                            sx={{
                                transform: 'rotate(-90deg)',
                                '@media (max-width: 600px)': {
                                    transform: 'none',
                                },
                            }}
                        >
                            <Image className="w-[120px]" image={RSlogo} alt="RS school ogo" />
                        </Link>
                    </Stack>
                    <Stack direction="column" justifyContent="space-around" maxWidth="1000px">
                        <Typography fontFamily="Poiret One, ui-sans-serif" fontWeight="600">
                            Effective collaboration methods are crucial for the successful creation of a product. Here
                            are some collaboration methods that led us to the successful completion of this project:
                        </Typography>
                        <List>
                            {collaborationData.map((el) => (
                                <ListItem key={Math.random()}>
                                    <ListItemIcon sx={{ minWidth: '40px' }}>
                                        <AddIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={el.item}
                                        secondary={
                                            <Typography component="p" variant="body2" color="text.primary">
                                                {el.description}
                                            </Typography>
                                        }
                                        disableTypography
                                        sx={{ fontFamily: 'Russo One, ui-serif', color: 'rgba(0, 0, 0, 0.6)' }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}

export default About;
