import type { App } from "vue";

/** install() 的配置项，结构与 config.js 一致（完整字段见包内 config.js） */
export type DevToolsOptions = Record<string, any>;

declare const devTools: {
  /** 当前生效的配置（install 后写入） */
  options: DevToolsOptions | null;
  /** 挂载调试工具：app.use(devTools, devToolsConfig) */
  install(vm: App, options?: DevToolsOptions): void;
  /** 打开调试面板（跳转 devTools/page/index） */
  show(): boolean | void;
  /** 关闭调试面板，可携带跳转目标 */
  hide(options?: { navigateToUrl?: string }): void;
  /** 上报框架报错（亦可通过 uni.$dev.errorReport 调用） */
  errorReport(err: unknown, trace?: string, source?: string): void;
  /** 上报自定义日志（亦可通过 uni.$dev.logReport 调用） */
  logReport(content: string): void;
};

export default devTools;
