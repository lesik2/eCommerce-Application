import { Container, Link, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AboutUsCard from './components/AboutCart';
import { aboutUsData, collaborationData } from './data/aboutData';
import Image from '../../components/ui/Image';
import RSlogo from '../../assets/img/rs_school.svg';

function About() {
    return (
        <div
            style={{
                background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
                paddingTop: '20px',
            }}
        >
            <Container maxWidth="xl">
                <Stack
                    sx={{
                        maxWidth: 1000,
                        marginX: 'auto',
                        backgroundColor: '#D9D9D9',
                        marginTop: '20px',
                        padding: '20px',
                        borderRadius: '40px',
                        border: '4px solid #FDE828',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <h1 className="py-4 font-sans text-2xl text-center">Welcome to our Asian food delivery service!</h1>
                    <Typography fontFamily="Russo One, ui-serif" color="rgba(0, 0, 0, 0.7)" textAlign="justify">
                        Our online platform brings the rich and diverse flavors of Asia right to your doorstep.
                        We&apos;ve meticulously crafted this digital experience to capture all the essence and
                        convenience of enjoying authentic Asian cuisine without leaving your home.
                    </Typography>
                    <Typography
                        fontFamily="Russo One, ui-serif"
                        color="rgba(0, 0, 0, 0.5)"
                        textAlign="justify"
                        paddingY="10px"
                    >
                        Our user-friendly interface guides you seamlessly from the moment you start browsing our menu to
                        the final step of placing your order. We prioritize user engagement and trust-building
                        throughout the entire process.
                    </Typography>
                    <Typography
                        fontFamily="Russo One, ui-serif"
                        color="rgba(0, 0, 0, 0.7)"
                        textAlign="justify"
                        paddingBottom="10px"
                    >
                        Explore our extensive menu of delicious Asian dishes, complete with detailed descriptions and
                        mouthwatering images. Add your favorite items to your order with just a click and enjoy a
                        hassle-free checkout process. For your convenience, we offer quick registration and login
                        options, robust search features to find your desired dishes, and intuitive categorization and
                        sorting.
                    </Typography>
                    <Typography fontFamily="Russo One, ui-serif" color="rgba(0, 0, 0, 0.5)" textAlign="justify">
                        Savor the flavors of Asia from the comfort of your home with our Asian food delivery service.
                    </Typography>
                </Stack>
            </Container>
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
                        <Typography fontFamily="Russo One, ui-serif" color="rgba(0, 0, 0, 0.7)">
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
                                            <Typography
                                                component="p"
                                                variant="body2"
                                                color="rgba(0, 0, 0, 0.4)"
                                                fontFamily="Russo One, ui-serif"
                                            >
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
