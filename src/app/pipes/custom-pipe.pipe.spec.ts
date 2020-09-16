import { CustomPipePipe } from './custom-pipe.pipe';

describe('CustomPipePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomPipePipe();
    expect(pipe).toBeTruthy();
  });

  it('deberia retornar PIPE si la entrada es pipe', () => {
    const pipe = new CustomPipePipe();
    const entrada = 'pipe';
    const salida = pipe.transform(entrada);
    expect(salida).toBe('PIPE');
  });
});
