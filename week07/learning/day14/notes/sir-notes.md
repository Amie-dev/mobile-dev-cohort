# Device & Data — Complete Examples (Expo SDK 55)

Each block is one file (e.g. `app/network-demo.tsx`). Plain React Native — no themed components.

---

# 1. expo-network

**Definition:** Reads connection type and whether the internet is reachable. No permission dialog.

**Docs:** https://docs.expo.dev/versions/v55.0.0/sdk/network/

```tsx
import * as Network from 'expo-network';
import { useEffect, useState } from 'react';
import { Button, Platform, ScrollView, Text, View } from 'react-native';

export default function NetworkScreen() {
  const liveState = Network.useNetworkState();
  const [snapshot, setSnapshot] = useState<Network.NetworkState | null>(null);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [airplaneMode, setAirplaneMode] = useState<boolean | null>(null);
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const subscription = Network.addNetworkStateListener((state) => {
      const line = `${state.type ?? 'UNKNOWN'} · connected=${String(state.isConnected)} · internet=${String(state.isInternetReachable)}`;
      setEvents((current) => [line, ...current].slice(0, 5));
    });

    return () => subscription.remove();
  }, []);

  const refreshSnapshot = async () => {
    const state = await Network.getNetworkStateAsync();
    setSnapshot(state);
  };

  const refreshIp = async () => {
    try {
      const ip = await Network.getIpAddressAsync();
      setIpAddress(ip);
    } catch (error) {
      setIpAddress(error instanceof Error ? error.message : 'Unavailable');
    }
  };

  const refreshAirplaneMode = async () => {
    if (Platform.OS !== 'android') {
      setAirplaneMode(null);
      return;
    }
    const enabled = await Network.isAirplaneModeEnabledAsync();
    setAirplaneMode(enabled);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Network (live)</Text>
      <Text>Type: {liveState.type ?? 'unknown'}</Text>
      <Text>Connected: {String(liveState.isConnected)}</Text>
      <Text>Internet reachable: {String(liveState.isInternetReachable)}</Text>

      <Button title="Fetch one-time snapshot" onPress={refreshSnapshot} />
      {snapshot && (
        <Text>
          Snapshot: {snapshot.type} · connected={String(snapshot.isConnected)}
        </Text>
      )}

      <Button title="Get IP address" onPress={refreshIp} />
      {ipAddress && <Text selectable>IP: {ipAddress}</Text>}

      {Platform.OS === 'android' && (
        <>
          <Button title="Check airplane mode" onPress={refreshAirplaneMode} />
          {airplaneMode !== null && (
            <Text>Airplane mode: {airplaneMode ? 'On' : 'Off'}</Text>
          )}
        </>
      )}

      <Text style={{ fontWeight: '600', marginTop: 8 }}>Recent events</Text>
      {events.length === 0 ? (
        <Text>No changes yet.</Text>
      ) : (
        events.map((event, index) => <Text key={index}>{event}</Text>)
      )}
    </ScrollView>
  );
}
```

**Gotcha:** `isConnected: true` does not guarantee internet. Check `isInternetReachable` too (it can be `null` while checking).

---

# 2. expo-battery

**Definition:** Battery level (0–1), charging state, and low power mode. No permission.

**Docs:** https://docs.expo.dev/versions/v55.0.0/sdk/battery/

```tsx
import * as Battery from 'expo-battery';
import { useEffect, useState } from 'react';
import { Button, Platform, ScrollView, Text, View } from 'react-native';

function stateLabel(state: Battery.BatteryState) {
  switch (state) {
    case Battery.BatteryState.CHARGING:
      return 'Charging';
    case Battery.BatteryState.FULL:
      return 'Full';
    case Battery.BatteryState.UNPLUGGED:
      return 'Unplugged';
    default:
      return 'Unknown';
  }
}

export default function BatteryScreen() {
  const level = Battery.useBatteryLevel();
  const state = Battery.useBatteryState();
  const lowPowerMode = Battery.useLowPowerMode();
  const powerState = Battery.usePowerState();

  const [available, setAvailable] = useState<boolean | null>(null);
  const [optimization, setOptimization] = useState<boolean | null>(null);
  const [events, setEvents] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    Battery.isAvailableAsync().then(setAvailable);

    const levelSub = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setEvents((current) =>
        [`Level: ${Math.round(batteryLevel * 100)}%`, ...current].slice(0, 4),
      );
    });

    const stateSub = Battery.addBatteryStateListener(({ batteryState }) => {
      setEvents((current) =>
        [`State: ${stateLabel(batteryState)}`, ...current].slice(0, 4),
      );
    });

    const powerSub = Battery.addLowPowerModeListener(({ lowPowerMode: enabled }) => {
      setEvents((current) =>
        [`Low power: ${enabled ? 'On' : 'Off'}`, ...current].slice(0, 4),
      );
    });

    return () => {
      levelSub.remove();
      stateSub.remove();
      powerSub.remove();
    };
  }, []);

  const refreshPowerState = async () => {
    const result = await Battery.getPowerStateAsync();
    setStatus(
      `Power state: ${Math.round(result.batteryLevel * 100)}% · ${stateLabel(result.batteryState)} · low power ${result.lowPowerMode ? 'on' : 'off'}`,
    );
  };

  const refreshOptimization = async () => {
    if (Platform.OS !== 'android') {
      setStatus('Battery optimization check is Android-only.');
      return;
    }
    const enabled = await Battery.isBatteryOptimizationEnabledAsync();
    setOptimization(enabled);
    setStatus(enabled ? 'Battery optimization is ON' : 'Battery optimization is OFF');
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Battery</Text>
      <Text>Available: {available === null ? '…' : available ? 'Yes' : 'No'}</Text>
      <Text>Level: {level < 0 ? 'Unavailable' : `${Math.round(level * 100)}%`}</Text>
      <Text>State: {stateLabel(state)}</Text>
      <Text>Low power mode: {lowPowerMode ? 'On' : 'Off'}</Text>
      <Text>
        Hook bundle: {Math.round(powerState.batteryLevel * 100)}% ·{' '}
        {stateLabel(powerState.batteryState)}
      </Text>

      <Button title="Refresh power state" onPress={refreshPowerState} />
      {Platform.OS === 'android' && (
        <Button title="Check battery optimization" onPress={refreshOptimization} />
      )}
      {optimization !== null && (
        <Text>Optimization enabled: {optimization ? 'Yes' : 'No'}</Text>
      )}

      {status && <Text>{status}</Text>}

      <Text style={{ fontWeight: '600', marginTop: 8 }}>Recent events</Text>
      {events.length === 0 ? (
        <Text>No changes yet.</Text>
      ) : (
        events.map((event, index) => <Text key={index}>{event}</Text>)
      )}
    </ScrollView>
  );
}
```

**Gotcha:** Simulators often show fake values — test on a real device.

---

# 3. expo-haptics

**Definition:** Vibration / Taptic feedback for UI actions. No permission on most devices.

**Docs:** https://docs.expo.dev/versions/v55.0.0/sdk/haptics/

```tsx
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';

const IMPACTS = [
  { label: 'Light', style: Haptics.ImpactFeedbackStyle.Light },
  { label: 'Medium', style: Haptics.ImpactFeedbackStyle.Medium },
  { label: 'Heavy', style: Haptics.ImpactFeedbackStyle.Heavy },
] as const;

const NOTIFICATIONS = [
  { label: 'Success', type: Haptics.NotificationFeedbackType.Success },
  { label: 'Warning', type: Haptics.NotificationFeedbackType.Warning },
  { label: 'Error', type: Haptics.NotificationFeedbackType.Error },
] as const;

export default function HapticsScreen() {
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const run = async (label: string, action: () => Promise<void>) => {
    try {
      await action();
      setLastFeedback(label);
    } catch {
      setLastFeedback(`${label} (not supported on this device)`);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Haptics</Text>
      <Text>Use sparingly — meaningful moments only.</Text>

      <Text style={{ fontWeight: '600' }}>Selection</Text>
      <Button
        title="selectionAsync()"
        onPress={() => run('selectionAsync()', () => Haptics.selectionAsync())}
      />

      <Text style={{ fontWeight: '600' }}>Notifications</Text>
      {NOTIFICATIONS.map((item) => (
        <Button
          key={item.label}
          title={`notificationAsync(${item.label})`}
          onPress={() =>
            run(`notificationAsync(${item.label})`, () =>
              Haptics.notificationAsync(item.type),
            )
          }
        />
      ))}

      <Text style={{ fontWeight: '600' }}>Impacts</Text>
      {IMPACTS.map((item) => (
        <Button
          key={item.label}
          title={`impactAsync(${item.label})`}
          onPress={() =>
            run(`impactAsync(${item.label})`, () => Haptics.impactAsync(item.style))
          }
        />
      ))}

      {lastFeedback && (
        <Text style={{ marginTop: 8 }}>Last triggered: {lastFeedback}</Text>
      )}
    </ScrollView>
  );
}
```

**Gotcha:** Simulators often have no haptics — failure is normal.

---

# 4. File handling

**`expo-document-picker`** — user picks files via system UI.

**`expo-file-system`** — read picked files with `new File(uri)`.

**Docs:**

- https://docs.expo.dev/versions/v55.0.0/sdk/document-picker/
- https://docs.expo.dev/versions/v55.0.0/sdk/file-system/

```tsx
import { File } from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';

type PickMode = 'any' | 'image' | 'pdf';

const MODES: { id: PickMode; label: string; type: string }[] = [
  { id: 'any', label: 'Any', type: '*/*' },
  { id: 'image', label: 'Images', type: 'image/*' },
  { id: 'pdf', label: 'PDF', type: 'application/pdf' },
];

function formatBytes(size?: number) {
  if (size === undefined) return '—';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

type FileDetails = {
  name: string;
  mimeType: string;
  size: string;
  exists: boolean;
  uri: string;
  textPreview?: string;
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ fontSize: 12, opacity: 0.6 }}>{label}</Text>
      <Text selectable>{value}</Text>
    </View>
  );
}

export default function FileHandlingScreen() {
  const [mode, setMode] = useState<PickMode>('any');
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const [selected, setSelected] = useState<FileDetails | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const pickDocuments = async () => {
    const selectedMode = MODES.find((m) => m.id === mode) ?? MODES[0];

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: selectedMode.type,
        multiple: allowMultiple,
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setStatus('Canceled — no file chosen.');
        return;
      }

      setFiles(result.assets);
      setStatus(`${result.assets.length} file(s) selected.`);
      await inspectFile(result.assets[0]);
    } catch (error) {
      Alert.alert('Pick failed', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const inspectFile = async (asset: DocumentPicker.DocumentPickerAsset) => {
    try {
      const file = new File(asset.uri);
      const info = file.info();

      const isText =
        asset.mimeType?.startsWith('text/') ||
        asset.name.endsWith('.txt') ||
        asset.name.endsWith('.json') ||
        asset.name.endsWith('.md');

      let textPreview: string | undefined;
      if (isText && info.exists) {
        textPreview = (await file.text()).slice(0, 240);
      }

      setSelected({
        name: asset.name,
        mimeType: asset.mimeType ?? 'Unknown',
        size: formatBytes(asset.size),
        exists: info.exists,
        uri: asset.uri,
        textPreview,
      });
    } catch (error) {
      Alert.alert(
        'Read failed',
        error instanceof Error ? error.message : 'Could not read file',
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>File handling</Text>
      <Text>Pick a file, then inspect it with expo-file-system.</Text>

      {/* File type filter */}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {MODES.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setMode(item.id)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: mode === item.id ? '#208AEF' : '#eee',
            }}>
            <Text style={{ color: mode === item.id ? '#fff' : '#000' }}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Switch value={allowMultiple} onValueChange={setAllowMultiple} />
        <Text>Pick multiple files</Text>
      </View>

      <Button title="Pick file" onPress={pickDocuments} />
      {status && <Text>{status}</Text>}

      {/* File list */}
      {files.length > 0 && (
        <View style={{ gap: 8 }}>
          <Text style={{ fontWeight: '600' }}>Selected files</Text>
          {files.map((file, index) => (
            <Pressable
              key={`${file.uri}-${index}`}
              onPress={() => inspectFile(file)}
              style={{
                padding: 12,
                borderRadius: 8,
                backgroundColor: selected?.uri === file.uri ? '#E6F4FE' : '#f5f5f5',
              }}>
              <Text style={{ fontWeight: '500' }}>{file.name}</Text>
              <Text style={{ fontSize: 12, opacity: 0.6 }}>{formatBytes(file.size)}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* File details — one label per row, not one big string */}
      {selected && (
        <View
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: '#f9f9f9',
            gap: 4,
          }}>
          <Text style={{ fontWeight: '600', marginBottom: 8 }}>File details</Text>

          <InfoRow label="Name" value={selected.name} />
          <InfoRow label="Type" value={selected.mimeType} />
          <InfoRow label="Size" value={selected.size} />
          <InfoRow label="Readable" value={selected.exists ? 'Yes' : 'No'} />
          <InfoRow label="Path" value={selected.uri} />

          {selected.textPreview && (
            <View style={{ marginTop: 8 }}>
              <Text style={{ fontSize: 12, opacity: 0.6 }}>Preview</Text>
              <Text selectable style={{ marginTop: 4 }}>
                {selected.textPreview}
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
```

**Gotchas:** Use `copyToCacheDirectory: true`. Must be triggered by a button press. Cache files are temporary.

---

# 5. expo-contacts

**Definition:** Read address book or open native picker for one contact. Permission required for full list.

**Docs:** https://docs.expo.dev/versions/v55.0.0/sdk/contacts/

**`app.json` plugin:**

```json
["expo-contacts", {
  "contactsPermission": "Allow $(PRODUCT_NAME) to access your contacts."
}]
```

```tsx
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

function formatName(contact: Contacts.Contact) {
  const parts = [contact.firstName, contact.lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(' ') : contact.name ?? 'Unnamed contact';
}

export default function ContactsScreen() {
  const [permission, setPermission] = useState<Contacts.ContactsPermissionResponse | null>(null);
  const [hasContacts, setHasContacts] = useState<boolean | null>(null);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contacts.Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    Contacts.getPermissionsAsync().then(setPermission);
  }, []);

  const requestPermission = async () => {
    const result = await Contacts.requestPermissionsAsync();
    setPermission(result);

    if (!result.granted && !result.canAskAgain) {
      Alert.alert('Contacts denied', 'Enable contacts access in Settings.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]);
    }

    return result.granted;
  };

  const loadContacts = async () => {
    const granted = permission?.granted ?? (await requestPermission());
    if (!granted) {
      setStatus('Contacts permission required.');
      return;
    }

    setLoading(true);
    try {
      const exists = await Contacts.hasContactsAsync();
      setHasContacts(exists);

      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Emails,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.Company,
        ],
        pageSize: 20,
        sort: Contacts.SortTypes.FirstName,
      });

      setContacts(data);
      setStatus(`Loaded ${data.length} contacts.`);
    } catch (error) {
      Alert.alert('Load failed', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const inspectContact = async (contact: Contacts.Contact) => {
    if (!contact.id) {
      setSelectedContact(contact);
      return;
    }

    try {
      const detailed = await Contacts.getContactByIdAsync(contact.id, [
        Contacts.Fields.Emails,
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Company,
      ]);
      setSelectedContact(detailed ?? contact);
      setStatus(`Selected ${formatName(detailed ?? contact)}.`);
    } catch {
      setSelectedContact(contact);
    }
  };

  const openNativePicker = async () => {
    try {
      const contact = await Contacts.presentContactPickerAsync();
      if (!contact) {
        setStatus('Native picker canceled.');
        return;
      }

      setSelectedContact(contact);
      setStatus(`Picked ${formatName(contact)} from native UI.`);
    } catch (error) {
      Alert.alert('Picker failed', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text>Checking contacts permission…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Contacts</Text>
        <Text>Permission: {permission.granted ? 'Granted' : 'Not granted'}</Text>

        {!permission.granted && (
          <Button title="Grant contacts access" onPress={requestPermission} />
        )}

        <Button title="Load contacts" onPress={loadContacts} />
        <Button title="Open native contact picker" onPress={openNativePicker} />

        {hasContacts === false && <Text>No contacts on this device.</Text>}
        {loading && <ActivityIndicator />}
        {status && <Text>{status}</Text>}

        {selectedContact && (
          <View style={{ gap: 4 }}>
            <Text style={{ fontWeight: '600' }}>Selected contact</Text>
            <Text>{formatName(selectedContact)}</Text>
            <Text>{selectedContact.company ?? 'No company'}</Text>
            <Text>
              Phone: {selectedContact.phoneNumbers?.[0]?.number ?? 'None'}
            </Text>
            <Text>
              Email: {selectedContact.emails?.[0]?.email ?? 'None'}
            </Text>
          </View>
        )}
      </ScrollView>

      <FlatList
        data={contacts}
        keyExtractor={(item, index) => item.id ?? `${item.name}-${index}`}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable onPress={() => inspectContact(item)} style={{ paddingVertical: 10 }}>
            <Text>{formatName(item)}</Text>
            <Text style={{ opacity: 0.6 }}>
              {item.phoneNumbers?.[0]?.number ?? 'No phone'}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
```

**Gotchas:** Contacts are PII — fetch minimum `fields`. `presentContactPickerAsync()` can work on iOS without full read permission.

---

# Quick comparison

| Package | Complete example above | Permission |
| --- | --- | --- |
| `expo-network` | `NetworkScreen` | No |
| `expo-battery` | `BatteryScreen` | No |
| `expo-haptics` | `HapticsScreen` | No |
| `expo-document-picker` + `expo-file-system` | `FileHandlingScreen` | No* |
| `expo-contacts` | `ContactsScreen` | Yes |

---

Every example above is a **full screen** — copy into a route file and run. If you want the same **complete** treatment for **expo-location**, say the word.