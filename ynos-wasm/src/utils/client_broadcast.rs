///! 客户端广播功能
use super::*;
use js_sys::Function;
use web_sys::BroadcastChannel;

#[wasm_bindgen]
pub struct ClientBroadcast {
    broadcast: Option<BroadcastChannel>,
}

#[wasm_bindgen]
impl ClientBroadcast {
    #[wasm_bindgen(constructor)]
    pub fn new(channel: String) -> Self {
        let bc = BroadcastChannel::new(&channel);

        match bc {
            Ok(broadcast) => {
                return Self {
                    broadcast: Some(broadcast),
                }
            }
            Err(err) => {
                log(&format!("创建失败:{:?}", err));
                return Self { broadcast: None };
            }
        }
    }

    /// 发送一条任意Object类型的消息，给所有同源下监听了该频道的所有浏览器上下文。消息以 [onMessage] 事件的形式发送给每一个绑定到该频道的广播频道。
    pub fn emit(self, message: &JsValue) -> Option<String> {
        match self.broadcast {
            Some(broadcast) => match broadcast.post_message(message) {
                Ok(_) => Some("发送成功".to_string()),
                Err(e) => e.as_string(),
            },
            None => Some("发送失败！暂未创建[`broadcast`]".to_string()),
        }
    }

    /// 当频道收到一条消息时，会在关联的 [ClientBroadcast] 对象上触发 [message] 事件。
    #[wasm_bindgen(catch ,js_name = onMessage)]
    pub fn on_message(self, callback: &Function) {
        match self.broadcast {
            Some(broadcast) => {
                broadcast.set_onmessage(Some(callback));
            }
            None => {
                JsError::new("执行失败！暂未创建[`broadcast`]");
            }
        }
    }

    /// 当频道收到一条无法反序列化的消息时会在 [ClientBroadcast] 对象上触发 [onMessageError] 事件
    #[wasm_bindgen(js_name = onMessageError)]
    pub fn on_messageerror(self, callback: &Function) {
        match self.broadcast {
            Some(broadcast) => {
                broadcast.set_onmessageerror(Some(callback));
            }
            None => {
                JsError::new("执行失败！暂未创建[`broadcast`]");
            }
        }
    }

    /// 断开其与对应频道的关联，并让其被垃圾回收。这是必要的步骤，因为浏览器没有其它方式知道频道不再被需要。
    pub fn close(self) -> Option<String> {
        match self.broadcast {
            Some(broadcast) => {
                broadcast.close();
                None
            }
            None => Some("执行失败！暂未创建[`broadcast`]".to_string()),
        }
    }

    /// 是类型为 [DOMString] 的只读属性，是频道的唯一标识。属性 [name] 是在创建时传入 [ClientBroadcast()] 构造函数的，所以是只读的。
    #[wasm_bindgen(method, getter)]
    pub fn name(self) -> String {
        match self.broadcast {
            Some(broadcast) => broadcast.name(),
            None => "".to_string(),
        }
    }
}
