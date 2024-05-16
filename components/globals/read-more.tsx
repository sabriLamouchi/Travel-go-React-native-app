import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '../../constants';
interface Props{
    children:string
    maxChar:number
}

const ReadMore = ({ children, maxChar = 200 }) => {
  const text = children;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <View>
      {isExpanded ? (
        <Text>{text}</Text>
      ) : (
        <Text>
          {text.substring(0, maxChar)}
          <Text style={{ color: COLORS.secondary }} onPress={toggleExpand}>
            ... Read More
          </Text>
        </Text>
      )}
      <Text style={{ color: COLORS.secondary, display: isExpanded ? 'flex' : 'none' }} onPress={toggleExpand}>
        Read Less
      </Text>
    </View>
  );
};

export default ReadMore;