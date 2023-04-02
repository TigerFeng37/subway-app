import React, { useState, useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  scrollPosition: number;
}

const AnimatedArrow: React.FC<Props> = ({ scrollPosition }) => {

  const [arrowPath, setArrowPath] = useState<string>('M4 90 L27 90 L50 90');
  const [color, setColor] = useState<string>('rgba(180, 180, 180, 1)');

  useEffect(() => {
    const animateArrow = () => {
      let yVal;
      if (scrollPosition < 0) {
        yVal = 90;
      } else {
        //apply easing function
        const x = scrollPosition / 180;
        const y = 1 - (1 - x)*(1 - x)*(1-x);

        //convert to flipped plane for Path
        yVal = 90 - 180*(y) / 10;
      }
      const string = `M4 90 L27 ${yVal} L50 90`;
      setArrowPath(string);
    };
    const transparency = () => {
      let value;
      if (scrollPosition > 60) {
        value = 1;
        setColor('rgba(180, 180, 180, 1)');
      } else {
        value = Math.max(1 - .013*(60 - scrollPosition), 0);
      }
      setColor('rgba(180, 180, 180, ' + value + ')');
    }
    animateArrow();
    transparency();
  }, [scrollPosition]);

  return (
    <Svg width="54" height="100">
      <Path d={arrowPath} stroke={color} strokeWidth={5} fill="none" strokeLinejoin="round" strokeLinecap='round' />
    </Svg>
  );
};

export default AnimatedArrow;
