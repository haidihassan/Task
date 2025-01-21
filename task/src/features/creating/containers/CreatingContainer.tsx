import { BackgroundGradient } from '@/components/ui/background-gradient';
import { TextAnimate } from '@/components/ui/text-animate';

export default function CreatingContainer() {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {/* <BackgroundGradient className="rounded-[20px] p-4 sm:p-10 bg-white"> */}
                <TextAnimate animation="blurInUp" by="character" style={{ fontSize: '40px', color: '#7e5a96' }}>
                    Create
                </TextAnimate>
            {/* </BackgroundGradient> */}
        </div>
    );
}
