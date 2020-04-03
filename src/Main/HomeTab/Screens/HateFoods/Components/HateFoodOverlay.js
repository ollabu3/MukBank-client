import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Overlay, Button } from 'react-native-elements';

export default function HateFoodOverlay({
  overlayVisible,
  setOverlayVisible,
  styles
}) {
  return (
    <Overlay isVisible={overlayVisible} width="60%" height="30%">
      <Text
        style={[styles.overlayTitle, { marginTop: '13%', marginBottom: '5%' }]}
      >
        잠시만요!
      </Text>
      <Text
        style={[styles.overlayMessage, { marginTop: '5%', marginBottom: '9%' }]}
      >
        하나는 드셔야죠~
      </Text>
      <Button
        title="돌아가기"
        type="outline"
        onPress={() => {
          setOverlayVisible(false);
        }}
      />
    </Overlay>
  );
}
