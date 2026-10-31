import 'chartjs-plugin-dragdata';
import 'chart.js/auto';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Line } from 'react-chartjs-2';
import { WebView } from 'react-native-webview';

type IProps = {
  above?: React.FC;
  below?: React.FC;
  data: [number[], number[]];
  labels: [string, string];
  xlabels: string[];
  colors: [string, string];
  handleDrag?: (value: number | { x: number; y: number } | null) => void;
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const WebDraggableLinePlot = (props: IProps) => {
  const dataFirst = props.xlabels.map((label: string, index: number) => {
    return {
      x: index,
      y: props.data[0][index],
    };
  });

  const dataSecond = props.xlabels.map((label: string, index: number) => {
    return {
      x: index,
      y: props.data[1][index],
    };
  });

  return (
    <Line
      data={{
        datasets: [
          {
            data: dataSecond,
            label: props.labels[1],
            borderWidth: 2,
            borderColor: props.colors[1],
            backgroundColor: `rgba(${hexToRgb(props.colors[1])?.r}, ${hexToRgb(props.colors[1])?.g}, ${hexToRgb(props.colors[1])?.b}, 0.3)`,
            cubicInterpolationMode: 'monotone',
            fill: true,
          },
          {
            dragData: false,
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            data: dataFirst,
            label: props.labels[0],
            borderWidth: 2,
            borderColor: props.colors[0],
            backgroundColor: `rgba(${hexToRgb(props.colors[0])?.r}, ${hexToRgb(props.colors[0])?.g}, ${hexToRgb(props.colors[0])?.b}, 0.3)`,
            cubicInterpolationMode: 'monotone',
            fill: true,
          },
        ],
      }}
      options={{
        scales: {
          x: {
            type: 'linear',
            ticks: {
              callback: (value, index, ticks) => {
                return props.xlabels[value];
              },
              stepSize: 1,
            },
          },
        },
        plugins: {
          dragData: {
            onDragEnd(event, di, index, value) {
              console.log('drag end', { event, di, index, value });
              if (props.handleDrag) {
                props.handleDrag(value);
              }
            },
          },
        },
      }}
    />
  );
};

const MobileDraggableLinePlot = (props: IProps) => {
  const dataFirst = props.xlabels.map((label: string, index: number) => {
    return {
      x: index,
      y: props.data[0][index],
    };
  });

  const dataSecond = props.xlabels.map((label: string, index: number) => {
    return {
      x: index,
      y: props.data[1][index],
    };
  });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-dragdata"></script>
      </head>
      <body>
        <canvas id="myChart" width="450" height="350"></canvas>
        <script>
          const ctx = document.getElementById('myChart').getContext('2d');
          new Chart(ctx, {
            type: 'line',
            data: {
              datasets: [{
                label:  ${JSON.stringify(props.labels[1])},
                data: ${JSON.stringify(dataSecond)},
                borderWidth: 2,
                borderColor: ${JSON.stringify(props.colors[1])},
                backgroundColor:  ${JSON.stringify(`rgba(${hexToRgb(props.colors[1])?.r}, ${hexToRgb(props.colors[1])?.g}, ${hexToRgb(props.colors[1])?.b}, 0.3)`)},
                cubicInterpolationMode: 'monotone',
                fill: true,
              }, {
                label: ${JSON.stringify(props.labels[0])},
                data: ${JSON.stringify(dataFirst)},
                borderWidth: 2,
                borderColor: ${JSON.stringify(props.colors[0])},
                backgroundColor:  ${JSON.stringify(`rgba(${hexToRgb(props.colors[0])?.r}, ${hexToRgb(props.colors[0])?.g}, ${hexToRgb(props.colors[0])?.b}, 0.3)`)},
                cubicInterpolationMode: 'monotone',
                dragData: false,
                fill: true,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'transparent',
              }]
            },
            options: {
              scales: {
                 x: { type: 'linear', ticks: {
                    callback: (value, index, ticks) => {
                      return ${JSON.stringify(props.xlabels)}[value];
                    },
                    stepSize: 1,
                  } },
              },
              plugins: {
                dragData: {
                  onDragEnd: function(e, datasetIndex, index, value) {
                    console.log('onDragEnd', e, datasetIndex, index, value);
                  },
                  onDragEnd(event, di, index, value) {
                    console.log('drag end', { event, di, index, value });
                    window.ReactNativeWebView.postMessage(JSON.stringify({ value }));
                  },
                }
              }
            }
          });
        </script>
      </body>
    </html>
  `;

  const handleWebViewMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data);
    if (props.handleDrag) {
      props.handleDrag(message.value);
    }
  };

  return (
    <View style={styles.container}>
      {props.above && <props.above />}
      <WebView
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        scrollEnabled={false}
        onMessage={handleWebViewMessage}
      />
      {props.below && <props.below />}
    </View>
  );
};

export const DraggableLinePlot = (props: IProps) => {
  if (Platform.OS === 'web') {
    return <WebDraggableLinePlot {...props} />;
  } else {
    return <MobileDraggableLinePlot {...props} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  webview: {
    flex: 0.7, // Définir la proportion de l'écran occupée par la WebView
    marginTop: 50,
    width: '85%',
    alignSelf: 'center',
  },
});
