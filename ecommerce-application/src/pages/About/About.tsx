import { Container, Stack } from '@mui/material';
import AboutUsCard from './components/AboutCart';
import { aboutUsData } from './data/aboutData';

function About() {
    return (
        <>
            <h1 className="py-2 text-2xl text-center">About us</h1>
            <Container maxWidth="xl">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
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
        </>
    );
}

export default About;
