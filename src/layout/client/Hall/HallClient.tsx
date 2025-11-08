import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function HallClient() {

    const { seanceId } = useParams();

    console.log('seanceId')
    console.log(seanceId)

    useEffect(() => {
        console.log(seanceId)
    }, [seanceId]);

    return (
        <div>
            <h1>Сеанс: {seanceId}</h1>
        </div>
    );

}