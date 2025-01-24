import { TextAnimate } from '@/components/ui/text-animate';
import UpdatingTable from '../../reading/components/RDTable';
import React from 'react';

export default function UpdateContainer() {
    return (
        <div style={{ textAlign: 'center', marginTop: '-200px' }}>
            <TextAnimate animation="blurInUp" by="character" className="text-text" style={{ fontSize: '40px', fontWeight: 'bold' }}>
                All Cars
            </TextAnimate>
            <div>
                <UpdatingTable />
            </div>
        </div>
    );
}
