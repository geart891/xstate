import { Interpreter } from '.';
import { IS_PRODUCTION } from './environment';

type AnyInterpreter = Interpreter<any, any, any>;
type ServiceListener = (service: AnyInterpreter) => void;

export interface XStateDevInterface {
  register: (service: Interpreter<any>) => void;
  unregister: (service: Interpreter<any>) => void;
  onRegister: (
    listener: ServiceListener
  ) => {
    unsubscribe: () => void;
  };
  services: Set<Interpreter<any>>;
}

function getDevTools(): XStateDevInterface | undefined {
  if (!!(window as any).__xstate__) {
    return (window as any).__xstate__;
  }

  return undefined;
}

export function registerService(service: AnyInterpreter) {
  if (IS_PRODUCTION || typeof window === 'undefined') {
    return;
  }

  const devTools = getDevTools();

  if (devTools) {
    devTools.register(service);
  }
}
