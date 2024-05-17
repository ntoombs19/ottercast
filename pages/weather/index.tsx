import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutTitle, LayoutHeader } from '@graphcommerce/next-ui'
import { Container } from '@mui/material'
import {
    LayoutDocument,
    LayoutNavigation,
    LayoutNavigationProps,
    WeatherCard,
    WeatherCardProps,
} from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type RouteProps = { url: string[] }
export type GetPageStaticProps = GetStaticProps<
    LayoutNavigationProps,
    WeatherCardProps,
    RouteProps
>

type WeatherData = {
    main: {
        temp: number,
        humidity: number,
    },
    wind: {
        speed: number,
    },
}

function WeatherPage(props: WeatherCardProps) {
    return (
        <>
            <PageMeta
                title='Weather'
                metaRobots={['noindex']}
                canonical='/weather'
            />
            <LayoutHeader
                floatingMd
                switchPoint={0}
                sx={{ '& .LayoutHeaderContent-center': { overflow: 'visible' } }}
            >
                <LayoutTitle
                    gutterBottom={false}
                    gutterTop={false}
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                    {/* eslint-disable-next-line react/destructuring-assignment */}
                    {props.location}
                </LayoutTitle>
            </LayoutHeader>

            <Container maxWidth='sm' sx={{ display: { xs: 'none', md: 'block' } }}>
                <WeatherCard {...props} />
            </Container>
        </>
    )
}

const pageOptions: PageOptions<LayoutNavigationProps> = {
    Layout: LayoutNavigation,
}

WeatherPage.pageOptions = pageOptions

export default WeatherPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
    const client = graphqlSharedClient(locale)
    const staticClient = graphqlSsrClient(locale)
    const conf = client.query({ query: StoreConfigDocument })
    const layout = staticClient.query({
        query: LayoutDocument,
        fetchPolicy: 'cache-first',
    })
    // City ID is for Springfield, MO
    const url = `https://api.openweathermap.org/data/2.5/weather?id=4409896&units=imperial&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    const res = await fetch(url);
    const data: WeatherData = await res.json();

    const result = {
        props: {
            ...(await layout).data,
            location: 'Springfield, MO',
            temperature: data.main.temp.toFixed(0),
            humidity: data.main.humidity,
            windSpeed: data.wind.speed.toFixed(0),
            apolloState: await conf.then(() => client.cache.extract()),
        },
        revalidate: 60 * 20,
    }
    return result
}
