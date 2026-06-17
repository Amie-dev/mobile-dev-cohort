
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Text, View } from "react-native";

export default function QRScannerScreen() {
  const [permission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);

  if (!permission?.granted) {
    return <Text>Camera permission required.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={({ data }) => {
          if (scanned) return;

          setScanned(true);
          setScannedData(data);
        }}
      />

      {scannedData && <Text>Scanned: {scannedData}</Text>}
    </View>
  );
}
