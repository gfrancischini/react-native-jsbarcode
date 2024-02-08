import React, { useEffect, useRef, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import type { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes';

const html = require('../html/dist/rn-index.html.js').default;

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

// JsBarcode('#code128', 'Hi!');
// JsBarcode('#ean-13', '1234567890128', { format: 'ean13' });
// JsBarcode('#ean-8', '12345670', { format: 'ean8' });
// JsBarcode('#ean-5', '12345', { format: 'ean5' });
// JsBarcode('#ean-2', '12', { format: 'ean2' });
// JsBarcode('#upc-a', '123456789012', { format: 'upc' });
// JsBarcode('#code39', 'Hello', { format: 'code39' });
// JsBarcode('#itf-14', '1234567890123', { format: 'itf14' });
// JsBarcode('#msi', '123456', { format: 'msi' });
// JsBarcode('#pharmacode', '12345', { format: 'pharmacode' });

type JSBarCodeFormat =
  | 'code128'
  | 'ean13'
  | 'ean8'
  | 'ean5'
  | 'ean2'
  | 'upc'
  | 'code39'
  | 'itf14'
  | 'msi'
  | 'pharmacode';

type JSBarCode = {
  value: string;
  format?: JSBarCodeFormat;
  width?: number;
  height?: number;
  displayValue?: boolean;
  fontOptions?: string;
  font?: string;
  textAlign?: string;
  textPosition?: string;
  textMargin?: number;
  fontSize?: number;
  background?: string;
  lineColor?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
};

type Props = JSBarCode & {
  style?: ViewStyle;
  scrollable?: boolean;
  LoadingComponent?: React.Component;
  webviewProps?: React.ComponentProps<typeof WebView>;
};

export default function Barcode({
  style,
  scrollable = true,
  LoadingComponent,
  value,
  webviewProps,
  ...JSBarCodeProps
}: Props) {
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<React.ComponentRef<typeof WebView>>(null);

  const onLoadEnd = () => {
    setLoading(false);
  };

  const onError = ({ nativeEvent }: WebViewErrorEvent) =>
    console.warn('WebView error: ', nativeEvent);

  useEffect(() => {
    webViewRef.current?.injectJavaScript(
      `drawBarcode('${value}', ${JSON.stringify(JSBarCodeProps)});`
    );
  }, [value, JSBarCodeProps]);

  return (
    <View style={[styles.container, style]}>
      <WebView
        source={{ html }}
        bounces={false}
        scrollEnabled={scrollable}
        androidLayerType="hardware"
        ref={webViewRef}
        javaScriptEnabled={true}
        onError={onError}
        onLoadEnd={onLoadEnd}
        {...webviewProps}
      />
      {loading && (
        <View style={styles.loadingOverlayContainer}>
          {LoadingComponent ?? <ActivityIndicator />}
        </View>
      )}
    </View>
  );
}
