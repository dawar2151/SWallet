import * as React from 'react';
import {
    View,
    Text
} from 'react-native';

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
            <Text style={{ fontSize: textSize }}>{name} : {sold}</Text>
        </View>
);

export default Network;
