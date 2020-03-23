import React from 'react';
import { View, Text, Button } from 'react-native';

import { WebView } from 'react-native-webview';

export default function Direction() {
  return (
    <WebView source={{ uri: 'https://www.naver.com/' }}>
      {/* <Button title="어떤 역할의 버튼일까??" /> */}
    </WebView>
  );
}
