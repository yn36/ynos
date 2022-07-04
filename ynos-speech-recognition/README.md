# ynos-speech-recognition

语音识别功能

## 安装

#### NPM

```bash
npm install ynos-speech-recognition --save
```

#### Yarn

``` bash
yarn add ynos-speech-recognition
```

#### Bower

``` bash
bower install ynos-speech-recognition --save
```

## Development Setup

``` bash
# install dependencies
npm install

# build dist files
npm run build
```

## 使用

``` js
import { YSpeechRecognition } from 'ynos-speech-recognition';

const recognition = new YSpeechRecognition();

// YSpeechRecognition接口的lang属性返回并设置当前YSpeechRecognition的语言。如果未指定，则默认为HTML语言属性值，如果未设置，则默认为用户代理的语言设置。
recognition.lang = 'cmn-Hans-CN' // 国语/普通话
// recognition.lang = 'zh-CN'  // 粤语/香港
// recognition.lang = 'en-US' // 英语/美国

// `onResult`属性表示一个事件处理程序，当语音识别服务返回一个结果时，该事件处理程序将运行 一个单词或短语已被正确识别，并已传回应用程序。
recognition.onResult = (text: string) => {
console.log(text, "响应的文字");
};

// `onSoundstart`属性表示一个事件处理程序，该处理程序将在检测到任何可识别语音或非可识别语音时运行。
recognition.onSoundstart = () => {
console.log("开始收听");
};

// `onSpeechstart`属性表示当检测到语音识别服务识别为语音的声音时，将运行的事件处理程序。
recognition.onSpeechstart = () => {
// console.log("+++");
};

// `onSpeechend`属性表示当语音识别服务识别的语音停止检测时， 将运行的事件处理程序。
recognition.onSpeechend = () => {
console.log("停止");
};

// 当发生语音识别错误时，将触发`YSpeechRecognition`对象的错误事件。
recognition.onError = (event: any) => {
console.log(event.error === "not-allowed" ? "暂无麦克风权限" : "网络受到限制！...");
};

```

## API

### 属性

#### `continuous` 
- 配置设置以使每次识别都返回连续结果 默认：true。
#### `interimResults` 
- 配置应返回临时结果的设置 默认：true。
#### `lang` 
- 语言 默认使用当前计算机语言 cmn-Hans-CN.普通话 默认：zh-CN。
#### `maxAlternatives` 
- 此属性设置`YSpeechRecognition.Alternative`每个结果的最大数量。默认值：1。

### 方法

#### `abort()`
- abort方法阻止语音识别服务侦听传入的音频，并且不会尝试返回`YSpeechRecognitionResult`。
#### `start()`
- 开始语音识别。
#### `stop()`
- 结束语音识别。
#### `onAudioend()`
- 当用户代理完成捕获语音以进行语音识别时，将触发语音API的`onAudioend`事件。
#### `onAudiostart()`
- 当用户代理开始捕获音频以进行语音识别时，会触发语音API的`onAudiostart`事件。
#### `onEnd()`
- 当语音识别服务断开连接时，将触发语音API `YSpeechRecognition`对象的结束事件。
#### `onError()`
- 当发生语音识别错误时，将触发`YSpeechRecognition`对象的错误事件。
#### `onNomatch()`
- 当语音识别服务返回没有显著识别的最终结果时，会触发语音API的`onNomatch`事件。
#### `onResult(text:string)`
- `onResult`属性表示一个事件处理程序，当语音识别服务返回一个结果时，该事件处理程序将运行 一个单词或短语已被正确识别，并已传回应用程序。
#### `onSoundend()`
- 语音API的`onSoundend`事件在停止检测任何声音（无论是否可识别语音）时触发。
#### `soundstart()`
- `onSoundstart`属性表示一个事件处理程序，该处理程序将在检测到任何可识别语音或非可识别语音时运行。
#### `onSpeechend()`
- `onSpeechend`属性表示当语音识别服务识别的语音停止检测时， 将运行的事件处理程序。
#### `onSpeechstart()`
- `onSpeechstart`属性表示当检测到语音识别服务识别为语音的声音时，将运行的事件处理程序。
#### `onStart()`
- 当语音识别服务开始侦听传入音频以识别与当前语音识别相关的语法时，将触发语音API `YSpeechRecognition`对象的启动事件。