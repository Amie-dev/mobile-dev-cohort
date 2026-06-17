import { Button, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import AudioScreen from '@/components/audio/AudioScreen'
import Recored from '@/components/audio/Recored'

const Audio = () => {
  // store the component reference
  const [SelectedComponent, setSelectedComponent] = useState(() => AudioScreen)
  const [audio, setAudio] = useState('')

  return (
    <View style={{ flex: 1 }}>
      {/* Render the selected component with props */}
      <SelectedComponent audio={audio} setAudio={setAudio} />

      <View style={styles.controls}>
        <Button title="Audio Screen" onPress={() => setSelectedComponent(() => AudioScreen)} />
        <Button title="Recored" onPress={() => setSelectedComponent(() => Recored)} />
      </View>
    </View>
  )
}

export default Audio

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})
