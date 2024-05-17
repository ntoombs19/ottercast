import {Card, CardContent, CardHeader, Typography, styled} from '@mui/material';
import {ThermometerSun, Wind, Droplets} from 'lucide-react';
import {PropsWithChildren} from 'react';

export type WeatherCardProps = {
    location: string,
    temperature: string,
    windSpeed: string,
    humidity: number,
}

const WeatherGrid = styled('div')(() => ({
    display: 'flex',
    gap: '12px',
}))

const WeatherBox = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    padding: theme.spacings.xs,
    gap: theme.spacings.xxs,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
}))

const WeatherBoxTitle = ({children}: PropsWithChildren) => <Typography variant='h5'>{children}</Typography>

const WeatherBoxDatum = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacings.xxs,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
}))

export function WeatherCard({location, temperature, windSpeed, humidity}: WeatherCardProps) {
    return (
        <Card>
            <CardHeader title={location}></CardHeader>
            <CardContent>
                <WeatherGrid>
                    <WeatherBox>
                        <WeatherBoxTitle>Temperature</WeatherBoxTitle>
                        <WeatherBoxDatum>
                            <ThermometerSun/>
                            {temperature}°F
                        </WeatherBoxDatum>
                    </WeatherBox>
                    <WeatherBox>
                        <WeatherBoxTitle>Wind Speed</WeatherBoxTitle>
                        <WeatherBoxDatum>
                            <Wind/> {windSpeed}mph
                        </WeatherBoxDatum>
                    </WeatherBox>
                    <WeatherBox>
                        <WeatherBoxTitle>Humidity</WeatherBoxTitle>
                        <WeatherBoxDatum>
                            <Droplets/> {humidity}%
                        </WeatherBoxDatum>
                    </WeatherBox>
                </WeatherGrid>
            </CardContent>
        </Card>
    )
}