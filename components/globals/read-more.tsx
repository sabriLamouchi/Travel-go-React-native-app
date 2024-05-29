import React, { useState } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';
import { COLORS } from '../../constants';
interface Props{
    children:string
    maxChar:number
    textStyle?:TextStyle
}

const ReadMore = ({ textStyle,children, maxChar = 200}) => {
  const text = children;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <View onTouchStart={toggleExpand}>
      {isExpanded ? (
        <Text style={{...textStyle}} >{text}</Text>
      ) : (
        <Text style={{...textStyle}}>
          {text.substring(0, maxChar)}
          <Text style={{ color: COLORS.secondary }}>
            ... Read More
          </Text>
        </Text>
      )}
      <Text style={{ color: COLORS.secondary, display: isExpanded ? 'flex' : 'none' }}>
        Read Less
      </Text>
    </View>
  );
};

export default ReadMore;