// import CountDown from 'react-native-countdown-component'

// const Timer = ({ duration, isRunning }) => {
//   return (
//     <CountDown
//       until={60 * duration}
//       size={duration >= 60 ? 15 : 25}
//       onFinish={() => alert('Finished')}
//       digitStyle={{ backgroundColor: '#348EC5' }}
//       digitTxtStyle={{ color: 'white' }}
//       timeToShow={duration >= 60 ? ['H', 'M', 'S'] : ['M', 'S']}
//       timeLabels={{ h: '', m: '', s: '' }}
//       running={isRunning}
//     />
//   )
// }

// const styles = StyleSheet.create({

// })

import { Text, View, StyleSheet, Button } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useState } from 'react'

const Timer = ({isRunning, duration}) => {

  
  const timeFormatter = ({ remainingTime }) => {
    const hours = Math.floor(remainingTime / 3600)
    const minutes = Math.floor((remainingTime % 3600) / 60).toString().padStart(2,'0')
    const seconds = (remainingTime % 60).toString().padStart(2,'0')
    return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
  }

  return (
    <View style={styles.timerContainer}>
      <CountdownCircleTimer
        isPlaying={isRunning}
        duration={duration*60}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[duration * 60, duration * 45, duration * 30, duration * 15]}
        updateInterval={1}
        size={120}
    >
      {({ remainingTime, color }) => (
        <Text style={{ color: "white", fontSize: 20 }}>
          {timeFormatter({remainingTime})}
        </Text>
      )}
    </CountdownCircleTimer>
  </View>
  )
}

const styles = StyleSheet.create({
  timerContainer: {
    
  }
})
export default Timer

