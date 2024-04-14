import React from 'react';
import { View } from 'react-native';
import Svg,{Rect} from 'react-native-svg'
import { COLORS } from '../../constants';
const ProgressBar = ({progress}) => {
    const barWidth=230;
    const progressWidth=(progress /100) * barWidth;
    return (
        <View>
            <Svg width={barWidth} height="7" >
                <Rect width={barWidth} height={"100%"} fill={COLORS.lightWhite} rx={3.5} ry={3.5} />
                <Rect width={progressWidth} height={"100%"} fill={COLORS.green} rx={3.5} ry={3.5} />
            </Svg>
        </View>
    );
};

export default ProgressBar;