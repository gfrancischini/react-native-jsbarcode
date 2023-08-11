import React, { useRef, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import type { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  loadingOverlayContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  style?: ViewStyle;
  scrollable?: boolean;
  LoadingComponent?: React.Component;
};

export default function Barcode({
  style,
  scrollable = true,
  LoadingComponent,
}: Props) {
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<React.ComponentRef<typeof WebView>>(null);

  const onLoadEnd = () => {
    setLoading(false);
  };

  const onError = ({ nativeEvent }: WebViewErrorEvent) =>
    console.warn('WebView error: ', nativeEvent);

  return (
    <View style={[styles.container, style]}>
      <WebView
        source={{ uri: 'https://expo.dev' }}
        bounces={false}
        // style={[webviewContainerStyle]}
        scrollEnabled={scrollable}
        androidLayerType="hardware"
        // androidHardwareAccelerationDisabled={
        //   androidHardwareAccelerationDisabled
        // }
        ref={webViewRef}
        // useWebKit={true}
        // source={source}
        // onMessage={getSignature}
        javaScriptEnabled={true}
        onError={onError}
        onLoadEnd={onLoadEnd}
      />
      {loading && (
        <View style={styles.loadingOverlayContainer}>
          {LoadingComponent ?? <ActivityIndicator />}
        </View>
      )}
    </View>
  );
}
