import { TextAnimate } from '@/components/ui/text-animate';
import UpdatingTable from '../components/UpdatingTable';
import React from 'react';

export default function UpdateContainer() {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <TextAnimate animation="blurInUp" by="character" style={{ fontSize: '40px', color: '#18538c', fontWeight: 'bold' }}>
                All Cars
            </TextAnimate>
            <div>
                <UpdatingTable />
            </div>
        </div>
    );
}
