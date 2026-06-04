import { Stack } from "expo-router";

export default function SensorsLayout() {
  return (
    <Stack initialRouteName="Accelerometer">
      <Stack.Screen name="Accelerometer" />
      <Stack.Screen name="Barometer" />
      <Stack.Screen name="DeviceMotion" />
      <Stack.Screen name="Gyroscope" />
      <Stack.Screen name="LightSensor" />
      <Stack.Screen name="Magnetometer" />
      <Stack.Screen name="MagnetometerUncalibrated" />
      <Stack.Screen name="Pedometer" />
    </Stack>
  );
}
