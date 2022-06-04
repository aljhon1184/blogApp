import './single.css'
import Rightbar from '../../components/rightbar/Rightbar';
import Singlepost from '../../components/singlepost/Singlepost';

export default function Single() {
    return (
        <div className="single">
            <Singlepost/>
            <Rightbar />
        </div>
    )
}
