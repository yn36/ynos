/*
 * @Description: 实体
 * @Version: 1.0
 * @Autor: jiajun wu
 * @Date: 2022-01-20 17:39:12
 * @LastEditors: jiajun wu
 * @LastEditTime: 2022-07-04 14:40:04
 */

/** 参数说明 */
interface Options {
  /** 配置设置以使每次识别都返回连续结果 */
  continuous?: boolean,

  /** 配置应返回临时结果的设置 */
  interimResults?: boolean,

  /** 语言 默认使用当前计算机语言 cmn-Hans-CN.普通话 */
  lang?: string

  /** 此属性设置`YSpeechRecognition.Alternative`每个结果的最大数量。默认值1 */
  maxAlternatives?: number
}

export default class YSpeechRecognition {
  private entity: any = null;
  private options: Options = {
    continuous: false,
    interimResults: false,
    lang: 'zh-CN'
  }
  constructor(options?: Options) {
    this.options = options ?? {
      continuous: true,
      interimResults: true,
      lang: 'zh-CN',
      maxAlternatives: 1
    }

    if (window.hasOwnProperty('webkitSpeechRecognition') || window.hasOwnProperty('SpeechRecognition')) {
      this.entity = new (window as any).webkitSpeechRecognition() || new (window as any).SpeechRecognition();
      this.entity.continuous = options?.continuous ?? true
      this.entity.interimResults = options?.interimResults ?? true
      this.entity.lang = options?.lang ?? 'zh-CN'
      this.entity.maxAlternatives = options?.maxAlternatives ?? 1
    } else {
      console.error("目前该引擎暂无法支持语音识别!");
    }
  }

  /** 配置设置以使每次识别都返回连续结果 */
  public set continuous(bool: boolean) {
    this.entity.continuous = bool
    this.options.continuous = bool
  }
  /** 配置设置以使每次识别都返回连续结果 */
  public get continuous(): boolean {
    return this.options.continuous ?? true
  }

  /** 配置应返回临时结果的设置 */
  public set interimResults(bool: boolean) {
    this.entity.interimResults = bool
    this.options.interimResults = bool
  }
  /** 配置应返回临时结果的设置 */
  public get interimResults(): boolean {
    return this.options.interimResults ?? true
  }

  /** 语言 默认使用当前计算机语言 */
  public set lang(value: string) {
    this.entity.lang = value
    this.options.lang = value
  }

  /** 语言 默认使用当前计算机语言 */
  public get lang(): string {
    return this.options.lang ?? 'zh-CN'
  }

  /** 此属性设置`YSpeechRecognition.Alternative`每个结果的最大数量。默认值1 */
  public set maxAlternatives(value: number) {
    this.entity.maxAlternatives = value
    this.options.maxAlternatives = value
  }

  /** 此属性设置`YSpeechRecognition.Alternative`每个结果的最大数量。默认值1 */
  public get maxAlternatives(): number {
    return this.options.maxAlternatives ?? 1
  }

  /** 开始语音识别 */
  public start() {
    if (!this.entity) {
      console.error('启动失败,目前该引擎暂无法支持语音识别!');
      return false
    }
    this.entity.start()
  }

  /** 结束语音识别 */
  public stop() {
    if (!this.entity) {
      console.error('结束失败,目前该引擎暂无法支持语音识别!');
      return false
    }
    this.entity.stop()
  }

  /** abort（）方法阻止语音识别服务侦听传入的音频，并且不会尝试返回`YSpeechRecognitionResult`。 */
  public abort() {
    if (!this.entity) {
      console.error('执行失败,目前该引擎暂无法支持语音识别!');
      return false
    }
    this.entity.abort()
  }


  /** `onResult`属性表示一个事件处理程序，当语音识别服务返回一个结果时，该事件处理程序将运行 一个单词或短语已被正确识别，并已传回应用程序 */
  public set onResult(fn: (result: string) => void) {
    this.entity.result = function (event: any) {
      let result = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        result += event.results[i][0].transcript;
      }
      return fn(result)
    }
  }

  /** `onSoundstart`属性表示一个事件处理程序，该处理程序将在检测到任何可识别语音或非可识别语音时运行 */
  public set onSoundstart(fn: Function) {
    this.entity.soundstart = function () {
      return fn()
    }
  }

  /** `onSpeechstart`属性表示当检测到语音识别服务识别为语音的声音时，将运行的事件处理程序 */
  public set onSpeechstart(fn: Function) {
    this.entity.speechstart = function () {
      return fn()
    }
  }

  /** `onSpeechend`属性表示当语音识别服务识别的语音停止检测时， 将运行的事件处理程序 */
  public set onSpeechend(fn: Function) {
    this.entity.speechend = function () {
      return fn()
    }
  }

  /** 当发生语音识别错误时，将触发`YSpeechRecognition`对象的错误事件。 */
  public set onError(fn: (error: any) => void) {
    this.entity.error = function (event: ErrorEvent) {
      return fn(event.error)
    }
  }


  /** 当用户代理完成捕获语音以进行语音识别时，将触发语音API的`onAudioend`事件。 */
  public set onAudioend(fn: Function) {
    this.entity.audioend = function () {
      return fn()
    }
  }

  /** 当用户代理开始捕获音频以进行语音识别时，会触发语音API的`onAudiostart`事件。 */
  public set onAudiostart(fn: Function) {
    this.entity.audiostart = function () {
      return fn()
    }
  }

  /** 当语音识别服务断开连接时，将触发语音API `YSpeechRecognition`对象的结束事件。 */
  public set onEnd(fn: Function) {
    this.entity.end = function () {
      return fn()
    }
  }

  /** 当语音识别服务返回没有显著识别的最终结果时，会触发语音API的`onNomatch`事件。 */
  public set onNomatch(fn: Function) {
    this.entity.nomatch = function () {
      return fn()
    }
  }


  /** 语音API的`onSoundend`事件在停止检测任何声音（无论是否可识别语音）时触发。 */
  public set onSoundend(fn: Function) {
    this.entity.soundend = function () {
      return fn()
    }
  }

  /** 当语音识别服务开始侦听传入音频以识别与当前语音识别相关的语法时，将触发语音API `YSpeechRecognition`对象的启动事件。 */
  public set onStart(fn: Function) {
    this.entity.onstart = function () {
      return fn()
    }
  }

}