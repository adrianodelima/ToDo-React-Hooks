import { addToken } from "./AuthToken";

describe('Adicionar Token', () => {
    beforeEach(() => {
      localStorage.clear();
    });
  
    it('Gerar token novo', () => {
      const generatedToken = addToken();
      expect(generatedToken).toBeTruthy();
  
      const cachedToken = localStorage.getItem('authToken');
      expect(cachedToken).toBe(generatedToken);
    });
  });