import { TextAnimate } from "@/components/ui/text-animate";

export default function DeleteContainer() {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <TextAnimate animation="blurInUp" by="character" style={{ fontSize: '40px', color: '#7e5a96' }}>
                Delete
            </TextAnimate>
        </div>
    );
}