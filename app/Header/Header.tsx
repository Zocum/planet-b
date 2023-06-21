import './Header.scss';
import { HeaderProps } from '@/types';

export default function Header({ setRover }: HeaderProps) {
    return (
        <header>
            <button onClick={() => setRover('perseverance')}>Perseverance</button>
            <button onClick={() => setRover('curiosity')}>Curiosity</button>
            <button onClick={() => setRover('opportunity')}>Opportunity</button>
            <button onClick={() => setRover('spirit')}>Spirit</button>
        </header>  
    )
}