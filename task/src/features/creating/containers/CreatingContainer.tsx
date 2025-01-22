import { BackgroundGradient } from '@/components/ui/background-gradient';
import { TextAnimate } from '@/components/ui/text-animate';
import CarsForm from '../components/CarsForm';
import { AnimatedModalDemo } from '@/components/animated';

export default function CreatingContainer() {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {/* Use BackgroundGradient component to add background and styling */}
            <TextAnimate animation="blurInUp" by="character" style={{ fontSize: '40px', color: '#7e5a96' }}>
                Create
            </TextAnimate>
            <div>
                <div className="items-start">
                    <CarsForm />
                </div>
            </div>
        </div>
    );
}
