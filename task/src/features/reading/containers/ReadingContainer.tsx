// import { ExpandableCardDemo } from '@/components/Cards';
import { TextAnimate } from '@/components/ui/text-animate';

export default function ReadingContainer() {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {/* <ExpandableCardDemo> */}
                <TextAnimate animation="blurInUp" by="character" style={{ fontSize: '40px', color: '#7e5a96' }}>
                    Read
                </TextAnimate>
            {/* </ExpandableCardDemo> */}
        </div>
    );
}
