import * as React from 'react';
import {
    View,
    Text
} from 'react-native';
import { Divider, List, ListItem } from '@ui-kitten/components';

interface Props {
    name: string;
    sold: number;
    textSize: number;
}

const Network: React.FC<Props> = ({
    name,
    sold,
    textSize
}): JSX.Element => (
        <View style={{ padding: 12 }}>
            <ListItem style={{ fontSize: textSize }}
                title={name}
                description={sold}
            />
        </View>
);

export default Network;
